package com.booktracker.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "${app.frontend.url}")
@RestController
public class BookTrackerController {
    private final BookTrackerService bookTrackerService;
    private final BookRepository bookRepository;
    private final SeriesRepository seriesRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final EditionRepository editionRepository;

    public BookTrackerController(BookTrackerService bookTrackerService, BookRepository bookRepository, SeriesRepository seriesRepository, AuthorRepository authorRepository, GenreRepository genreRepository, EditionRepository editionRepository) {
        this.bookTrackerService = bookTrackerService;
        this.bookRepository = bookRepository;
        this.seriesRepository = seriesRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
        this.editionRepository = editionRepository;
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchForBooks(@RequestParam(defaultValue = "") String query) {
        return ResponseEntity.ok().body(bookTrackerService.searchForBooks(query));
    }

    @PostMapping("/test-book")
    public Book saveBook(@RequestBody Book book) { return bookRepository.save(book); }

    @GetMapping("/test-book")
    public List<Book> getAllBooks() { return bookRepository.findAll(); }

    @PostMapping("/test-series")
    public Series saveSeries(@RequestBody Series series) { return seriesRepository.save(series); }

    @GetMapping("/test-series")
    public List<Series> getAllSeries() { return seriesRepository.findAll(); }

    @PostMapping("/test-author")
    public Author saveAuthor(@RequestBody Author author) { return authorRepository.save(author); }

    @GetMapping("/test-author")
    public List<Author> getAllAuthors() { return authorRepository.findAll(); }

    @PostMapping("/test-genre")
    public Genre saveGenre(@RequestBody Genre genre) { return genreRepository.save(genre); }

    @GetMapping("/test-genre")
    public List<Genre> getAllGenres() { return genreRepository.findAll(); }

    @PostMapping("/test-edition")
    public Edition saveEdition(@RequestBody Edition edition) { return editionRepository.save(edition); }

    @GetMapping("/test-edition")
    public List<Edition> getAllEditions() { return editionRepository.findAll(); }
}
