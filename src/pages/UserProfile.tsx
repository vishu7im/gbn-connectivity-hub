import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, ChevronLeft, Upload } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  currentRole: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  // Mock user profile data - in a real app, this would come from an API
  const userProfile = {
    ...user,
    currentRole: "Software Engineer",
    company: "TCS",
    location: "Bangalore, India",
    phone: "+91 9876543210",
    bio: "I am a passionate software engineer with expertise in full-stack development. My journey at GBN Polytechnic laid the foundation for my career in technology.",
    linkedin: "linkedin.com/in/rajiv-kumar",
    facebook: "facebook.com/rajiv.kumar",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile.name,
      email: userProfile.email,
      currentRole: userProfile.currentRole,
      company: userProfile.company,
      location: userProfile.location,
      phone: userProfile.phone,
      bio: userProfile.bio,
      linkedin: userProfile.linkedin,
      facebook: userProfile.facebook,
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      // In a real app, this would be an API call to update the profile
      console.log("Updated profile data:", values);

      // Show success message
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen text-primary-foreground  flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary text-primary-foreground  py-8">
          <div className="container mx-auto px-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-white hover:text-[#e6c200] transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              Edit Profile
            </h1>
            <p className="mt-2 text-gray-200">
              Update your alumni profile information
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex flex-col items-center md:flex-row md:justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal and professional details
                  </CardDescription>
                </div>
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-[#0a2463] text-white text-2xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="flex justify-center md:justify-end mb-4">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormDescription>
                          Email cannot be changed
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="currentRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Role</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. TCS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Bangalore, India"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. +91 9876543210"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a short bio about yourself..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. linkedin.com/in/username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. facebook.com/username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit">
                      <User className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
