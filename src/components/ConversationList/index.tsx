"use client";
import { useContext } from "react";
import { ConversationContext } from "../../providers/ConversationProvider";

const ConversationList: React.FC = () => {
    const { conversations, setCurrentConversation } =
        useContext(ConversationContext);

    return (
        <div className="overflow-y-auto border-r border-white/20 w-1/4">
            <ul>
                {conversations.map((conversation) => (
                    <li
                        key={conversation.id}
                        onClick={setCurrentConversation(conversation.id)}
                        className="cursor-pointer even:bg-pale-green/30 px-4 py-2 odd:bg-pale-green"
                    >
                        {conversation.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationList;
