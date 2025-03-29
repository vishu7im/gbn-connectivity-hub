
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  isAlumni: boolean;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, batch: string, department: string) => Promise<boolean>;
}

// Sample user data - in a real app, this would come from a database
const sampleUsers = [
  {
    id: 1,
    name: "Rajiv Kumar",
    email: "rajiv@example.com",
    password: "password123",
    isAlumni: true,
    batch: "2018",
    department: "Computer Science"
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    password: "password123",
    isAlumni: true,
    batch: "2019",
    department: "Electrical Engineering"
  }
];

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data in localStorage on component mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = sampleUsers.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
          toast.success("Login successful");
          resolve(true);
        } else {
          toast.error("Invalid email or password");
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast.info("You've been logged out");
  };

  const register = async (name: string, email: string, password: string, batch: string, department: string): Promise<boolean> => {
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const userExists = sampleUsers.some(u => u.email === email);
        
        if (userExists) {
          toast.error("User with this email already exists");
          resolve(false);
        } else {
          // In a real app, we would add this user to the database
          const newUser = {
            id: sampleUsers.length + 1,
            name,
            email,
            password,
            isAlumni: true,
            batch,
            department
          };
          
          // Add to our sample users (simulate database insert)
          sampleUsers.push(newUser);
          
          // Log the user in
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
          
          toast.success("Registration successful");
          resolve(true);
        }
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
