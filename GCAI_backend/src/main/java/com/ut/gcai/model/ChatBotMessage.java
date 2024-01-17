package com.ut.gcai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ChatBotMessage implements MyChatMessage {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(length = 4000)
    private String content;
    private Long timestamp;
    @ManyToOne
    @JoinColumn(name = "chatbot_id")
    private ChatBot chatBot;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
