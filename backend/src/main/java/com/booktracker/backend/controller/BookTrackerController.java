package com.booktracker.backend.controller;

import com.booktracker.backend.model.BookResponse;
import com.booktracker.backend.model.GoogleBookResponse;
import com.booktracker.backend.model.SaveBookRequest;
import com.booktracker.backend.service.BookSearchService;
import com.booktracker.backend.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public GoogleBookResponse fetchBookById(@PathVariable String id) { return bookService.fetchBookById(id); }

    @PostMapping("/books")
    public ResponseEntity<BookResponse> saveBook(@RequestBody SaveBookRequest request) {
        GoogleBookResponse googleBook = bookService.fetchBookById(request.googleId());
        return ResponseEntity.ok().body(bookService.saveBook(request, googleBook));
    }

    @GetMapping("/reading-lists/{readingListId}/books")
    public List<BookResponse> getBooksByReadingListId(@PathVariable Integer readingListId) {
        return bookService.getBooksByReadingListId(readingListId);
    }

}
