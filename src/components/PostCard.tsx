
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Post } from "@/data/postsData";

interface PostCardProps {
  post: Post;
  showComments?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showComments = true }) => {
  const { user, likePost, addComment } = useAuth();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    // Convert number id to string if needed
    const postId = typeof post.id === 'number' ? post.id.toString() : post.id;
    await likePost(postId);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    setIsSubmitting(true);
    // Convert number id to string if needed
    const postId = typeof post.id === 'number' ? post.id.toString() : post.id;
    await addComment(postId, comment.trim());
    setComment("");
    setIsSubmitting(false);
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

  // Display limited comments if not showing all
  const displayedComments = showAllComments
    ? post.comments
    : post.comments.length > 2
    ? post.comments.slice(-2)
    : post.comments;

  return (
    <Card className="h-full  flex flex-col">
      <CardHeader className="p-4 flex flex-row space-y-0 items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(post.userName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <Link
            to={`/members/${post.userId}`}
            className="font-medium hover:underline"
          >
            {post.userName}
          </Link>
          <p className="text-xs text-gray-500">{formatTime(post.createdAt)}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="mb-4 whitespace-pre-line">{post.content}</p>
        {post.image && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img
              src={post.image}
              alt="Post attachment"
              className="w-full h-auto max-h-[400px] object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col items-start">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className="flex items-center text-gray-500 hover:text-primary"
            >
              <Heart size={18} className="mr-1" />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center text-gray-500">
              <MessageSquare size={18} className="mr-1" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>

        {showComments && (
          <>
            <Separator className="my-4" />

            {post.comments.length > 2 && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                className="text-sm text-blue-600 hover:underline mb-2"
              >
                View all {post.comments.length} comments
              </button>
            )}

            {displayedComments.map((comment) => (
              <div key={comment.id} className="flex  mb-3 w-full">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {getInitials(comment.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="p-2 rounded-lg">
                    <Link
                      to={`/members/${comment.userId}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {comment.userName}
                    </Link>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}

            {user && (
              <form onSubmit={handleSubmitComment} className="flex w-full mt-2">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 mr-2"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!comment.trim() || isSubmitting}
                >
                  <Send size={16} />
                </Button>
              </form>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
