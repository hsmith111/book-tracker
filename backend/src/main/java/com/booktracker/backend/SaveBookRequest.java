package com.booktracker.backend;

public record SaveBookRequest(
        String googleId,
        Integer readingListId
) {
}
