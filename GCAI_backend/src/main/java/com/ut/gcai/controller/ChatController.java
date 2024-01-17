package com.ut.gcai.controller;

import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.ut.gcai.exception.ResourceNotFoundException;
import com.ut.gcai.model.*;
import com.ut.gcai.repository.ChatBotMessageRepository;
import com.ut.gcai.repository.ChatBotRepository;
import com.ut.gcai.repository.ChatUserMessageRepository;
import com.ut.gcai.repository.UserRepository;
import com.ut.gcai.security.CurrentUser;
import com.ut.gcai.security.UserPrincipal;
import com.ut.gcai.service.AIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {
    private final UserRepository userRepository;
    private final ChatBotMessageRepository chatBotMessageRepository;
    private final ChatBotRepository chatBotRepository;
    private final ChatUserMessageRepository chatUserMessageRepository;
    @Autowired
    private final AIService aiService;

    @PostMapping("/messages")
    @PreAuthorize("hasRole('USER')")
    public List<MyChatMessage> getChatMessages(@CurrentUser UserPrincipal userPrincipal, @RequestBody ChatBot chatBot) {
        Optional<ChatBot> chatBotOptional = chatBotRepository.findById(chatBot.getId());
        Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
        if (chatBotOptional.isPresent() && optionalUser.isPresent()){
            ChatBot currentChatBot= chatBotOptional.get();
            User currentUser = optionalUser.get();
            if(chatBotOptional.get().getCreator().getId().equals(userPrincipal.getId())){
                List<ChatBotMessage> botMessages = chatBotMessageRepository.findByChatBot(currentChatBot);
                List<ChatUserMessage> userMessages = chatUserMessageRepository.findByUserAndToChatBot(currentUser,currentChatBot);
                List<MyChatMessage>messages=new ArrayList<>();
                //messages.add(new ChatBotMessage(-1L,chatBot.getDescription(),currentChatBot.getTimestamp(),currentChatBot));
                int i=0,j=0;
                while(i<botMessages.size()&&j<userMessages.size()){
                    if(botMessages.get(i).getTimestamp()<userMessages.get(j).getTimestamp()){
                        messages.add(botMessages.get(i));
                        i++;
                    }else{
                        messages.add(userMessages.get(j));
                        j++;
                    }
                }
                while(i<botMessages.size()){
                    messages.add(botMessages.get(i));
                    i++;
                }
                while(j<userMessages.size()){
                    messages.add(userMessages.get(j));
                    j++;
                }
                //log.info("messages:{}",messages);
                return messages;
            }else{
                throw new ResourceNotFoundException("ChatBot", "id", chatBot.getId());
            }
        }

        return List.of();
    }
    @PutMapping("/messages")
    @PreAuthorize("hasRole('USER')")
    public ResponsePackage processUserMessage(@CurrentUser UserPrincipal userPrincipal, @RequestBody ProcessedMessage processedMessage) {
        ChatUserMessage chatUserMessage = processedMessage.getChatUserMessage();
        ChatBot chatBot = processedMessage.getChatBot();
        log.info("chatUserMessage:{}",chatUserMessage);
        log.info("chatBot:{}",chatBot);
        Optional<ChatBot> chatBotOptional = chatBotRepository.findById(chatBot.getId());
        Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
        if (chatBotOptional.isPresent() && optionalUser.isPresent()){
            ChatBot currentChatBot= chatBotOptional.get();
            User currentUser = optionalUser.get();
            if(chatBotOptional.get().getCreator().getId().equals(userPrincipal.getId())){
                chatUserMessage.setTimestamp(System.currentTimeMillis());
                chatUserMessage.setUser(currentUser);
                ChatUserMessage save = chatUserMessageRepository.save(chatUserMessage);

                List<ChatBotMessage> botMessages = chatBotMessageRepository.findByChatBot(currentChatBot);
                List<ChatUserMessage> userMessages = chatUserMessageRepository.findByUserAndToChatBot(currentUser,currentChatBot);
                List<ChatMessage>messages=new ArrayList<>();
                messages.add(new ChatMessage(ChatMessageRole.SYSTEM.value(),chatBot.getDescription()));
                int i=0,j=0;
                while(i<botMessages.size()&&j<userMessages.size()){
                    if(botMessages.get(i).getTimestamp()<userMessages.get(j).getTimestamp()){
                        messages.add(new ChatMessage(ChatMessageRole.ASSISTANT.value(),botMessages.get(i).getContent()));
                        i++;
                    }else{
                        messages.add(new ChatMessage(ChatMessageRole.USER.value(),userMessages.get(j).getContent()));
                        j++;
                    }
                }
                while(i<botMessages.size()){
                    messages.add(new ChatMessage(ChatMessageRole.ASSISTANT.value(),botMessages.get(i).getContent()));
                    i++;
                }
                while(j<userMessages.size()){
                    messages.add(new ChatMessage(ChatMessageRole.USER.value(),userMessages.get(j).getContent()));
                    j++;
                }
                ChatMessage response = aiService.getResponse(messages);
                ChatBotMessage chatBotMessage = new ChatBotMessage(999L,response.getContent(),System.currentTimeMillis(),currentChatBot);
                ChatBotMessage save1 = chatBotMessageRepository.save(chatBotMessage);
                return new ResponsePackage(save,save1);
            }else{
                throw new ResourceNotFoundException("ChatBot", "id", chatBot.getId());
            }
        }else{
            throw new ResourceNotFoundException("User|Chat bot", "id", userPrincipal.getId());
        }
    }
    @PutMapping("/chatbots")
    @PreAuthorize("hasRole('USER')")
    public ChatBot createChatbot(@CurrentUser UserPrincipal userPrincipal, @RequestBody ChatBot chatBot) {
        Optional<User> byId = userRepository.findById(userPrincipal.getId());
        if (byId.isPresent()) {
            User user = byId.get();
            chatBot.setCreator(user);
            chatBot.setTimestamp(System.currentTimeMillis());
            return chatBotRepository.save(chatBot);
        }else{
            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        }
    }
    @PostMapping("/chatbot")
    @PreAuthorize("hasRole('USER')")
    public ChatBot getChatBot(@CurrentUser UserPrincipal userPrincipal, @RequestBody ChatBot chatBot) {
        Optional<ChatBot> chatBotOptional = chatBotRepository.findById(chatBot.getId());
        Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
        if (chatBotOptional.isPresent() && optionalUser.isPresent()){
            ChatBot currentChatBot= chatBotOptional.get();
            User currentUser = optionalUser.get();
            if(currentChatBot.getCreator().getId().equals(userPrincipal.getId())){
                return currentChatBot;
            }else{
                throw new ResourceNotFoundException("ChatBot", "id", chatBot.getId());
            }
        }else{
            throw new ResourceNotFoundException("User|Chat bot", "id", userPrincipal.getId());
        }
    }
    @GetMapping("/chatbots")
    @PreAuthorize("hasRole('USER')")
    public List<ChatBot> getChatBots(@CurrentUser UserPrincipal userPrincipal) {
        Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
        if (optionalUser.isPresent()){
            User currentUser = optionalUser.get();
            return chatBotRepository.findByCreator(currentUser);
        }else{
            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        }
    }
}
