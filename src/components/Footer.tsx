
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">GBN Alumni Association</h2>
            <p className="text-muted-foreground mb-4">
              A registered body of the Alumni members of GBN Govt. Polytechnic
              Nilokheri where you connect with fellow members and experience the
              growing spirit of our institute.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/members" className="text-muted-foreground hover:text-primary">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-primary">
                  Job Board
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91-1745-246002</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <a
                  href="mailto:gbn.alumni.nilokheri@gmail.com"
                  className="hover:text-primary"
                >
                  gbn.alumni.nilokheri@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} GBN Govt. Polytechnic Nilokheri. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Created with ❤️ by Vishal Munday (CSE)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
