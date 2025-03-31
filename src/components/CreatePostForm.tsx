
import React, { useState } from "react";
import { Image, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

interface CreatePostFormProps {
  onPostCreated?: () => void;
}

const API_URL = "http://localhost:5000/api";

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Get token from local storage
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }
      
      // Create post using API
      await axios.post(
        `${API_URL}/posts`, 
        { content, image: image || undefined },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Reset form
      setContent("");
      setImage("");
      
      // Notify parent component
      if (onPostCreated) {
        onPostCreated();
      }
      
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // For demo purposes, we'll use a simple input for image URL
  // In a real app, you'd use file upload
  const handleImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) setImage(url);
  };

  return (
    <Card className="mb-6 shadow-medium dark:shadow-soft">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex items-start">
            <Avatar className="h-10 w-10 mr-3 shadow-soft">
              <AvatarFallback className="bg-[#0a2463] text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share something with the alumni community..."
              className="flex-1 resize-none shadow-inner-light"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          {image && (
            <div className="mt-4 relative">
              <img 
                src={image} 
                alt="Post preview" 
                className="w-full h-auto max-h-[200px] object-cover rounded-md shadow-medium"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                onClick={() => setImage("")}
              >
                ✕
              </button>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={handleImageUrl}
            disabled={isSubmitting}
            className="button-shadow"
          >
            <Image size={18} className="mr-1" />
            Add Image
          </Button>
          <Button 
            type="submit" 
            disabled={!content.trim() || isSubmitting}
            className="button-shadow"
          >
            <Send size={18} className="mr-1" />
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;
