
import React from "react";
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a2463] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-[#e6c200]" />
              <h3 className="text-xl font-bold">GBN Polytechnic</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering students with knowledge and skills since 1985. Our alumni network continues to grow and make an impact globally.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#e6c200] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#e6c200] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#e6c200] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-[#e6c200] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#e6c200] transition-colors">Home</a>
              </li>
              <li>
                <a href="#news" className="text-gray-300 hover:text-[#e6c200] transition-colors">News & Updates</a>
              </li>
              <li>
                <a href="#events" className="text-gray-300 hover:text-[#e6c200] transition-colors">Events</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#e6c200] transition-colors">Alumni Directory</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#e6c200] transition-colors">Donate</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#e6c200] transition-colors">Careers</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#e6c200] mt-0.5" />
                <span className="text-gray-300">
                  123 Education Street, Knowledge Park,<br /> New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#e6c200]" />
                <span className="text-gray-300">+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#e6c200]" />
                <span className="text-gray-300">alumni@gbnpolytechnic.edu.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} GBN Polytechnic Alumni Association. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#e6c200] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#e6c200] transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-[#e6c200] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
