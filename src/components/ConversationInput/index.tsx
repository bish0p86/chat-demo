import React, { useState, useContext, useEffect } from "react";
import { ConversationContext } from "../../providers/ConversationProvider";

const ConversationInput: React.FC = () => {
    const { addMessage, currentConversation, selectedMessage, editMessage } =
        useContext(ConversationContext);
    const [message, setMessage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");

        if (selectedMessage) {
            return editMessage(
                currentConversation?.id || "",
                selectedMessage.id,
                message
            );
        }
        if (currentConversation) {
            return addMessage(currentConversation.id, message);
        }
    };

    useEffect(() => {
        if (selectedMessage) {
            setMessage(selectedMessage.text);
        }
    }, [selectedMessage]);

    return (
        <form
            onSubmit={handleSubmit}
            className=" bg-pale-green p-8 flex flex-row justify-between items-center"
        >
            <input
                type="text"
                name="message"
                value={message}
                onChange={handleChange}
                placeholder="Type your message..."
                aria-label="Message input"
                className="border border-dark-green rounded px-4 py-2 w-full mx-4"
            />
            <button
                type="submit"
                aria-label="Send message"
                disabled={!message}
                className="rounded border border-dark-green text-dark-green px-4 py-2 hover:bg-dark-green hover:text-white transition-colors duration-300 ease-in-out"
            >
                Send
            </button>
        </form>
    );
};

export default ConversationInput;
