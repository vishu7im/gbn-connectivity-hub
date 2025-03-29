import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, ChevronLeft } from "lucide-react";

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Job type is required"),
  category: z.string().min(1, "Category is required"),
  salary: z.string().min(1, "Salary information is required"),
  description: z.string().min(1, "Job description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  applicationLink: z.string().url("Must be a valid URL"),
});

type JobFormValues = z.infer<typeof jobSchema>;

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "",
      category: "",
      salary: "",
      description: "",
      requirements: "",
      applicationLink: "",
    },
  });

  const onSubmit = async (values: JobFormValues) => {
    try {
      // In a real app, this would be an API call
      console.log("Job posting data:", values);

      // Show success message
      toast.success("Job posted successfully!");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
      console.error(error);
    }
  };

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];
  const jobCategories = [
    "Technology",
    "Engineering",
    "Management",
    "Analytics",
    "Marketing",
    "Finance",
    "Education",
    "Healthcare",
  ];

  return (
    <div className="min-h-screentext-primary-foreground  flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-white hover:text-[#e6c200] transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              Post a Job Opportunity
            </h1>
            <p className="mt-2 text-gray-200">
              Share job opportunities with the alumni community
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Enter the details of the job opportunity you want to share with
                other alumni
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Bangalore" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jobTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
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
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jobCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
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
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. ₹8,00,000 - ₹12,00,000 per annum"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the job role, responsibilities, and any other relevant information..."
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List the skills, experience, and qualifications required for this position..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter each requirement on a new line
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. https://company.com/careers/job-id"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a direct URL where applicants can apply for
                          this position
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Post Job
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

export default PostJob;
