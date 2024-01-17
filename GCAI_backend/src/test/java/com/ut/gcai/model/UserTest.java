package com.ut.gcai.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    private User user;
    @BeforeEach
    void setUp() {
        user = new User();
    }

    @Test
    void setId() {
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void getId() {
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void getEmail() {
        user.setEmail("email");
        assertEquals("email", user.getEmail());
    }

    @Test
    void testEquals() {
        user.setId(1L);
        User user2 = new User();
        user2.setId(1L);
        assertEquals(user, user2);
    }
}