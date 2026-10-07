package com.booktracker.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "${app.frontend.url}")
@RestController
public class BookTrackerController {
    private final BookTrackerService bookTrackerService;
    private final BookRepository bookRepository;

    public BookTrackerController(BookTrackerService bookTrackerService, BookRepository bookRepository) {
        this.bookTrackerService = bookTrackerService;
        this.bookRepository = bookRepository;
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchForBooks(@RequestParam(defaultValue = "") String query) {
        return ResponseEntity.ok().body(bookTrackerService.searchForBooks(query));
    }

    @PostMapping("/test-book")
    public Book save(@RequestBody Book book) { return bookRepository.save(book); }

    @GetMapping("/test-book")
    public List<Book> all() { return bookRepository.findAll(); }
}
