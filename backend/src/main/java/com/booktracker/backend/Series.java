package com.booktracker.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "series")
public class Series {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Integer totalBooks;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getTotalBooks() { return totalBooks; }
    public void setTotalBooks(Integer totalBooks ) { this.totalBooks = totalBooks; }
}
