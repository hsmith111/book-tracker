package com.booktracker.backend.service;

import com.booktracker.backend.model.*;
import com.booktracker.backend.model.BookResponse.VolumeInfo.*;
import com.booktracker.backend.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.*;

@Service
public class BookService {
    private static final Logger logger = LoggerFactory.getLogger(BookService.class);
    @Value("${app.api.key}")
    private String apiKey;
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final EditionRepository editionRepository;
    private final ReadingListRepository readingListRepository;
    private final RestClient restClient = RestClient.create();

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository, GenreRepository genreRepository, EditionRepository editionRepository, ReadingListRepository readingListRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
        this.editionRepository = editionRepository;
        this.readingListRepository = readingListRepository;
    }

    public GoogleBookResponse fetchBookById(String id) {
        try {
            return restClient.get()
                    .uri("https://www.googleapis.com/books/v1/volumes/{id}?key={key}", id, apiKey)
                    .retrieve()
                    .body(GoogleBookResponse.class);
        } catch (RestClientResponseException e) {
            logger.error("Error from Google: {}", e.getStatusCode());
            throw e;
        } catch (ResourceAccessException e) {
            logger.error("Google was unreachable");
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<BookResponse> getBooksByReadingListId(Integer readingListId) {
        return bookRepository.findByReadingListId(readingListId)
                .stream()
                .map(this::toBookResponse)
                .toList();
    }

    @Transactional
    public void removeBookFromReadingList(Integer readingListId, String googleId) {
        Optional<Book> book = bookRepository.findByGoogleId(googleId);
        if (book.isPresent()) {
            Book existingBook = book.get();
            if (Objects.equals(existingBook.getReadingListId(), readingListId)) {
                existingBook.setReadingListId(null);
                bookRepository.save(existingBook);
            }
        }
    }

    @Transactional
    public BookResponse saveBook(SaveBookRequest request, GoogleBookResponse googleBook) {
        validateReadingList(request);

        Optional<Book> requestedBook = bookRepository.findByGoogleId(request.googleId());
        if (requestedBook.isPresent()) {
            Book existingBook = requestedBook.get();
            if (Objects.equals(existingBook.getReadingListId(), request.readingListId())) {
                return toBookResponse(existingBook);
            }
            existingBook.setReadingListId(request.readingListId());
            return toBookResponse(bookRepository.save(existingBook));
        }

        Book newBook = createBook(request, googleBook);

        Book savedBook = bookRepository.save(newBook);

        saveEdition(savedBook, googleBook);

        return toBookResponse(savedBook);
    }

    private void validateReadingList(SaveBookRequest request) {
        Optional<ReadingList> requestedReadingList = readingListRepository.findById(request.readingListId());
        if (requestedReadingList.isEmpty()) {
            throw new IllegalArgumentException("Reading list not found: " + request.readingListId());
        }
    }

    private Book createBook(SaveBookRequest request, GoogleBookResponse googleBook) {
        Book bookToSave = new Book();
        bookToSave.setName(googleBook.volumeInfo().title());
        bookToSave.setDescription(googleBook.volumeInfo().description());
        if (googleBook.volumeInfo().imageLinks() != null) {
            bookToSave.setThumbnailUrl(googleBook.volumeInfo().imageLinks().thumbnail());
        }
        bookToSave.setInfoLink(googleBook.volumeInfo().infoLink());
        bookToSave.setGoogleId(request.googleId());
        bookToSave.setReadingListId(request.readingListId());

        List<String> authorsList = googleBook.volumeInfo().authors();
        bookToSave.getAuthors().addAll(findOrCreateAuthors(authorsList));

        List<String> genresList = googleBook.volumeInfo().categories();
        bookToSave.getGenres().addAll(findOrCreateGenres(genresList));

        return bookToSave;
    }

    private List<Author> findOrCreateAuthors(List<String> names) {
        List<Author> authors = new ArrayList<>();
        if (names != null) {
            for (String a : names) {
                Optional<Author> author = authorRepository.findByNameIgnoreCase(a);
                if (author.isPresent()) {
                    authors.add(author.get());
                } else {
                    Author authorToSave = new Author();
                    authorToSave.setName(a);
                    authors.add(authorRepository.save(authorToSave));
                }
            }
        }
        return authors;
    }

    private List<Genre> findOrCreateGenres(List<String> names) {
        List<Genre> genres = new ArrayList<>();
        if (names != null) {
            for (String g : names) {
                Optional<Genre> genre = genreRepository.findByNameIgnoreCase(g);
                if (genre.isPresent()) {
                    genres.add(genre.get());
                } else {
                    Genre genreToSave = new Genre();
                    genreToSave.setName(g);
                    genres.add(genreRepository.save(genreToSave));
                }
            }
        }
        return genres;
    }

    private void saveEdition(Book book, GoogleBookResponse googleBook) {
        Edition newEdition = new Edition();
        newEdition.setBookId(book.getId());
        newEdition.setPublisher(googleBook.volumeInfo().publisher());
        newEdition.setPageCount(googleBook.volumeInfo().pageCount());
        editionRepository.save(newEdition);
    }

    private BookResponse toBookResponse(Book book) {
        Edition edition = editionRepository.findByBookId(book.getId()).orElse(null);
        ImageLinks imageLinks = new ImageLinks(book.getThumbnailUrl());
        List<String> authors = book.getAuthors()
                .stream()
                .map(Author::getName)
                .toList();
        List<String> genres = book.getGenres()
                .stream()
                .map(Genre::getName)
                .toList();
        String publisher = edition != null ? edition.getPublisher() : null;
        Integer pageCount = edition != null ? edition.getPageCount() : null;
        BookResponse.VolumeInfo volumeInfo = new BookResponse.VolumeInfo(authors, genres, book.getDescription(), imageLinks, book.getInfoLink(), pageCount, book.getName(), publisher);
        return new BookResponse(book.getGoogleId(), book.getReadingListId(), volumeInfo);
    }
}
