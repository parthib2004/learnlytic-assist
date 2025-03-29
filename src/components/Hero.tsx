
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-white/10 z-0"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              <span className="block">AI-Powered Detection &</span>
              <span className="text-purple-600">Learning Assistance</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Early detection of learning disabilities and personalized learning plans
              to help every student reach their full potential.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link to="/writing-analysis">
                  Try Writing Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/adaptive-quiz">Explore Adaptive Quiz</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">99%</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Accuracy</p>
                  <p className="text-xs text-gray-500">in detection</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">10k+</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Students</p>
                  <p className="text-xs text-gray-500">helped globally</p>
                </div>
              </div>
              <div className="flex items-center col-span-2 md:col-span-1">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3+</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Disabilities</p>
                  <p className="text-xs text-gray-500">detected</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -top-4 -left-4 h-72 w-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse-light"></div>
            <div className="absolute -bottom-8 -right-4 h-72 w-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse-light animation-delay-1000"></div>
            <div className="relative">
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden border">
                <div className="p-5 border-b bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-sm text-gray-500">Personalized Learning Analysis</div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="ml-4 bg-purple-50 p-3 rounded-lg rounded-tl-none">
                      <p className="text-sm text-gray-800">
                        Based on the writing sample, I've detected patterns consistent with dyslexia.
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="bg-gray-100 p-3 rounded-lg mb-2">
                      <div className="h-2 bg-purple-200 rounded-full w-4/5 mb-2"></div>
                      <div className="h-2 bg-purple-200 rounded-full w-3/4"></div>
                    </div>
                    <div className="ml-auto bg-gray-100 p-3 rounded-lg">
                      <div className="h-2 bg-purple-200 rounded-full w-full mb-2"></div>
                      <div className="h-2 bg-purple-200 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Generating learning plan...</div>
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-purple-600 animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-purple-600 animate-pulse delay-75"></div>
                      <div className="h-2 w-2 rounded-full bg-purple-600 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
