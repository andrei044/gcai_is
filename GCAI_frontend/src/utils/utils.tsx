import { MY_TOKEN } from "../constants";
import { ChatMessage, Chatbot, User,toStringChatbot,toStringProcessedMessage,toStringUser } from "../types/types";

export function api<T>(url: string): Promise<T | { data: T; }> {
    return fetch(url,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem(MY_TOKEN)
        },
        method:"GET",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<{ data: T }>
        })
        .then(data => {
            return data
        })
}

export function apiPOST<T>(url: string): Promise<T | { data: T; }> {
    return fetch(url,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem(MY_TOKEN)
        },
        method:"POST",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<{ data: T }>
        })
        .then(data => {
            return data
        })
}

export function apiGetMessages<T>(url: string, chatbotToSend: Chatbot): Promise<T | { data: T; }> {
    return fetch(url,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem(MY_TOKEN)
        },
        method:"POST",
        body: toStringChatbot(chatbotToSend),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<{ data: T }>
        })
        .then(data => {
            return data
        })
}

export function apiPutMessages<T>(url: string, chatbotToSend: Chatbot,currentUser:User,msg:string): Promise<T | { data: T; }> {
    return fetch(url,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem(MY_TOKEN)
        },
        method:"PUT",
        body: toStringProcessedMessage(currentUser,chatbotToSend,msg),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<{ data: T }>
        })
        .then(data => {
            return data
        })
}

export function apiPutChatbots<T>(url: string, chatbot: Chatbot): Promise<T | { data: T; }> {
    return fetch(url,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem(MY_TOKEN)
        },
        method:"PUT",
        body: toStringChatbot(chatbot),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<{ data: T }>
        })
        .then(data => {
            return data
        })
}
