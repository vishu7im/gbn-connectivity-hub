
export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: number;
  participants: number[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// Sample messages data
export const messagesData: { [key: string]: Message[] } = {
  // Conversation between user 1 and 2
  "1-2": [
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      content: "Hi Priya, how are you doing?",
      timestamp: "2023-05-20T10:30:00",
      read: true
    },
    {
      id: 2,
      senderId: 2,
      receiverId: 1,
      content: "Hey Rajiv! I'm good, just busy with a new project. How about you?",
      timestamp: "2023-05-20T10:35:00",
      read: true
    },
    {
      id: 3,
      senderId: 1,
      receiverId: 2,
      content: "I'm great! Just got promoted actually. Hey, do you have the contact of Prof. Sharma?",
      timestamp: "2023-05-20T10:40:00",
      read: true
    },
    {
      id: 4,
      senderId: 2,
      receiverId: 1,
      content: "Congratulations on the promotion! Yes, I'll DM you his email.",
      timestamp: "2023-05-20T10:45:00",
      read: false
    }
  ],
  
  // Conversation between user 1 and 3
  "1-3": [
    {
      id: 5,
      senderId: 3,
      receiverId: 1,
      content: "Hello Rajiv, are you attending the alumni meet next month?",
      timestamp: "2023-05-18T14:20:00",
      read: true
    },
    {
      id: 6,
      senderId: 1,
      receiverId: 3,
      content: "Hi Amit! Yes, I've already registered. Are you coming?",
      timestamp: "2023-05-18T14:30:00",
      read: true
    },
    {
      id: 7,
      senderId: 3,
      receiverId: 1,
      content: "Great! Yes, I'll be there. Looking forward to catching up!",
      timestamp: "2023-05-18T14:35:00",
      read: false
    }
  ]
};

// Sample conversations list
export const conversationsData: Conversation[] = [
  {
    id: 1,
    participants: [1, 2],
    lastMessage: "Congratulations on the promotion! Yes, I'll DM you his email.",
    lastMessageTime: "2023-05-20T10:45:00",
    unreadCount: 1
  },
  {
    id: 2,
    participants: [1, 3],
    lastMessage: "Great! Yes, I'll be there. Looking forward to catching up!",
    lastMessageTime: "2023-05-18T14:35:00",
    unreadCount: 1
  }
];

// Helper function to get conversations for a specific user
export const getUserConversations = (userId: number) => {
  return conversationsData.filter(conv => conv.participants.includes(userId));
};

// Helper function to get messages for a specific conversation
export const getConversationMessages = (user1Id: number, user2Id: number) => {
  const conversationKey = [user1Id, user2Id].sort().join('-');
  return messagesData[conversationKey] || [];
};

// Helper function to generate a conversation key
export const getConversationKey = (user1Id: number, user2Id: number) => {
  return [user1Id, user2Id].sort().join('-');
};
