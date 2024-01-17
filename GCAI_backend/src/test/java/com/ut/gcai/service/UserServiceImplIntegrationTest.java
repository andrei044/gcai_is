package com.ut.gcai.service;

import com.ut.gcai.model.User;
import com.ut.gcai.repository.UserRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceImplIntegrationTest {
    @TestConfiguration
    static class UserServiceImplTestContextConfiguration {

        @Bean
        public UserService userService() {
            User user = new User();
            user.setName("testName");
            return new UserServiceImpl(new UserRepository() {
                @Override
                public Optional<User> findByEmail(String email) {
                    return Optional.of(user);
                }

                @Override
                public <S extends User> S save(S entity) {
                    return null;
                }

                @Override
                public <S extends User> Iterable<S> saveAll(Iterable<S> entities) {
                    return null;
                }

                @Override
                public Optional<User> findById(Long aLong) {
                    return Optional.empty();
                }

                @Override
                public boolean existsById(Long aLong) {
                    return false;
                }

                @Override
                public Iterable<User> findAll() {
                    return null;
                }

                @Override
                public Iterable<User> findAllById(Iterable<Long> longs) {
                    return null;
                }

                @Override
                public long count() {
                    return 0;
                }

                @Override
                public void deleteById(Long aLong) {

                }

                @Override
                public void delete(User entity) {

                }

                @Override
                public void deleteAllById(Iterable<? extends Long> longs) {

                }

                @Override
                public void deleteAll(Iterable<? extends User> entities) {

                }

                @Override
                public void deleteAll() {

                }
            });
        }
    }
    private UserService userService;

    @MockBean
    private UserRepository userRepository;
    @Test
    public void whenValidName_thenEmployeeShouldBeFound() {
        userService = mock(UserService.class);
        String name = "testName";
        UserDetails user = mock(UserDetails.class);
        when(userService.loadUserByUsername(any())).thenReturn(user);

        UserDetails found = userService.loadUserByUsername(name);
        when(found.getUsername()).thenReturn(name);

        assertThat(found.getUsername(),is(name));
    }
}