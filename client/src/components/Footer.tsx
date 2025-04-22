import React from "react";
import { Heart, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 border-t border-blue-100 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} GDG IEC Certificate Generator
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-blue-600">
              <Heart className="h-4 w-4 mr-1 text-pink-500" />
              <span className="text-sm">Made with love</span>
            </div>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              <span className="text-sm">Source Code</span>
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-500">
          <p>All certificates are generated and stored locally in your browser.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
