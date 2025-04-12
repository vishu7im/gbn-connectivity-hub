
import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Image,
  Plus,
  Trash2,
  Upload,
  Edit,
  ChevronUp,
  ChevronDown,
  Loader2
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface CarouselImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

interface CarouselManagerProps {
  images?: CarouselImage[];
}

const CarouselManager: React.FC<CarouselManagerProps> = ({ images: initialImages = [] }) => {
  const [images, setImages] = useState<CarouselImage[]>(initialImages);
  const [newImage, setNewImage] = useState<Partial<CarouselImage>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = () => {
    if (!imagePreview) {
      toast.error("Please upload an image");
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newImageObj: CarouselImage = {
        id: Date.now().toString(),
        url: imagePreview,
        title: newImage.title || "",
        description: newImage.description || "",
      };

      setImages([...images, newImageObj]);
      setNewImage({});
      setImageFile(null);
      setImagePreview(null);
      setIsAddDialogOpen(false);
      setIsUploading(false);
      toast.success("Carousel image added successfully");
    }, 1500);
  };

  const handleUpdateImage = () => {
    if (selectedImageIndex === null) return;
    
    setIsUploading(true);

    // Simulate update process
    setTimeout(() => {
      const updatedImages = [...images];
      updatedImages[selectedImageIndex] = {
        ...updatedImages[selectedImageIndex],
        title: newImage.title || "",
        description: newImage.description || "",
        ...(imagePreview ? { url: imagePreview } : {}),
      };

      setImages(updatedImages);
      setNewImage({});
      setImageFile(null);
      setImagePreview(null);
      setIsEditDialogOpen(false);
      setSelectedImageIndex(null);
      setIsUploading(false);
      toast.success("Carousel image updated successfully");
    }, 1000);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success("Carousel image removed");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === images.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedImages = [...images];
    [updatedImages[index], updatedImages[newIndex]] = [
      updatedImages[newIndex],
      updatedImages[index],
    ];

    setImages(updatedImages);
  };

  const openEditDialog = (index: number) => {
    const image = images[index];
    setNewImage({
      title: image.title || "",
      description: image.description || "",
    });
    setImagePreview(null);
    setSelectedImageIndex(index);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Homepage Carousel</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Image
        </Button>
      </div>

      {images.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No carousel images added yet
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add First Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card key={image.id} className="overflow-hidden h-full">
              <div className="relative h-48">
                <img
                  src={image.url}
                  alt={image.title || `Carousel image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {image.title || `Image ${index + 1}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-24 overflow-auto">
                <p className="text-sm text-muted-foreground">
                  {image.description || "No description provided"}
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/30 p-2 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveImage(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveImage(index, "down")}
                    disabled={index === images.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add Image Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Carousel Image</DialogTitle>
            <DialogDescription>
              Upload a new image for the homepage carousel
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Label htmlFor="carousel-image" className="cursor-pointer block">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">
                      Click to upload an image
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF up to 5MB
                    </span>
                  </div>
                  <Input
                    id="carousel-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                value={newImage.title || ""}
                onChange={(e) =>
                  setNewImage({ ...newImage, title: e.target.value })
                }
                placeholder="Enter image title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newImage.description || ""}
                onChange={(e) =>
                  setNewImage({ ...newImage, description: e.target.value })
                }
                placeholder="Enter image description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddImage} disabled={!imagePreview || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Image
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Carousel Image</DialogTitle>
            <DialogDescription>
              Update the details for this carousel image
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : selectedImageIndex !== null ? (
                <div className="relative">
                  <img
                    src={images[selectedImageIndex].url}
                    alt="Current"
                    className="max-h-48 mx-auto rounded"
                  />
                  <Label
                    htmlFor="edit-carousel-image"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <Edit className="h-5 w-5" />
                    </div>
                  </Label>
                  <Input
                    id="edit-carousel-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-title">Title (Optional)</Label>
              <Input
                id="edit-title"
                value={newImage.title || ""}
                onChange={(e) =>
                  setNewImage({ ...newImage, title: e.target.value })
                }
                placeholder="Enter image title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description (Optional)</Label>
              <Textarea
                id="edit-description"
                value={newImage.description || ""}
                onChange={(e) =>
                  setNewImage({ ...newImage, description: e.target.value })
                }
                placeholder="Enter image description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateImage} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Image"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarouselManager;
