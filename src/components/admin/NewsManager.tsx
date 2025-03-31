
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, FileText, Image, Loader2, Plus, Trash } from "lucide-react";
import { format } from 'date-fns';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string | null;
  user_id: number;
  author_name: string;
  created_at: string;
  updated_at: string;
}

const API_URL = "http://localhost:5000/api";

const NewsManager = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState<number | null>(null);
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);

  // Get all news
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['newsItems'],
    queryFn: async () => {
      const response = await axios.get<NewsItem[]>(`${API_URL}/news`);
      return response.data;
    }
  });

  // Create news mutation
  const createNewsMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/news`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      toast.success('News created successfully');
      queryClient.invalidateQueries({ queryKey: ['newsItems'] });
      resetForm();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error creating news:', error);
      toast.error('Failed to create news');
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  // Update news mutation
  const updateNewsMutation = useMutation({
    mutationFn: async () => {
      if (!currentNewsId) return;
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/news/${currentNewsId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      toast.success('News updated successfully');
      queryClient.invalidateQueries({ queryKey: ['newsItems'] });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error updating news:', error);
      toast.error('Failed to update news');
    },
    onSettled: () => {
      setIsSubmitting(false);
      setCurrentNewsId(null);
    }
  });

  // Delete news mutation
  const deleteNewsMutation = useMutation({
    mutationFn: async (newsId: number) => {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/news/${newsId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onMutate: (newsId) => {
      setDeleteInProgress(newsId);
    },
    onSuccess: () => {
      toast.success('News deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['newsItems'] });
    },
    onError: (error) => {
      console.error('Error deleting news:', error);
      toast.error('Failed to delete news');
    },
    onSettled: () => {
      setDeleteInProgress(null);
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Please provide title and content');
      return;
    }
    createNewsMutation.mutate();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Please provide title and content');
      return;
    }
    updateNewsMutation.mutate();
  };

  const openEditDialog = (news: NewsItem) => {
    setTitle(news.title);
    setContent(news.content);
    setCurrentNewsId(news.id);
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedImage(null);
    setCurrentNewsId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">News Articles</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Article</DialogTitle>
              <DialogDescription>
                Create a new news article for alumni.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreate}>
              <div className="space-y-4 py-2">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    required
                  />
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="image">Image (Optional)</Label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Publish News'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Edit News Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
            <DialogDescription>
              Update the news article details.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUpdate}>
            <div className="space-y-4 py-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                />
              </div>
              
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  required
                />
              </div>
              
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="edit-image">Replace Image (Optional)</Label>
                <Input 
                  id="edit-image" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update News'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !newsItems || newsItems.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md p-8 text-center">
          <FileText className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium">No news articles</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Add news articles to keep alumni informed.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Article
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {newsItems.map((news) => (
            <Card key={news.id} className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                {news.image && (
                  <div className="md:col-span-1 h-48 md:h-full">
                    <img
                      src={`${API_URL}${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`${news.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <ScrollArea className="h-24">
                      <p className="text-sm">{news.content}</p>
                    </ScrollArea>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                      Published by {news.author_name} on {format(new Date(news.created_at), 'MMM dd, yyyy')}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(news)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteNewsMutation.mutate(news.id)}
                      disabled={deleteInProgress === news.id}
                    >
                      {deleteInProgress === news.id ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4 mr-1" />
                      )}
                      Delete
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsManager;
