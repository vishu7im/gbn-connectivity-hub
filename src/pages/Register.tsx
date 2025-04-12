import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const registerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  batch: z.string().min(4, {
    message: "Please select a valid batch.",
  }),
  department: z.string().min(2, {
    message: "Please select a department.",
  }),
  rollNumber: z.string().optional(),
  graduation: z.string().optional(),
  currentRole: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions.',
  }),
})

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      batch: "",
      department: "",
      rollNumber: "",
      graduation: "",
      currentRole: "",
      company: "",
      location: "",
      phone: "",
      bio: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      terms: false,
    },
  })

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      await register(data.name, data.email, data.password, data.batch, data.department, data.rollNumber, data.graduation, data.currentRole, data.company, data.location, data.phone, data.bio, data.linkedin, data.facebook, data.twitter);
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 py-12">
      <Card className="w-full max-w-md space-y-4 border-none shadow-xl bg-white dark:bg-slate-800 text-primary-foreground">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Enter your details below to register
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input id="name" placeholder="Enter your name" {...field} />
                )}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input type="email" id="email" placeholder="Enter your email" {...field} />
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="batch">Batch</Label>
              <Controller
                control={control}
                name="batch"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: (new Date()).getFullYear() - 1980 + 1 }, (_, i) => {
                        const year = 1980 + i;
                        return <SelectItem key={year} value={String(year)}>{year}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.batch && (
                <p className="text-sm text-red-500">{errors.batch.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                      {/* Add more departments as needed */}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.department && (
                <p className="text-sm text-red-500">{errors.department.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rollNumber">Roll Number (Optional)</Label>
              <Controller
                control={control}
                name="rollNumber"
                render={({ field }) => (
                  <Input id="rollNumber" placeholder="Enter your roll number" {...field} />
                )}
              />
              {errors.rollNumber && (
                <p className="text-sm text-red-500">{errors.rollNumber.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="graduation">Year of Graduation (Optional)</Label>
              <Controller
                control={control}
                name="graduation"
                render={({ field }) => (
                  <Input id="graduation" placeholder="Enter your graduation year" {...field} />
                )}
              />
              {errors.graduation && (
                <p className="text-sm text-red-500">{errors.graduation.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentRole">Current Role (Optional)</Label>
              <Controller
                control={control}
                name="currentRole"
                render={({ field }) => (
                  <Input id="currentRole" placeholder="Enter your current role" {...field} />
                )}
              />
              {errors.currentRole && (
                <p className="text-sm text-red-500">{errors.currentRole.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Controller
                control={control}
                name="company"
                render={({ field }) => (
                  <Input id="company" placeholder="Enter your company" {...field} />
                )}
              />
              {errors.company && (
                <p className="text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Input id="location" placeholder="Enter your location" {...field} />
                )}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input id="phone" placeholder="Enter your phone number" {...field} />
                )}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <Textarea id="bio" placeholder="Enter your bio" {...field} />
                )}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
              <Controller
                control={control}
                name="linkedin"
                render={({ field }) => (
                  <Input id="linkedin" placeholder="Enter your LinkedIn profile URL" {...field} />
                )}
              />
              {errors.linkedin && (
                <p className="text-sm text-red-500">{errors.linkedin.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="facebook">Facebook (Optional)</Label>
              <Controller
                control={control}
                name="facebook"
                render={({ field }) => (
                  <Input id="facebook" placeholder="Enter your Facebook profile URL" {...field} />
                )}
              />
              {errors.facebook && (
                <p className="text-sm text-red-500">{errors.facebook.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twitter">Twitter (Optional)</Label>
              <Controller
                control={control}
                name="twitter"
                render={({ field }) => (
                  <Input id="twitter" placeholder="Enter your Twitter profile URL" {...field} />
                )}
              />
              {errors.twitter && (
                <p className="text-sm text-red-500">{errors.twitter.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                I agree to the <Link to="/terms" className="underline underline-offset-2 hover:text-primary">terms and conditions</Link>
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}
            <Button disabled={isLoading} className="w-full" type="submit">
              {isLoading ? (
                <>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="underline underline-offset-2 hover:text-primary">Log in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
