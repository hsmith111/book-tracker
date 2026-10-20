package com.booktracker.backend.repository;

import com.booktracker.backend.model.Edition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EditionRepository extends JpaRepository<Edition, Integer> {
}
