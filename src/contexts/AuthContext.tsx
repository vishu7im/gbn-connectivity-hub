
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { Post, Comment } from "@/data/postsData";
import { Message, getConversationKey } from "@/data/messagesData";

interface User {
  id: number;
  name: string;
  email: string;
  isAlumni: boolean;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, batch: string, department: string) => Promise<boolean>;
  createPost: (content: string, image?: string) => Promise<Post | null>;
  addComment: (postId: number, content: string) => Promise<Comment | null>;
  likePost: (postId: number) => Promise<boolean>;
  sendMessage: (receiverId: number, content: string) => Promise<Message | null>;
  markMessagesAsRead: (conversationKey: string) => Promise<boolean>;
}

// Sample user data - in a real app, this would come from a database
const sampleUsers = [
  {
    id: 1,
    name: "Rajiv Kumar",
    email: "rajiv@example.com",
    password: "password123",
    isAlumni: true,
    batch: "2018",
    department: "Computer Science"
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    password: "password123",
    isAlumni: true,
    batch: "2019",
    department: "Electrical Engineering"
  }
];

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data in localStorage on component mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = sampleUsers.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
          toast.success("Login successful");
          resolve(true);
        } else {
          toast.error("Invalid email or password");
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast.info("You've been logged out");
  };

  const register = async (name: string, email: string, password: string, batch: string, department: string): Promise<boolean> => {
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const userExists = sampleUsers.some(u => u.email === email);
        
        if (userExists) {
          toast.error("User with this email already exists");
          resolve(false);
        } else {
          // In a real app, we would add this user to the database
          const newUser = {
            id: sampleUsers.length + 1,
            name,
            email,
            password,
            isAlumni: true,
            batch,
            department
          };
          
          // Add to our sample users (simulate database insert)
          sampleUsers.push(newUser);
          
          // Log the user in
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
          
          toast.success("Registration successful");
          resolve(true);
        }
      }, 800);
    });
  };

  // New function for creating posts
  const createPost = async (content: string, image?: string): Promise<Post | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          toast.error("You must be logged in to create a post");
          resolve(null);
          return;
        }

        // In a real app, this would be an API call to create a post
        // Here we're simulating it
        import("@/data/postsData").then(({ postsData }) => {
          const newPost: Post = {
            id: Math.max(...postsData.map(p => p.id)) + 1,
            userId: user.id,
            userName: user.name,
            content,
            image,
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: []
          };
          
          // Add to our posts (simulate database insert)
          postsData.unshift(newPost);
          
          toast.success("Post created successfully");
          resolve(newPost);
        });
      }, 500);
    });
  };

  // Function for adding comments
  const addComment = async (postId: number, content: string): Promise<Comment | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          toast.error("You must be logged in to comment");
          resolve(null);
          return;
        }

        // In a real app, this would be an API call
        import("@/data/postsData").then(({ postsData }) => {
          const postIndex = postsData.findIndex(p => p.id === postId);
          
          if (postIndex === -1) {
            toast.error("Post not found");
            resolve(null);
            return;
          }
          
          const newComment: Comment = {
            id: Math.max(0, ...postsData[postIndex].comments.map(c => c.id)) + 1,
            userId: user.id,
            userName: user.name,
            content,
            createdAt: new Date().toISOString()
          };
          
          // Add comment to post
          postsData[postIndex].comments.push(newComment);
          
          toast.success("Comment added");
          resolve(newComment);
        });
      }, 300);
    });
  };

  // Function for liking posts
  const likePost = async (postId: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          toast.error("You must be logged in to like posts");
          resolve(false);
          return;
        }

        // In a real app, this would be an API call
        import("@/data/postsData").then(({ postsData }) => {
          const postIndex = postsData.findIndex(p => p.id === postId);
          
          if (postIndex === -1) {
            toast.error("Post not found");
            resolve(false);
            return;
          }
          
          // Increment likes
          postsData[postIndex].likes += 1;
          
          resolve(true);
        });
      }, 300);
    });
  };

  // Function for sending messages
  const sendMessage = async (receiverId: number, content: string): Promise<Message | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          toast.error("You must be logged in to send messages");
          resolve(null);
          return;
        }

        // In a real app, this would be an API call
        import("@/data/messagesData").then(({ messagesData, conversationsData, getConversationKey }) => {
          const conversationKey = getConversationKey(user.id, receiverId);
          
          const newMessage: Message = {
            id: Date.now(),
            senderId: user.id,
            receiverId,
            content,
            timestamp: new Date().toISOString(),
            read: false
          };
          
          // Add message to conversation
          if (!messagesData[conversationKey]) {
            messagesData[conversationKey] = [];
          }
          messagesData[conversationKey].push(newMessage);
          
          // Update or create conversation
          const existingConversation = conversationsData.find(
            conv => conv.participants.includes(user.id) && conv.participants.includes(receiverId)
          );
          
          if (existingConversation) {
            existingConversation.lastMessage = content;
            existingConversation.lastMessageTime = newMessage.timestamp;
            existingConversation.unreadCount += 1;
          } else {
            conversationsData.push({
              id: conversationsData.length + 1,
              participants: [user.id, receiverId],
              lastMessage: content,
              lastMessageTime: newMessage.timestamp,
              unreadCount: 1
            });
          }
          
          toast.success("Message sent");
          resolve(newMessage);
        });
      }, 400);
    });
  };

  // Function for marking messages as read
  const markMessagesAsRead = async (conversationKey: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          resolve(false);
          return;
        }

        // In a real app, this would be an API call
        import("@/data/messagesData").then(({ messagesData, conversationsData }) => {
          // Get user ids from conversation key
          const userIds = conversationKey.split('-').map(Number);
          
          if (!messagesData[conversationKey]) {
            resolve(false);
            return;
          }
          
          // Mark all messages as read
          messagesData[conversationKey].forEach(msg => {
            if (msg.receiverId === user.id) {
              msg.read = true;
            }
          });
          
          // Update conversation unread count
          const conversationIndex = conversationsData.findIndex(
            conv => userIds.every(id => conv.participants.includes(id))
          );
          
          if (conversationIndex !== -1) {
            conversationsData[conversationIndex].unreadCount = 0;
          }
          
          resolve(true);
        });
      }, 300);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register,
      createPost,
      addComment,
      likePost,
      sendMessage,
      markMessagesAsRead
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
