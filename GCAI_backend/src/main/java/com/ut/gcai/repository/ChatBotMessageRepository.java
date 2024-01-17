package com.ut.gcai.repository;

import com.ut.gcai.model.ChatBot;
import com.ut.gcai.model.ChatBotMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatBotMessageRepository extends ListCrudRepository<ChatBotMessage, Long> {
    List<ChatBotMessage> findByChatBot(ChatBot chatBot);
}
