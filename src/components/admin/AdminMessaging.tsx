import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send } from "lucide-react";
import { alumniData } from "@/data/alumniData";
import { conversationsData, messagesData, getConversationKey } from "@/data/messagesData";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AdminMessaging = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(conversationsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  
  useEffect(() => {
    if (selectedConversation) {
      const conversationKey = getConversationKey(
        typeof user?.id === 'string' ? parseInt(user.id, 10) : (user?.id || 1), // Convert string ID to number
        selectedConversation.participants.find((id: number) => {
          const userId = typeof user?.id === 'string' ? parseInt(user.id, 10) : (user?.id || 1);
          return id !== userId;
        })
      );
      
      setMessages(messagesData[conversationKey] || []);
    }
  }, [selectedConversation, user]);
  
  const filteredConversations = conversations.filter(conv => {
    const userId = typeof user?.id === 'string' ? parseInt(user.id, 10) : (user?.id || 1);
    const otherParticipantId = conv.participants.find(id => id !== userId);
    const otherParticipant = alumniData.find(u => u.id === otherParticipantId);
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const getOtherParticipant = (conv: any) => {
    const userId = typeof user?.id === 'string' ? parseInt(user.id, 10) : (user?.id || 1);
    const otherParticipantId = conv.participants.find(id => id !== userId);
    return alumniData.find(u => u.id === otherParticipantId);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;
    
    // In a real app, this would be an API call
    const newMessage = {
      id: Date.now(),
      senderId: user?.id || 1,
      receiverId: selectedConversation.participants.find((id: number) => id !== (user?.id || 1)),
      content: messageText,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Update messages
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Update conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: messageText,
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setMessageText("");
    
    toast.success("Message sent successfully");
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
      <Card className="lg:col-span-1 h-full">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-grow">
            <div className="space-y-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => {
                  const otherParticipant = getOtherParticipant(conv);
                  if (!otherParticipant) return null;
                  
                  return (
                    <div 
                      key={conv.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation?.id === conv.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(otherParticipant.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate">{otherParticipant.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatTime(conv.lastMessageTime)}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {otherParticipant.department} - {otherParticipant.batch}
                          </div>
                        </div>
                      </div>
                      {conv.unreadCount > 0 && (
                        <div className="flex justify-end">
                          <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">
                            {conv.unreadCount}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No conversations found
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2 h-full">
        <CardContent className="p-0 h-full">
          {selectedConversation ? (
            <div className="flex flex-col h-full">
              <div className="border-b p-3 flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(getOtherParticipant(selectedConversation)?.name || "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{getOtherParticipant(selectedConversation)?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {getOtherParticipant(selectedConversation)?.department} - {getOtherParticipant(selectedConversation)?.batch}
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length > 0 ? (
                    messages.map((message) => {
                      const isCurrentUser = message.senderId === (user?.id || 1);
                      
                      return (
                        <div 
                          key={message.id} 
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                            {!isCurrentUser && (
                              <Avatar className="h-8 w-8 mb-1">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {getInitials(getOtherParticipant(selectedConversation)?.name || "")}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                isCurrentUser 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}
                            >
                              <p>{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No messages yet</p>
                      <p className="text-xs text-muted-foreground">Send a message to start the conversation</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <form onSubmit={handleSendMessage} className="border-t p-3 flex">
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 mr-2"
                />
                <Button type="submit" disabled={!messageText.trim()}>
                  <Send size={18} />
                </Button>
              </form>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-4">
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a user from the list to view your messages</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMessaging;
