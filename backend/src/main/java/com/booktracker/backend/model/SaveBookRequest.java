package com.booktracker.backend.model;

public record SaveBookRequest(
        String googleId,
        Integer readingListId
) {
}
