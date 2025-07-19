import { useState } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, Bookmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Search" },
    { href: "/rankings", label: "Rankings" },
    { href: "/compare", label: "Compare" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-primary text-white p-2 rounded-lg">
                <GraduationCap className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-primary">UniSearch</h1>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`font-medium transition-colors duration-200 ${
                    location === item.href
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button className="bg-primary text-white hover:bg-blue-700 hidden sm:inline-flex">
              Sign In
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`font-medium transition-colors duration-200 ${
                      location === item.href
                        ? "text-primary"
                        : "text-gray-600 hover:text-primary"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <Button className="bg-primary text-white hover:bg-blue-700 sm:hidden w-fit">
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
