
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload, UserPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    batch: z.string().min(1, "Batch year is required"),
    department: z.string().min(1, "Department is required"),
    rollNumber: z.string().optional(),
    documentType: z.enum(["degree", "id_card", "marksheet", "other"]).optional(),
    documentName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      batch: "",
      department: "",
      rollNumber: "",
      documentType: "other",
      documentName: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setDocumentFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: RegisterFormValues) => {
    // For development purposes, let's bypass document validation
    const success = await register(
      values.name,
      values.email,
      values.password,
      values.batch,
      values.department,
      values.rollNumber,
      documentPreview, // Pass the base64 encoded document
      values.documentType,
      values.documentName || documentFile?.name
    );

    if (success) {
      navigate("/dashboard");
    }
  };

  // Get sample data for dropdowns
  const batches = [
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];
  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics",
  ];
  const documentTypes = [
    { value: "degree", label: "Degree Certificate" },
    { value: "id_card", label: "College ID Card" },
    { value: "marksheet", label: "Marksheet" },
    { value: "other", label: "Other Document" },
  ];

  return (
    <div className="min-h-screen text-primary-foreground flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Register</CardTitle>
                <CardDescription>
                  Create an alumni account to post job opportunities and connect
                  with fellow alumni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="batch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Batch Year</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select batch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {batches.map((batch) => (
                                  <SelectItem key={batch} value={batch}>
                                    {batch}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept} value={dept}>
                                    {dept}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="rollNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roll Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your college roll number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator className="my-2" />
                    
                    <div className="space-y-4">
                      <Alert variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Verification Required</AlertTitle>
                        <AlertDescription>
                          Please upload a document to verify your alumni status. This helps us maintain the integrity of our community.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="documentType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {documentTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="documentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Name (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Name your document" 
                                  {...field} 
                                  value={field.value || (documentFile?.name || '')}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Label htmlFor="document-upload" className="w-full cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Upload className="h-6 w-6 mb-2 text-gray-500" />
                            <span className="text-sm font-medium">
                              {documentFile ? 'Change document' : 'Upload verification document'}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              PDF, JPG, or PNG up to 5MB
                            </span>
                          </div>
                          <Input 
                            id="document-upload" 
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </Label>
                        
                        {documentPreview && (
                          <div className="mt-2">
                            {documentFile?.type.includes('image') ? (
                              <img 
                                src={documentPreview} 
                                alt="Document preview" 
                                className="max-h-28 max-w-full mx-auto rounded border" 
                              />
                            ) : (
                              <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                                <div className="h-3 w-3 bg-green-600 rounded-full" />
                                <span>Document uploaded: {documentFile?.name}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" /> Register
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-2 pt-0">
                <div className="text-center text-sm">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Your account will be pending until an admin verifies your documents
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
