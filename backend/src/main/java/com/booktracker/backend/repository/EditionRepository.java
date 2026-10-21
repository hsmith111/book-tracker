package com.booktracker.backend.repository;

import com.booktracker.backend.model.Edition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EditionRepository extends JpaRepository<Edition, Integer> {
    Optional<Edition> findByBookId(Integer bookId);
}
