package com.booktracker.backend;

import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private static final Logger logger = LoggerFactory.getLogger(BookService.class);
    private final RestClient restClient = RestClient.create();
    @Value("${app.api.key}")
    private String apiKey;
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final EditionRepository editionRepository;
    private final ReadingListRepository readingListRepository;

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

    @Transactional
    public Book saveBook(SaveBookRequest request) {
        // validate reading list
        Optional<ReadingList> requestedReadingList = readingListRepository.findById(request.readingListId());
        if (requestedReadingList.isEmpty()) {
            throw new IllegalArgumentException("Reading list not found: " + request.readingListId());
        }

        // check if book already exists in database & return it if so
        Optional<Book> requestedBook = bookRepository.findByGoogleId(request.googleId());
        if (requestedBook.isPresent()) {
            if (requestedBook.get().getReadingListId().equals(request.readingListId())) {
                return requestedBook.get();
            } else {
                requestedBook.get().setReadingListId(request.readingListId());
            }
            return bookRepository.save((requestedBook.get()));
        }

        // if book isn't already saved to db, create it; this is where the API call happens
        GoogleBookResponse googleBook = fetchBookById(request.googleId());
        Book bookToSave = new Book();
        bookToSave.setName(googleBook.volumeInfo().title());
        bookToSave.setDescription(googleBook.volumeInfo().description());
        if (googleBook.volumeInfo().imageLinks() != null) {
            bookToSave.setThumbnailUrl(googleBook.volumeInfo().imageLinks().thumbnail());
        }
        bookToSave.setInfoLink(googleBook.volumeInfo().infoLink());
        bookToSave.setGoogleId(request.googleId());
        bookToSave.setReadingListId(request.readingListId());

        // authors check and create
        List<String> authorsList = googleBook.volumeInfo().authors();
        if (authorsList != null) {
            for (int i = 0; i < authorsList.size(); i++) {
                Optional<Author> author = authorRepository.findByNameIgnoreCase(authorsList.get(i));
                if (author.isPresent()) {
                    bookToSave.getAuthors().add(author.get());
                } else {
                    Author authorToSave = new Author();
                    authorToSave.setName(authorsList.get(i));
                    bookToSave.getAuthors().add(authorRepository.save(authorToSave));
                }
            }
        }
        // genres check and create
        List<String> genresList = googleBook.volumeInfo().categories();
        if (genresList != null) {
            for (int i = 0; i < genresList.size(); i++) {
                Optional<Genre> genre = genreRepository.findByNameIgnoreCase(genresList.get(i));
                if (genre.isPresent()) {
                    bookToSave.getGenres().add(genre.get());
                } else {
                    Genre genreToSave = new Genre();
                    genreToSave.setName(genresList.get(i));
                    bookToSave.getGenres().add(genreRepository.save(genreToSave));
                }
            }
        }

        // save the newly created book
        Book savedBook = bookRepository.save(bookToSave);

        // create edition info to add to the new book
        Edition editionToSave = new Edition();
        editionToSave.setBookId(savedBook.getId());
        editionToSave.setPublisher(googleBook.volumeInfo().publisher());
        editionToSave.setPageCount(googleBook.volumeInfo().pageCount());
        editionRepository.save(editionToSave);

        return savedBook;
    }
}
