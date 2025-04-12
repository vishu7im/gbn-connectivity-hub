
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Loader2, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GalleryImageType } from '@/data/mockAdminData';
import { format } from 'date-fns';

interface GalleryManagerProps {
  images: GalleryImageType[];
}

const GalleryManager = ({ images }: GalleryManagerProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>(images);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error('Please select an image');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create a new mock image entry
      const newImage: GalleryImageType = {
        id: Math.floor(Math.random() * 10000),
        title: title || null,
        description: description || null,
        image_path: imagePreview || '/placeholder.svg',
        user_id: 1,
        uploaded_by: 'Admin User',
        created_at: new Date().toISOString(),
      };
      
      setGalleryImages([newImage, ...galleryImages]);
      
      toast.success('Image uploaded successfully');
      setTitle('');
      setDescription('');
      setSelectedImage(null);
      setImagePreview(null);
      setIsAddDialogOpen(false);
      setIsUploading(false);
    }, 1500);
  };

  const handleDelete = (imageId: number) => {
    setDeleteInProgress(imageId);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setGalleryImages(galleryImages.filter(img => img.id !== imageId));
      setDeleteInProgress(null);
      toast.success('Image deleted successfully');
    }, 1000);
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
                  
                  {imagePreview && (
                    <div className="mt-2 relative w-full h-40 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
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
      
      {galleryImages.length === 0 ? (
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
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative h-48">
                <img
                  src={typeof image.image_path === 'string' && image.image_path.startsWith('/') 
                    ? image.image_path 
                    : image.image_path}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(image.id)}
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
                  Uploaded by {image.uploaded_by} on {format(new Date(image.created_at), "MMM d, yyyy")}
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
