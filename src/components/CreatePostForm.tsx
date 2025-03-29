
import React, { useState } from "react";
import { Image, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

const CreatePostForm: React.FC = () => {
  const { user, createPost } = useAuth();
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
    await createPost(content, image || undefined);
    setContent("");
    setImage("");
    setIsSubmitting(false);
  };

  // For demo purposes, we'll use a simple input for image URL
  // In a real app, you'd use file upload
  const handleImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) setImage(url);
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex items-start">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback className="bg-[#0a2463] text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share something with the alumni community..."
              className="flex-1 resize-none"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          {image && (
            <div className="mt-4 relative">
              <img 
                src={image} 
                alt="Post preview" 
                className="w-full h-auto max-h-[200px] object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
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
          >
            <Image size={18} className="mr-1" />
            Add Image
          </Button>
          <Button 
            type="submit" 
            disabled={!content.trim() || isSubmitting}
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
