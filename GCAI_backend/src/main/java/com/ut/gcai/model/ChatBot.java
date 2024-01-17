package com.ut.gcai.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Entity
public class ChatBot{
    @jakarta.persistence.Id
    @Id
    @Column(name="chatbot_id")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String name;
    @Column(length = 4000)
    private String description;
    @JsonIgnore
    private Long timestamp;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User creator;
}
