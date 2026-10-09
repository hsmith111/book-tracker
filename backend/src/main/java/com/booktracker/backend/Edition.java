package com.booktracker.backend;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "edition")
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String format;
    private String publisher;
    private Date pubDate;
    private Integer pageCount;
    private String isbn;
    private Integer bookId;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public Date getPubDate() { return pubDate; }
    public void setPubDate(Date pubDate) { this.pubDate = pubDate; }

    public Integer getPageCount() { return pageCount; }
    public void setPageCount(Integer pageCount) { this.pageCount = pageCount; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public Integer getBookId() { return bookId; }
    public void setBookId(Integer bookId) { this.bookId = bookId; }
}
