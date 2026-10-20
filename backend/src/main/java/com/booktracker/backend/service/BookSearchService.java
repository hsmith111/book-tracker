package com.booktracker.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Service
public class BookSearchService {
    private static final Logger logger = LoggerFactory.getLogger(BookSearchService.class);
    private final RestClient restClient = RestClient.create();
    @Value("${app.api.key}")
    private String apiKey;

    public String searchForBooks(String query) {
        try {
            return restClient.get()
                    .uri("https://www.googleapis.com/books/v1/volumes?q={q}&key={key}", query, apiKey)
                    .retrieve()
                    .body(String.class);
        } catch (RestClientResponseException e) {
            logger.error("Error from Google: {}", e.getStatusCode());
            throw e;
        } catch (ResourceAccessException e) {
            logger.error("Google was unreachable");
            throw e;
        }
    }
}
