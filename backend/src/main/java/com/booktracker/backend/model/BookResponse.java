package com.booktracker.backend.model;

import java.util.List;

public record BookResponse(
        String id,
        Integer readingListId,
        VolumeInfo volumeInfo
) {
    public record VolumeInfo(
            List<String> authors,
            List<String> categories,
            String description,
            ImageLinks imageLinks,
            String infoLink,
            Integer pageCount,
            String title,
            String publisher
    ) {
        public record ImageLinks(
                String thumbnail
        ) {}
    }
}
