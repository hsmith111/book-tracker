package com.booktracker.backend.model;

import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class GoogleBookResponseTest {
    private final JsonMapper mapper = JsonMapper.builder().build();

    @Test
    void mapsAllFieldsFromGoogleJson() {
        String json = """
              {"id":"abc123","volumeInfo":{"title":"A Tree Grows in Brooklyn",
               "authors":["Betty Smith"],"pageCount":null,
               "imageLinks":{"thumbnail":"http://img"}}}
              """;

        GoogleBookResponse result = mapper.readValue(json, GoogleBookResponse.class);

        assertEquals("abc123", result.id());
        assertEquals("A Tree Grows in Brooklyn", result.volumeInfo().title());
        assertEquals(List.of("Betty Smith"), result.volumeInfo().authors());
        assertEquals("http://img", result.volumeInfo().imageLinks().thumbnail());
    }

    @Test
    void missingOptionalFieldsComeBackNull() {
        String json = """
              {"id":"abc123","volumeInfo":{"title":"No Extras"}}
              """;

        GoogleBookResponse result = mapper.readValue(json, GoogleBookResponse.class);

        assertEquals("No Extras", result.volumeInfo().title());
        assertNull(result.volumeInfo().description());
        assertNull(result.volumeInfo().pageCount());
        assertNull(result.volumeInfo().imageLinks());
    }

    @Test
    void ignoresFieldsNotModeled() {
        String json = """
                {"kind":"books#volume","id":"abc123","volumeInfo":{"title":"Extras","language":"en"}}""";
        GoogleBookResponse result = mapper.readValue(json, GoogleBookResponse.class);

        assertEquals("abc123", result.id());
        assertEquals("Extras", result.volumeInfo().title());
    }
}
