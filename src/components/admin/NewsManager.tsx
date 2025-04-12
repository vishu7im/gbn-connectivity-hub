
import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewsItemType } from "@/data/mockAdminData";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface NewsManagerProps {
  newsItems: NewsItemType[];
}

const NewsManager = ({ newsItems }: NewsManagerProps) => {
  const [news, setNews] = useState<NewsItemType[]>(newsItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItemType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isImportant: false,
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isImportant: checked }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      isImportant: false,
      imageUrl: "",
    });
    setSelectedNews(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (newsItem: NewsItemType) => {
    setSelectedNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      isImportant: newsItem.isImportant,
      imageUrl: newsItem.imageUrl || "",
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      if (isEditMode && selectedNews) {
        // Update existing news
        const updatedNews = news.map((item) =>
          item._id === selectedNews._id
            ? {
                ...item,
                title: formData.title,
                content: formData.content,
                isImportant: formData.isImportant,
                imageUrl: formData.imageUrl || undefined,
              }
            : item
        );
        setNews(updatedNews);
        toast.success("News updated successfully");
      } else {
        // Create new news
        const newNewsItem: NewsItemType = {
          _id: `n${news.length + 1}`,
          title: formData.title,
          content: formData.content,
          isImportant: formData.isImportant,
          imageUrl: formData.imageUrl || undefined,
          createdAt: new Date().toISOString(),
          user: {
            name: "Admin User",
            email: "admin@example.com",
          },
        };
        setNews([newNewsItem, ...news]);
        toast.success("News created successfully");
      }

      setIsLoading(false);
      resetForm();
      setIsDialogOpen(false);
    }, 1500);
  };

  const handleDelete = (newsId: string) => {
    // Simulate API call with timeout
    setTimeout(() => {
      setNews(news.filter((item) => item._id !== newsId));
      toast.success("News deleted successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage News</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add News
        </Button>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground mb-4">No news articles found</p>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" /> Create First News
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(item.createdAt), "MMMM d, yyyy")}
                  {item.isImportant && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                      Important
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {item.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.content}
                </p>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-3">
                Published by {item.user.name}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit News" : "Create News"}
            </DialogTitle>
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
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
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
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  isEditMode ? "Update News" : "Create News"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsManager;
