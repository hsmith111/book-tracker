package com.booktracker.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class BookTrackerService {
    private final RestClient restClient = RestClient.create();
    @Value("${app.api.key}")
    private String apiKey;

    public String searchForBooks(String query) {
        return restClient.get()
                .uri("https://www.googleapis.com/books/v1/volumes?q={q}&key={key}", query, apiKey)
                .retrieve()
                .body(String.class);
    }
}
