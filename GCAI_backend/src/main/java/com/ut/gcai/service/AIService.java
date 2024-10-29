package com.ut.gcai.service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
public class AIService {
    private final String myKey="";
    private final OpenAiService service = new OpenAiService(myKey);
    private final String engineId="gpt-3.5-turbo-0613";

    public ChatMessage getResponse(List<ChatMessage>messages){
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
                .builder()
                .model(engineId)
                .messages(messages)
                .n(1)
                .maxTokens(500)
                .build();
        return service.createChatCompletion(chatCompletionRequest).getChoices().get(0).getMessage();
    }
}
