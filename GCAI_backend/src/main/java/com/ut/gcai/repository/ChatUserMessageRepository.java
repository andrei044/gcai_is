package com.ut.gcai.repository;

import com.ut.gcai.model.ChatBot;
import com.ut.gcai.model.ChatBotMessage;
import com.ut.gcai.model.ChatUserMessage;;
import com.ut.gcai.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatUserMessageRepository extends ListCrudRepository<ChatUserMessage, Long> {
    List<ChatUserMessage> findByUserAndToChatBot(User user,ChatBot toChatBot);
}
