
import React from "react";
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
import { LogIn, ShieldCheck } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const success = await login(values.email, values.password);
    if (success) {
      navigate("/dashboard");
    }
  };

  const goToAdminPanel = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen text-primary-foreground flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your alumni account
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
                    <Button type="submit" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                  <p>
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                  <p className="mt-2">
                    <Link
                      to="/members"
                      className="text-gray-600 hover:underline"
                    >
                      Continue as guest
                    </Link>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={goToAdminPanel}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Quick Admin Access
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
