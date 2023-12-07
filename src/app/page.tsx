import ConversationList from "../components/ConversationList";
import SingleConversation from "../components/SingleConversation";

export default function Home() {
    return (
        <main>
            <div className="flex flex-col">
                <div className="flex flex-1">
                    <ConversationList />
                    <SingleConversation />
                </div>
            </div>
        </main>
    );
}
