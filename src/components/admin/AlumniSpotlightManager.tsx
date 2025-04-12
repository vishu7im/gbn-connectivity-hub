
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  UserRound, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Upload, 
  Award, 
  Building, 
  Briefcase, 
  Calendar, 
  Loader2,
  Star,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SpotlightAlumni {
  id: string;
  name: string;
  batch: string;
  department: string;
  company: string;
  position: string;
  achievement: string;
  quote: string;
  photo: string;
  featured?: boolean;
}

interface AlumniSpotlightManagerProps {
  initialAlumni?: SpotlightAlumni[];
}

const defaultAlumni: SpotlightAlumni[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    batch: '2015',
    department: 'Computer Science',
    company: 'Google',
    position: 'Senior Software Engineer',
    achievement: 'Led the development of a key feature in Google Maps that improved routing efficiency by 35%.',
    quote: 'My time at GBN Polytechnic gave me the foundation I needed to pursue my dreams in tech.',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    featured: true
  },
  {
    id: '2',
    name: 'Priya Patel',
    batch: '2017',
    department: 'Electronics',
    company: 'Samsung',
    position: 'Product Manager',
    achievement: 'Received the Samsung Innovation Award for pioneering a new smartphone feature.',
    quote: 'The practical knowledge I gained at GBN Polytechnic still helps me solve complex problems today.',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

const AlumniSpotlightManager: React.FC<AlumniSpotlightManagerProps> = ({ 
  initialAlumni = defaultAlumni 
}) => {
  const [alumni, setAlumni] = useState<SpotlightAlumni[]>(initialAlumni);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAlumni, setCurrentAlumni] = useState<SpotlightAlumni | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics",
  ];
  
  const batches = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - i - 5).toString());

  const resetForm = () => {
    setCurrentAlumni(null);
    setPhotoPreview(null);
    setIsEditing(false);
  };

  const handleDialogOpen = (alumnus?: SpotlightAlumni) => {
    if (alumnus) {
      setCurrentAlumni(alumnus);
      setIsEditing(true);
    } else {
      setCurrentAlumni({
        id: Date.now().toString(),
        name: '',
        batch: '',
        department: '',
        company: '',
        position: '',
        achievement: '',
        quote: '',
        photo: '',
        featured: false
      });
      setIsEditing(false);
    }
    setPhotoPreview(null);
    setIsDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!currentAlumni) return;
    
    const { name, value } = e.target;
    setCurrentAlumni({ ...currentAlumni, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!currentAlumni) return;
    setCurrentAlumni({ ...currentAlumni, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!currentAlumni) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedAlumnus = {
        ...currentAlumni,
        photo: photoPreview || currentAlumni.photo
      };
      
      if (isEditing) {
        setAlumni(alumni.map(a => a.id === updatedAlumnus.id ? updatedAlumnus : a));
        toast.success("Alumni spotlight updated successfully");
      } else {
        setAlumni([...alumni, updatedAlumnus]);
        toast.success("Alumni spotlight added successfully");
      }
      
      setIsDialogOpen(false);
      resetForm();
      setIsSaving(false);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setAlumni(alumni.filter(a => a.id !== id));
    toast.success("Alumni spotlight removed");
  };

  const handleToggleFeatured = (id: string) => {
    setAlumni(alumni.map(a => {
      if (a.id === id) {
        return { ...a, featured: !a.featured };
      }
      // If featuring this alumni, unfeature all others
      if (a.id !== id && !a.featured && alumni.find(alumni => alumni.id === id)?.featured === false) {
        return { ...a, featured: false };
      }
      return a;
    }));
    
    const alumnus = alumni.find(a => a.id === id);
    if (alumnus) {
      toast.success(alumnus.featured 
        ? `${alumnus.name} is no longer featured` 
        : `${alumnus.name} is now featured on the homepage`
      );
    }
  };

  const handleMoveAlumni = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === alumni.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedAlumni = [...alumni];
    [updatedAlumni[index], updatedAlumni[newIndex]] = [
      updatedAlumni[newIndex],
      updatedAlumni[index],
    ];

    setAlumni(updatedAlumni);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alumni Spotlight Management</CardTitle>
        <Button onClick={() => handleDialogOpen()}>
          <Plus className="mr-2 h-4 w-4" /> Add Alumni
        </Button>
      </CardHeader>
      <CardContent>
        {alumni.length === 0 ? (
          <div className="text-center py-10">
            <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No alumni spotlights yet</p>
            <Button onClick={() => handleDialogOpen()}>
              <Plus className="mr-2 h-4 w-4" /> Add First Alumni
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Order</TableHead>
                <TableHead>Alumni</TableHead>
                <TableHead>Batch & Department</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alumni.map((alumnus, index) => (
                <TableRow key={alumnus.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleMoveAlumni(index, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleMoveAlumni(index, "down")}
                        disabled={index === alumni.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={alumnus.photo} alt={alumnus.name} />
                        <AvatarFallback>
                          {alumnus.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{alumnus.name}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          "{alumnus.quote}"
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{alumnus.batch}</span>
                      <span className="text-sm text-muted-foreground">{alumnus.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{alumnus.position}</span>
                      <span className="text-sm text-muted-foreground">{alumnus.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={alumnus.featured ? "default" : "outline"}
                      size="sm"
                      className={alumnus.featured ? "bg-amber-500 hover:bg-amber-600" : ""}
                      onClick={() => handleToggleFeatured(alumnus.id)}
                    >
                      <Star className={`h-4 w-4 ${alumnus.featured ? "mr-1" : "mr-1 text-muted-foreground"}`} />
                      {alumnus.featured ? "Featured" : "Feature"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDialogOpen(alumnus)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(alumnus.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Add/Edit Alumni Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) resetForm();
          setIsDialogOpen(open);
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Alumni Spotlight" : "Add Alumni Spotlight"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details for this featured alumni" 
                  : "Add a new alumni to the spotlight section"}
              </DialogDescription>
            </DialogHeader>
            
            {currentAlumni && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32 border-2 shadow-md">
                        <AvatarImage 
                          src={photoPreview || currentAlumni.photo || ''} 
                          alt={currentAlumni.name}
                        />
                        <AvatarFallback className="text-2xl">
                          {currentAlumni.name
                            ? currentAlumni.name.split(' ').map(n => n[0]).join('')
                            : <UserRound className="h-12 w-12" />
                          }
                        </AvatarFallback>
                      </Avatar>
                      <Label 
                        htmlFor="alumni-photo" 
                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer shadow-md"
                      >
                        <Upload className="h-4 w-4" />
                        <Input 
                          id="alumni-photo" 
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload a professional photo
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={currentAlumni.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch Year</Label>
                      <Select 
                        value={currentAlumni.batch} 
                        onValueChange={(value) => handleSelectChange('batch', value)}
                      >
                        <SelectTrigger id="batch">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {batches.map(batch => (
                            <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select 
                        value={currentAlumni.department} 
                        onValueChange={(value) => handleSelectChange('department', value)}
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Current Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={currentAlumni.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Google"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Current Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={currentAlumni.position}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="achievement">Achievement</Label>
                    <Textarea
                      id="achievement"
                      name="achievement"
                      value={currentAlumni.achievement}
                      onChange={handleInputChange}
                      placeholder="Describe a significant professional achievement"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quote">Inspirational Quote</Label>
                    <Textarea
                      id="quote"
                      name="quote"
                      value={currentAlumni.quote}
                      onChange={handleInputChange}
                      placeholder="A memorable quote about their college experience"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Update" : "Save"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AlumniSpotlightManager;
