"use client";
import React, { createContext, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

type Message = {
    id: string;
    text: string;
    last_updated: string;
};

type Conversation = {
    id: string;
    name: string;
    last_updated: string;
    messages: Message[];
    active?: boolean;
};

type ConversationProviderProps = {
    conversations: Conversation[];
    children: React.ReactNode;
};

interface ConversationContextValue {
    conversations: Conversation[];
    addMessage: (conversationId: string, message: string) => void;
    editMessage: (
        conversationId: string,
        messageId: string,
        newText: string
    ) => void;
    setCurrentConversation: (conversationId: string) => () => void;
    currentConversation?: Conversation;
    selectedMessage: Message | null;
    onMessageSelect: (message: Message) => void;
}

export const ConversationContext = createContext<ConversationContextValue>({
    conversations: [],
    addMessage: () => {},
    editMessage: () => {},
    setCurrentConversation: () => () => {},
    currentConversation: undefined,
    selectedMessage: null,
    onMessageSelect: () => {},
});

export const ConversationProvider: React.FC<ConversationProviderProps> = ({
    conversations: initialConversations,
    children,
}) => {
    const sortedConversations = useMemo(() => {
        return initialConversations.sort((a, b) => {
            return (
                new Date(b.last_updated).getTime() -
                new Date(a.last_updated).getTime()
            );
        });
    }, [initialConversations]);

    const [conversations, setConversations] =
        useState<Conversation[]>(sortedConversations);

    const [selectedMessage, setSelectedMessage] = useState<Message | null>(
        null
    );

    const addMessage = (conversationId: string, message: string) => {
        const now = new Date();
        setConversations((prevConversations) => {
            return prevConversations.map((conversation) => {
                if (conversation.id === conversationId) {
                    return {
                        ...conversation,
                        messages: [
                            ...conversation.messages,
                            {
                                id: uuidv4(),
                                text: message,
                                last_updated: now.toISOString(),
                            },
                        ],
                        last_updated: now.toISOString(),
                    };
                }
                return conversation;
            });
        });
    };

    const getConversation = (conversationId: string, toggle: string) => {
        const conversation = conversations.find(
            (conversation) => conversation.id === conversationId
        );

        if (conversation) {
            conversation.messages.sort((a, b) => {
                const dateA = new Date(a.last_updated).getTime();
                const dateB = new Date(b.last_updated).getTime();
                return toggle === "ASC" ? dateA - dateB : dateB - dateA;
            });
        }

        return conversation;
    };

    const setCurrentConversation = (conversationId: string) => {
        return () => {
            const conversation = getConversation(conversationId, "ASC");
            if (conversation) {
                setConversations((prevConversations) => {
                    return prevConversations.map((conversation) => {
                        return {
                            ...conversation,
                            active: conversation.id === conversationId,
                        };
                    });
                });
            }
        };
    };

    const editMessage = (
        conversationId: string,
        messageId: string,
        newText: string
    ) => {
        setConversations((prevConversations) => {
            return prevConversations.map((conversation) => {
                if (conversation.id === conversationId) {
                    const updatedMessages = conversation.messages.map(
                        (message) => {
                            if (message.id === messageId) {
                                return {
                                    ...message,
                                    text: newText,
                                };
                            }
                            return message;
                        }
                    );

                    return {
                        ...conversation,
                        messages: updatedMessages,
                        last_updated: new Date().toISOString(),
                    };
                }
                return conversation;
            });
        });

        setSelectedMessage(null);
    };

    const onMessageSelect = (message: Message) => {
        setSelectedMessage(message);
    };

    return (
        <ConversationContext.Provider
            value={{
                conversations,
                addMessage,
                setCurrentConversation,
                editMessage,
                onMessageSelect,
                selectedMessage,
                currentConversation: conversations.find(
                    (conversation) => conversation.active
                ),
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};
