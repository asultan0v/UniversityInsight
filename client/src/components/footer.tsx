import { GraduationCap } from "lucide-react";
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <GraduationCap className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold">UniSearch</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your comprehensive guide to universities worldwide. Find, compare, and discover your perfect educational path.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SiX className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SiLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SiInstagram className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Top Universities</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Search by Country</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Rankings</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Programs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 UniSearch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
