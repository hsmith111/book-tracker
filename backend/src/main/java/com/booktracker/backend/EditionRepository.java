package com.booktracker.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EditionRepository extends JpaRepository<Edition, Integer> {
}
