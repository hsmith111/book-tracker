package com.booktracker.backend.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolation(DataIntegrityViolationException exception) {
        String errorMessage = exception.getMostSpecificCause().getMessage();
        if (errorMessage.contains("books_google_id_key")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Book already exists");
        } else {
            throw exception;
        }
    }

    @ExceptionHandler(RestClientResponseException.class)
    public ResponseEntity<String> handleGoogleError(RestClientResponseException exception) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body("Book search is temporarily unavailable. Please try again later.");
    }

    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<String> handleGoogleUnreachable(ResourceAccessException exception) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body("Book search is temporarily unavailable. Please try again later.");
    }
}
