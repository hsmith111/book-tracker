package com.booktracker.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${app.frontend.url}")
@RestController
public class BookTrackerController {
    private final BookSearchService bookSearchService;
    private final BookService bookService;

    public BookTrackerController(BookSearchService bookSearchService, BookService bookService) {
        this.bookSearchService = bookSearchService;
        this.bookService = bookService;
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchForBooks(@RequestParam(defaultValue = "") String query) {
        return ResponseEntity.ok().body(bookSearchService.searchForBooks(query));
    }

    @GetMapping("/books/{id}")
    public String fetchBookById(@PathVariable String id) { return bookService.fetchBookById(id); }

}
