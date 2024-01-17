export type Chatbot ={
    id: number
    name: string
    description: string
}

export function toStringChatbot(chatbot: Chatbot): string {
    return JSON.stringify({
        id: chatbot.id,
        name: chatbot.name,
        description: chatbot.description
    });
}

export type ChatMessage ={
    id: number
    content: string
    timestamp: number
    sender: string
    status: string
}

export type MyPayload ={
    id: number
    message: ChatMessage
}

export type ChatUserMessage={
    id:number
    content:string
    timestamp: number
    toChatBot:Chatbot
    user: User
}

export function toStringChatUserMessage(chatUserMessage:ChatUserMessage): string {
    return JSON.stringify({
        id:chatUserMessage.id,
        content:chatUserMessage.content,
        timestamp:chatUserMessage.timestamp,
        toChatBot: toStringChatbot(chatUserMessage.toChatBot),
        user: toStringUser(chatUserMessage.user)

    })
}

export type ProcessedMessage={
    chatUserMessage: ChatUserMessage
    chatBot: Chatbot
}

export type User={
    id: number,
    name: string,
    email: string,
    imageUrl: string,
    emailVerified: string,
    provider: string,
    providerId: string
}

export function toStringUser(user:User): string {
    return JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        emailVerified: user.emailVerified,
        provider: user.provider,
        providerId: user.providerId
    });
}

export function toStringProcessedMessage(user:User,chatbot:Chatbot,msg:string){
    let x:ChatUserMessage={
        id:999,
        content:msg,
        timestamp: 0,
        toChatBot:chatbot,
        user: user
    }
    return JSON.stringify({
        
        chatUserMessage:x,
        chatBot:chatbot
    })
}
  

export type BackendMessage={
    id: number,
    content: string,
    timestamp: number,
    chatBot: Chatbot,
    user: User,
    toChatBot:Chatbot,
}

export type ResponsePackage={
    chatUserMessage:BackendMessage,
    chatBotMessage:BackendMessage
}

export type ConversationMap={ [id: number] : ChatMessage[]; }