
import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getConversationMessages, getConversationKey } from "@/data/messagesData";
import { alumniData } from "@/data/alumniData";

interface MessengerChatProps {
  recipientId: number;
}

const MessengerChat: React.FC<MessengerChatProps> = ({ recipientId }) => {
  const { user, sendMessage, markMessagesAsRead } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [recipient, setRecipient] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Find recipient details
    const recipientData = alumniData.find(a => a.id === recipientId);
    setRecipient(recipientData || null);
    
    if (!user || !recipientId) return;
    
    // Get conversation messages - convert user.id to number if it's a string
    const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
    const conversationMessages = getConversationMessages(userId, recipientId);
    setMessages(conversationMessages);
    
    // Mark messages as read
    const conversationKey = getConversationKey(userId, recipientId);
    markMessagesAsRead(conversationKey);
    
    // Set up interval to check for new messages (simulating real-time)
    const interval = setInterval(() => {
      const updatedMessages = getConversationMessages(userId, recipientId);
      if (updatedMessages.length !== messages.length) {
        setMessages(updatedMessages);
        markMessagesAsRead(conversationKey);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [user, recipientId, markMessagesAsRead]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !recipientId || !messageText.trim()) return;
    
    setIsSending(true);
    await sendMessage(recipientId, messageText.trim());
    
    // Update local messages
    const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
    const updatedMessages = getConversationMessages(userId, recipientId);
    setMessages(updatedMessages);
    
    setMessageText("");
    setIsSending(false);
  };
  
  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  if (!user || !recipient) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Select a conversation</p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="border-b p-3 flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback className="bg-[#0a2463] text-white">
            {getInitials(recipient?.name || "")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{recipient?.name}</p>
          <p className="text-xs text-gray-500">{recipient?.department} - {recipient?.batch}</p>
        </div>
      </div>
      
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => {
              const isCurrentUser = message.senderId === user.id;
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mb-1">
                        <AvatarFallback className="bg-[#0a2463] text-white text-xs">
                          {getInitials(recipient.name)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        isCurrentUser 
                          ? 'bg-[#0a2463] text-white' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No messages yet</p>
              <p className="text-xs text-gray-400">Send a message to start the conversation</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t p-3 flex">
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2"
          disabled={isSending}
        />
        <Button type="submit" disabled={!messageText.trim() || isSending}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

// Helper function moved from inside component
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

export default MessengerChat;
