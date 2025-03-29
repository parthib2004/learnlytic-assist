
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Brain, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Writing Analysis", path: "/writing-analysis" },
  { name: "Adaptive Quiz", path: "/adaptive-quiz" },
  { name: "Learning Plan", path: "/learning-plan" },
  { name: "Teacher Dashboard", path: "/teacher-dashboard" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-purple-600" />
                <span className="font-poppins font-bold text-xl text-purple-800">
                  Learnlytic<span className="text-purple-600">Assist</span>
                </span>
              </div>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.path
                      ? "text-purple-700 bg-purple-50"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-gray-600 hover:text-purple-600"
              title="Text-to-Speech"
            >
              <HeadphonesIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="mr-2">
              Sign In
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b pb-3 px-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.path
                    ? "text-purple-700 bg-purple-50"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
