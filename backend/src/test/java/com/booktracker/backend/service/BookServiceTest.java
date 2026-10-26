package com.booktracker.backend.service;

import com.booktracker.backend.model.*;
import com.booktracker.backend.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
        when(bookRepository.findByReadingListId(4)).thenReturn(List.of());
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

        List<BookResponse> result = bookService.getBooksByReadingListId(5);
        assertThat(result).hasSize(1);
        BookResponse bookInfo = result.get(0);
        assertThat(bookInfo.id()).isEqualTo("zxcv1234");
        assertThat(bookInfo.readingListId()).isEqualTo(5);
        assertThat(bookInfo.volumeInfo().title()).isEqualTo("Mock Book for Dummies");
        assertThat(bookInfo.volumeInfo().publisher()).isEqualTo("Random House");
        assertThat(bookInfo.volumeInfo().pageCount()).isEqualTo(497);
    }
}
