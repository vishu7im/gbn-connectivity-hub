
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Loader2, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GalleryImage {
  id: number;
  title: string | null;
  description: string | null;
  image_path: string;
  user_id: number;
  uploaded_by: string;
  created_at: string;
}

const API_URL = "http://localhost:5000/api";

const GalleryManager = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);

  // Get all gallery images
  const { data: images, isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const response = await axios.get<GalleryImage[]>(`${API_URL}/gallery`);
      return response.data;
    }
  });

  // Upload image mutation
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedImage) {
        throw new Error('No image selected');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', selectedImage);

      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/gallery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
    },
    onMutate: () => {
      setIsUploading(true);
    },
    onSuccess: () => {
      toast.success('Image uploaded successfully');
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      setTitle('');
      setDescription('');
      setSelectedImage(null);
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  // Delete image mutation
  const deleteMutation = useMutation({
    mutationFn: async (imageId: number) => {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/gallery/${imageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onMutate: (imageId) => {
      setDeleteInProgress(imageId);
    },
    onSuccess: () => {
      toast.success('Image deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
    onError: (error) => {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error('Please select an image');
      return;
    }
    uploadMutation.mutate();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gallery Images</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
              <DialogDescription>
                Upload a new image to the alumni gallery.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="image">Image</Label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading || !selectedImage}>
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload Image'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !images || images.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md p-8 text-center">
          <Image className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium">No images yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Add images to showcase alumni events and activities.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative h-48">
                <img
                  src={`${API_URL}${image.image_path}`}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteMutation.mutate(image.id)}
                  disabled={deleteInProgress === image.id}
                >
                  {deleteInProgress === image.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <CardContent className="p-4">
                {image.title && <h3 className="font-medium">{image.title}</h3>}
                {image.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{image.description}</p>}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Uploaded by {image.uploaded_by}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
