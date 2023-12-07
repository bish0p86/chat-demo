"use client";
import { useContext } from "react";
import ConversationInput from "../ConversationInput";
import { ConversationContext } from "../../providers/ConversationProvider";
import dayjs from "dayjs";

const SingleConversation: React.FC = () => {
    const { currentConversation, onMessageSelect } =
        useContext(ConversationContext);

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex-grow flex overflow-auto">
                {currentConversation && (
                    <ul className="w-full p-10">
                        {currentConversation.messages.map((message) => (
                            <li
                                key={message.id}
                                onClick={() => onMessageSelect(message)}
                                className="text-white mb-6 rounded border border-white/20 p-4 w-full hover:bg-pale-green/20 transition-colors duration-300 ease-in-out cursor-pointer"
                            >
                                <div>
                                    <span className="font-bold">
                                        {dayjs(message.last_updated).toString()}
                                    </span>
                                    <p>{message.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ConversationInput />
        </div>
    );
};

export default SingleConversation;
