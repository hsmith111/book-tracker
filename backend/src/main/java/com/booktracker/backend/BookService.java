package com.booktracker.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Service
public class BookService {
    private static final Logger logger = LoggerFactory.getLogger(BookService.class);
    private final RestClient restClient = RestClient.create();
    @Value("${app.api.key}")
    private String apiKey;

    public GoogleBookResponse fetchBookById(String id) {
        try {
            return restClient.get()
                    .uri("https://www.googleapis.com/books/v1/volumes/{id}?key={key}", id, apiKey)
                    .retrieve()
                    .body(GoogleBookResponse.class);
        } catch (RestClientResponseException e) {
            logger.error("Error from Google: {}", e.getStatusCode());
            throw e;
        } catch (ResourceAccessException e) {
            logger.error("Google was unreachable");
            throw e;
        }
    }
}
