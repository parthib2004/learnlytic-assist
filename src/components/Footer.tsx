
import { Link } from "react-router-dom";
import { Brain, Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-purple-600" />
                <span className="font-poppins font-bold text-xl text-purple-800">
                  Learnlytic<span className="text-purple-600">Assist</span>
                </span>
              </div>
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-md">
              Empowering students with learning disabilities through AI-powered detection, personalized learning plans, and adaptive tools.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/writing-analysis" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Writing Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/adaptive-quiz" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Adaptive Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/learning-plan" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Learning Plan
                  </Link>
                </li>
                <li>
                  <Link to="/teacher-dashboard" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Teacher Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} LearnlyticAssist. All rights reserved. Created for hackathon purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
