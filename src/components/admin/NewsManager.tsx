
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { newsAPI, uploadAPI } from "@/services/api";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2, Edit, Trash2, ImageIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface News {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  isImportant: boolean;
  createdAt: string;
}

interface NewsFormData {
  title: string;
  content: string;
  isImportant: boolean;
  image?: File | null;
}

const NewsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    content: "",
    isImportant: false,
    image: null,
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["allNews"],
    queryFn: async () => {
      const response = await newsAPI.getAllNews();
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newsData: NewsFormData) => {
      let imageUrl = null;
      if (newsData.image) {
        setIsUploadingImage(true);
        const uploadResponse = await uploadAPI.uploadImage(newsData.image);
        imageUrl = uploadResponse.data.imageUrl;
        setIsUploadingImage(false);
      }

      return newsAPI.createNews({
        title: newsData.title,
        content: newsData.content,
        isImportant: newsData.isImportant,
        imageUrl,
      });
    },
    onSuccess: () => {
      toast.success("News created successfully");
      resetForm();
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
    },
    onError: () => {
      toast.error("Failed to create news");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, newsData }: { id: string; newsData: NewsFormData }) => {
      let imageUrl = undefined;
      if (newsData.image) {
        setIsUploadingImage(true);
        const uploadResponse = await uploadAPI.uploadImage(newsData.image);
        imageUrl = uploadResponse.data.imageUrl;
        setIsUploadingImage(false);
      }

      return newsAPI.updateNews(id, {
        title: newsData.title,
        content: newsData.content,
        isImportant: newsData.isImportant,
        imageUrl,
      });
    },
    onSuccess: () => {
      toast.success("News updated successfully");
      resetForm();
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
    },
    onError: () => {
      toast.error("Failed to update news");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => newsAPI.deleteNews(id),
    onSuccess: () => {
      toast.success("News deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
    },
    onError: () => {
      toast.error("Failed to delete news");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isImportant: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedNews) {
      updateMutation.mutate({ id: selectedNews._id, newsData: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEditDialog = (news: News) => {
    setSelectedNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      isImportant: news.isImportant,
      image: null,
    });
    setImagePreview(news.imageUrl || null);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      isImportant: false,
      image: null,
    });
    setImagePreview(null);
    setSelectedNews(null);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <NewsManagerLoading />;
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        <h3 className="font-medium">Error loading news</h3>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage News</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add News
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No news articles found</p>
            <Button className="mt-4" onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" /> Create First News
            </Button>
          </div>
        ) : (
          data.map((news: News) => (
            <Card key={news._id}>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{news.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(news.createdAt), "MMMM d, yyyy")}
                      {news.isImportant && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          Important
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => openEditDialog(news)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="outline" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete News</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this news article? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground"
                            onClick={() => handleDelete(news._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {news.imageUrl && (
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  )}
                  <p className="text-muted-foreground line-clamp-3">
                    {news.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit News" : "Add News"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the news information below"
                : "Fill in the details to create a new news article"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="min-h-[150px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <div className="relative w-16 h-16">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isImportant"
                  checked={formData.isImportant}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="isImportant" className="cursor-pointer">
                  Mark as important
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={createMutation.isPending || updateMutation.isPending || isUploadingImage}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  isUploadingImage ||
                  !formData.title ||
                  !formData.content
                }
              >
                {(createMutation.isPending || updateMutation.isPending || isUploadingImage) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploadingImage
                      ? "Uploading Image..."
                      : isEditMode
                      ? "Updating..."
                      : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Update News"
                ) : (
                  "Create News"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const NewsManagerLoading = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default NewsManager;
