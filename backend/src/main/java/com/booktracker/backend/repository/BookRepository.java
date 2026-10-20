package com.booktracker.backend.repository;

import com.booktracker.backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Optional<Book> findByGoogleId(String googleId);
}
