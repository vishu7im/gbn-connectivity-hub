
import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X, LogIn, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background text-foreground border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">GBN Polytechnic</h1>
              <p className="text-sm text-muted-foreground">Alumni Association</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/members" className="text-foreground hover:text-primary transition-colors">Members</Link>
            <Link to="/posts" className="text-foreground hover:text-primary transition-colors">Posts</Link>
            <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">Job Board</Link>
            <Link to="/gallery" className="text-foreground hover:text-primary transition-colors">Gallery</Link>
            <a href="#news" className="text-foreground hover:text-primary transition-colors">News</a>
            <a href="#events" className="text-foreground hover:text-primary transition-colors">Events</a>
          </nav>

          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <UserCircle className="mr-2 h-4 w-4" />
                    {user.name.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/post-job">Post Job</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/members" className="text-foreground hover:text-primary transition-colors">Members</Link>
              <Link to="/posts" className="text-foreground hover:text-primary transition-colors">Posts</Link>
              <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">Job Board</Link>
              <Link to="/gallery" className="text-foreground hover:text-primary transition-colors">Gallery</Link>
              <a href="#news" className="text-foreground hover:text-primary transition-colors">News</a>
              <a href="#events" className="text-foreground hover:text-primary transition-colors">Events</a>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
                  <Link to="/dashboard/profile" className="text-foreground hover:text-primary transition-colors">Profile</Link>
                  <button
                    onClick={logout}
                    className="text-destructive text-left hover:text-destructive/80 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
