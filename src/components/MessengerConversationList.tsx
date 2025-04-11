
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserConversations, Conversation } from "@/data/messagesData";
import { alumniData } from "@/data/alumniData";

interface MessengerConversationListProps {
  onSelectConversation: (userId: number) => void;
  activeConversationUserId: number | null;
}

const MessengerConversationList: React.FC<MessengerConversationListProps> = ({
  onSelectConversation,
  activeConversationUserId,
}) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlumni, setFilteredAlumni] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      // Convert string ID to number if needed and get conversations
      const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
      const userConvs = getUserConversations(userId);
      setConversations(userConvs);
    }
  }, [user]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = alumniData.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (typeof alumni.id === 'string' ? parseInt(alumni.id) : alumni.id) !== 
          (typeof user?.id === 'string' ? parseInt(user.id) : user?.id)
      );
      setFilteredAlumni(filtered);
    } else {
      setFilteredAlumni([]);
    }
  }, [searchTerm, user]);

  const getOtherParticipant = (conversation: Conversation) => {
    if (!user) return null;
    const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
    const otherUserId = conversation.participants.find((id) => id !== userId);
    return alumniData.find((a) => (typeof a.id === 'string' ? parseInt(a.id) : a.id) === otherUserId);
  };

  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search alumni..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Search results */}
        {filteredAlumni.length > 0 && (
          <div className="mb-2">
            <h3 className="px-3 py-2 text-xs font-medium text-gray-500">
              SEARCH RESULTS
            </h3>
            {filteredAlumni.map((alumni) => (
              <button
                key={alumni.id}
                className="w-full px-3 py-2 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  onSelectConversation(typeof alumni.id === 'string' ? parseInt(alumni.id) : alumni.id);
                  setSearchTerm("");
                }}
              >
                <Avatar className="h-9 w-9 mr-3">
                  <AvatarFallback className="bg-primary text-primary-foreground  text-xs">
                    {getInitials(alumni.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-sm">{alumni.name}</p>
                  <p className="text-xs text-gray-500">
                    {alumni.department} - {alumni.batch}
                  </p>
                </div>
              </button>
            ))}
            <div className="border-t my-2"></div>
          </div>
        )}

        {/* Conversations list */}
        {searchTerm === "" && (
          <>
            <h3 className="px-3 py-2 text-xs font-medium text-gray-500">
              RECENT MESSAGES
            </h3>
            {conversations.length > 0 ? (
              conversations.map((conversation) => {
                const otherUser = getOtherParticipant(conversation);
                if (!otherUser) return null;
                
                const otherUserId = typeof otherUser.id === 'string' ? parseInt(otherUser.id) : otherUser.id;
                const isActive = activeConversationUserId === otherUserId;

                return (
                  <button
                    key={conversation.id}
                    className={`w-full px-3 py-2 ${
                      isActive ? "bg-gray-100" : "hover:bg-gray-100"
                    } flex items-center`}
                    onClick={() => onSelectConversation(otherUserId)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-[#0a2463] text-white">
                          {getInitials(otherUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unreadCount > 0 && (
                        <span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-left flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{otherUser.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessageTime)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center p-4 text-gray-500">
                <p>No conversations yet</p>
                <p className="text-xs">Search for alumni to start chatting</p>
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default MessengerConversationList;
