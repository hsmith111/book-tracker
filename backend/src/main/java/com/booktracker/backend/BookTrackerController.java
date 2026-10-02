package com.booktracker.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BookTrackerController {
    private final RestClient restClient = RestClient.create();
    @Value("${app.api.key}")
    private String apiKey;

    @GetMapping("/hello")
    public String getGreeting() {
        return "Hello, World!";
    }

    @GetMapping("/books")
    public ResponseEntity<String> searchForBooks(@RequestParam(defaultValue = "") String query) {
        if (query.isBlank()) {
           return ResponseEntity.ok("harry potter");
        } else {
            return ResponseEntity.ok().body(restClient.get()
                    .uri("https://www.googleapis.com/books/v1/volumes?q={q}&key={key}", query, apiKey)
                    .retrieve()
                    .body(String.class)
            );
        }
    }
}
