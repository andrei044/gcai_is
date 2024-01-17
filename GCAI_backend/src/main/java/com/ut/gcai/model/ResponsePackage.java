package com.ut.gcai.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ResponsePackage {
    ChatUserMessage chatUserMessage;
    ChatBotMessage chatBotMessage;
}
