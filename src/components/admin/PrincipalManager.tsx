
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { UserRound, Upload, Loader2, Save } from "lucide-react";

interface PrincipalData {
  name: string;
  title: string;
  message: string;
  photo: string;
}

interface PrincipalManagerProps {
  initialData?: PrincipalData;
}

const defaultPrincipalData: PrincipalData = {
  name: "Dr. Sunil Kumar",
  title: "Principal, GBN Polytechnic",
  message: "Welcome to the GBN Polytechnic Alumni Portal. Our institution takes pride in the achievements of its alumni who are making significant contributions in various fields. This platform is designed to strengthen the bond between the institute and its alumni community, fostering collaboration, mentorship, and knowledge exchange.",
  photo: "https://randomuser.me/api/portraits/men/1.jpg"
};

const PrincipalManager: React.FC<PrincipalManagerProps> = ({ 
  initialData = defaultPrincipalData 
}) => {
  const [principalData, setPrincipalData] = useState<PrincipalData>(initialData);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPrincipalData({ ...principalData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedData = {
        ...principalData,
        photo: photoPreview || principalData.photo
      };
      
      setPrincipalData(updatedData);
      setPhotoFile(null);
      setPhotoPreview(null);
      setIsSaving(false);
      
      toast.success("Principal details updated successfully");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Principal's Desk Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-36 w-36 border-2 shadow-md">
                <AvatarImage 
                  src={photoPreview || principalData.photo} 
                  alt={principalData.name}
                />
                <AvatarFallback>
                  <UserRound className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Label 
                htmlFor="photo-upload" 
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer shadow-md"
              >
                <Upload className="h-4 w-4" />
                <Input 
                  id="photo-upload" 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended: Square image, 400x400px
            </p>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Principal's Name</Label>
              <Input
                id="name"
                name="name"
                value={principalData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title/Designation</Label>
              <Input
                id="title"
                name="title"
                value={principalData.title}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="message">Principal's Message</Label>
          <Textarea
            id="message"
            name="message"
            value={principalData.message}
            onChange={handleInputChange}
            className="min-h-[200px]"
          />
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrincipalManager;
