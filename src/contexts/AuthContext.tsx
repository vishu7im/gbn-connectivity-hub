
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface User {
  _id: string;
  id: string; 
  name: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationStatus: string;
  rejectionRemarks?: string;
  batch?: string;
  department?: string;
  currentRole?: string;
  company?: string;
  location?: string;
  profilePicture?: string;
  phone?: string;
  bio?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  // New document fields
  verificationDocument?: string;
  documentType?: string;
  documentName?: string;
  isBlocked?: boolean;
  createdAt?: Date | string;
  lastLogin?: Date | string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    name: string, 
    email: string, 
    password: string, 
    batch: string, 
    department: string,
    rollNumber?: string,
    verificationDocument?: string,
    documentType?: string,
    documentName?: string
  ) => Promise<boolean>;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
  createPost: (content: string, image?: string) => Promise<any>;
  addComment: (postId: string, content: string) => Promise<any>;
  likePost: (postId: string) => Promise<boolean>;
  sendMessage: (recipientId: number, content: string) => Promise<boolean>;
  markMessagesAsRead: (conversationKey: string) => void;
  canAccessFeature: (feature: 'posts' | 'jobs') => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(response.data);
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    batch: string, 
    department: string,
    rollNumber?: string,
    verificationDocument?: string,
    documentType?: string,
    documentName?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        batch,
        department,
        rollNumber,
        verificationDocument,
        documentType,
        documentName
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem("token", token);
      setUser(user);
      
      toast.success("Registration successful! Your account is pending verification.");
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem("token", token);
      setUser(user);
      
      toast.success("Login successful");
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("You've been logged out");
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("You must be logged in to update your profile");
        return false;
      }
      
      const response = await axios.put(
        `${API_URL}/auth/profile`,
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUser(response.data.user);
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update profile";
      toast.error(message);
      return false;
    }
  };

  // Check if user can access features that require verification
  const canAccessFeature = (feature: 'posts' | 'jobs'): boolean => {
    if (!user) {
      return false; // Not logged in
    }
    
    // Check if user is verified and not blocked
    return user.isVerified && 
      user.verificationStatus === 'approved' && 
      !user.isBlocked;
  };

  const createPost = async (content: string, image?: string) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("You must be logged in to create a post");
        return null;
      }
      
      if (!canAccessFeature('posts')) {
        toast.error("Your account must be verified to create posts");
        return null;
      }
      
      const response = await axios.post(
        `${API_URL}/posts`,
        { content, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Post created successfully");
      return response.data.post;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create post";
      toast.error(message);
      return null;
    }
  };

  const addComment = async (postId: string, content: string) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("You must be logged in to comment");
        return null;
      }
      
      if (!canAccessFeature('posts')) {
        toast.error("Your account must be verified to comment");
        return null;
      }
      
      const response = await axios.post(
        `${API_URL}/posts/${postId}/comments`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Comment added successfully");
      return response.data.comment;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to add comment";
      toast.error(message);
      return null;
    }
  };

  const likePost = async (postId: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("You must be logged in to like posts");
        return false;
      }
      
      if (!canAccessFeature('posts')) {
        toast.error("Your account must be verified to like posts");
        return false;
      }
      
      await axios.post(
        `${API_URL}/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to like post";
      toast.error(message);
      return false;
    }
  };

  const sendMessage = async (recipientId: number, content: string): Promise<boolean> => {
    try {
      console.log(`Sending message to ${recipientId}: ${content}`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  };

  const markMessagesAsRead = (conversationKey: string): void => {
    console.log(`Marking conversation ${conversationKey} as read`);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register,
      updateProfile,
      createPost,
      addComment,
      likePost,
      sendMessage,
      markMessagesAsRead,
      canAccessFeature
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
