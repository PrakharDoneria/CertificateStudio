import React from "react";
import { Award } from "lucide-react";
import iecLogoPath from "/images/iec-logo.jpg";
import gdgLogoPath from "/images/gdg-logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Certificate Generator
              </h1>
              <p className="text-xs text-white/70">Generate professional project completion certificates</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <img src={iecLogoPath} alt="IEC Logo" className="h-10 w-10 object-contain bg-white/20 p-1 rounded-lg" />
            <img src={gdgLogoPath} alt="GDG Logo" className="h-10 w-auto object-contain bg-white/20 p-1 rounded-lg" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
