
import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X, LogIn, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#0a2463] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-[#e6c200]" />
            <div>
              <h1 className="text-xl font-bold">GBN Polytechnic</h1>
              <p className="text-sm text-gray-300">Alumni Association</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#e6c200] transition-colors">Home</Link>
            <Link to="/members" className="hover:text-[#e6c200] transition-colors">Members</Link>
            <Link to="/jobs" className="hover:text-[#e6c200] transition-colors">Job Board</Link>
            <a href="#news" className="hover:text-[#e6c200] transition-colors">News</a>
            <a href="#events" className="hover:text-[#e6c200] transition-colors">Events</a>
          </nav>

          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#e6c200] text-[#e6c200] hover:bg-[#e6c200] hover:text-[#0a2463]">
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
                  <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button variant="outline" className="hidden md:flex border-[#e6c200] text-[#e6c200] hover:bg-[#e6c200] hover:text-[#0a2463]" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="hover:text-[#e6c200] transition-colors">Home</Link>
              <Link to="/members" className="hover:text-[#e6c200] transition-colors">Members</Link>
              <Link to="/jobs" className="hover:text-[#e6c200] transition-colors">Job Board</Link>
              <a href="#news" className="hover:text-[#e6c200] transition-colors">News</a>
              <a href="#events" className="hover:text-[#e6c200] transition-colors">Events</a>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="hover:text-[#e6c200] transition-colors">Dashboard</Link>
                  <Link to="/dashboard/profile" className="hover:text-[#e6c200] transition-colors">Profile</Link>
                  <button
                    onClick={logout}
                    className="text-red-500 text-left hover:text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Button variant="outline" className="w-full border-[#e6c200] text-[#e6c200] hover:bg-[#e6c200] hover:text-[#0a2463]" asChild>
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
