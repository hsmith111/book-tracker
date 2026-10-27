package com.booktracker.backend.service;

import com.booktracker.backend.model.*;
import com.booktracker.backend.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {
    @Mock
    private BookRepository bookRepository;

    @Mock
    private EditionRepository editionRepository;

    @InjectMocks
    private BookService bookService;

    @Test
    void returnsEmptyListWhenReadingListHasNoBooks() {
        when(bookRepository.findByReadingListId(Mockito.anyInt())).thenReturn(List.of());
        List<BookResponse> result = bookService.getBooksByReadingListId(4);
        assertThat(result).isEmpty();
    }

    @Test
    void mapBookAndEditionFields() {
        Book book = new Book();
        book.setId(1234);
        book.setReadingListId(5);
        book.setGoogleId("zxcv1234");
        book.setName("Mock Book for Dummies");

        Edition edition = new Edition();
        edition.setBookId(1234);
        edition.setPublisher("Random House");
        edition.setPageCount(497);

        when(bookRepository.findByReadingListId(5)).thenReturn(List.of(book));
        when(editionRepository.findByBookId(1234)).thenReturn(Optional.of(edition));

        List<BookResponse> expected = List.of(
                new BookResponse(
                        "zxcv1234",
                        5,
                        new BookResponse.VolumeInfo(
                                Collections.emptyList(),
                                Collections.emptyList(),
                                null,
                                new BookResponse.VolumeInfo.ImageLinks(null),
                                null,
                                497,
                                "Mock Book for Dummies",
                                "Random House"
                        ))
        );

        // Act
        List<BookResponse> result = bookService.getBooksByReadingListId(5);

        // Assert
        assertThat(result).usingRecursiveComparison().isEqualTo(expected);
    }
}
