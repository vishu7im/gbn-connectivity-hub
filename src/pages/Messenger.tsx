import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import MessengerConversationList from "@/components/MessengerConversationList";
import MessengerChat from "@/components/MessengerChat";

const Messenger: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeRecipientId, setActiveRecipientId] = useState<number | null>(
    null
  );

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSelectConversation = (userId: number) => {
    setActiveRecipientId(userId);
  };

  return (
    <div className="min-h-screen text-primary-foreground  flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Messages</h1>
            <p className="mt-2 text-gray-200">Connect with fellow alumni</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-gray-100 shadow overflow-hidden h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              {/* Conversation list */}
              <div className="md:col-span-1 border-r h-full">
                <MessengerConversationList
                  onSelectConversation={handleSelectConversation}
                  activeConversationUserId={activeRecipientId}
                />
              </div>

              {/* Chat area */}
              <div className="md:col-span-2 h-full">
                {activeRecipientId ? (
                  <MessengerChat recipientId={activeRecipientId} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-gray-500">
                        Choose an existing conversation or search for alumni to
                        start a new one
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messenger;
