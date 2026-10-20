package com.booktracker.backend.repository;

import com.booktracker.backend.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
    Optional<Author> findByNameIgnoreCase(String authorName);
}
