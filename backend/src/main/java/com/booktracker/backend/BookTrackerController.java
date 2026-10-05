package com.booktracker.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "${app.frontend.url}")
@RestController
public class BookTrackerController {
    private final BookTrackerService bookTrackerService;

    public BookTrackerController(BookTrackerService bookTrackerService) {
        this.bookTrackerService = bookTrackerService;
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchForBooks(@RequestParam(defaultValue = "") String query) {
        return ResponseEntity.ok().body(bookTrackerService.searchForBooks(query));
    }
}
