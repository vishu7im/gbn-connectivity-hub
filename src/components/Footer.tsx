
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-10 pb-6 border-t border-gray-200 dark:border-gray-800 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">GBN Alumni Association</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A registered body of the Alumni members of GBN Govt. Polytechnic Nilokheri where you connect with fellow members and experience the growing spirit of our institute.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">Home</Link></li>
              <li><Link to="/members" className="text-gray-600 dark:text-gray-400 hover:text-primary">Alumni</Link></li>
              <li><Link to="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-primary">Job Board</Link></li>
              <li><Link to="/gallery" className="text-gray-600 dark:text-gray-400 hover:text-primary">Gallery</Link></li>
              <li><Link to="/posts" className="text-gray-600 dark:text-gray-400 hover:text-primary">Posts</Link></li>
              <li><Link to="/admin" className="text-gray-600 dark:text-gray-400 hover:text-primary">Admin Panel</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Phone: +91-1745-246002</li>
              <li>Email: gbn.alumni.nilokheri@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} GBN Alumni Association. All rights reserved.</p>
          <p className="mt-2">Created with ❤️ by Vishal Munday (CSE)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
