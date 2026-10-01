package com.booktracker.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class BookTrackerController {
    @GetMapping("/hello")
    public String getGreeting() {
        return "Hello, World!";
    }
}
