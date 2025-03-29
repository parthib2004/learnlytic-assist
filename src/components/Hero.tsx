import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AIAnalysisCard from "./AIAnalysisCard";
import StatsSection from "./StatsSection";

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
            <div className="mt-12">
              <StatsSection />
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -top-4 -left-4 h-72 w-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse-light"></div>
            <div className="absolute -bottom-8 -right-4 h-72 w-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse-light animation-delay-1000"></div>
            <div className="relative">
              <AIAnalysisCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
