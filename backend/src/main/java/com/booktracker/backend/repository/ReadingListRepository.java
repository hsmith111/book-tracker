package com.booktracker.backend.repository;

import com.booktracker.backend.model.ReadingList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingListRepository extends JpaRepository<ReadingList, Integer> {
}
