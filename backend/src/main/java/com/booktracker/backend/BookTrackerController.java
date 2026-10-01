package com.booktracker.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class BookTrackerController {
    @GetMapping("/hello")
    @CrossOrigin(origins = "http://localhost:5173")
    public String getGreeting() {
        return "Hello, World!";
    }
}
