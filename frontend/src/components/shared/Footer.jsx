/* eslint-disable no-unused-vars */
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are the No.1 Job Hunt Website, connecting talent with top employers. Your dream job is just a click away!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-purple-600 transition-colors">Home</a></li>
            <li><a href="/jobs" className="hover:text-purple-600 transition-colors">Jobs</a></li>
            <li><a href="/about" className="hover:text-purple-600 transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-purple-600 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2">
            <li>Email: support@jobportal.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: Patna Job Street, Bihar</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://facebook.com" className="hover:text-purple-600 transition-colors">Facebook</a>
          <a href="https://twitter.com" className="hover:text-purple-600 transition-colors">Twitter</a>
          <a href="https://linkedin.com" className="hover:text-purple-600 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
