package com.booktracker.backend.model;

import java.util.List;

public record GoogleBookResponse(
        String id,
        VolumeInfo volumeInfo
) {
    public record VolumeInfo(
            List<String> authors,
            List<String> categories,
            String description,
            ImageLinks imageLinks,
            String infoLink,
            Integer pageCount,
            String publishedDate,
            String title,
            String publisher
    ) {
        public record ImageLinks(
                String thumbnail
        ) {}
    }
}
