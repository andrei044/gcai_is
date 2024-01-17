package com.ut.gcai.repository;

import com.ut.gcai.model.ChatBot;
import com.ut.gcai.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatBotRepository extends CrudRepository<ChatBot, Long> {
    List<ChatBot> findByCreator(User currentUser);
}
