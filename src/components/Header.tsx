
import React from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            <a href="#news" className="hover:text-[#e6c200] transition-colors">News</a>
            <a href="#events" className="hover:text-[#e6c200] transition-colors">Events</a>
            <a href="#principal" className="hover:text-[#e6c200] transition-colors">Principal's Desk</a>
            <a href="#alumni" className="hover:text-[#e6c200] transition-colors">Alumni</a>
          </nav>

          <Button variant="outline" className="hidden md:block border-[#e6c200] text-[#e6c200] hover:bg-[#e6c200] hover:text-[#0a2463]">
            Login
          </Button>

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
              <a href="#news" className="hover:text-[#e6c200] transition-colors">News</a>
              <a href="#events" className="hover:text-[#e6c200] transition-colors">Events</a>
              <a href="#principal" className="hover:text-[#e6c200] transition-colors">Principal's Desk</a>
              <a href="#alumni" className="hover:text-[#e6c200] transition-colors">Alumni</a>
              <Button variant="outline" className="w-full border-[#e6c200] text-[#e6c200] hover:bg-[#e6c200] hover:text-[#0a2463]">
                Login
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
