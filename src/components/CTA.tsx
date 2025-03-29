
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-8 lg:mb-0 lg:pr-8">
            <h2 className="text-3xl font-bold text-white">
              Ready to transform learning experiences?
            </h2>
            <p className="mt-4 text-lg text-purple-100 max-w-xl">
              Join thousands of educators and students already using our AI-powered platform to detect
              learning disabilities and provide personalized support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50"
            >
              <Link to="/writing-analysis">
                Try Writing Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-purple-500"
            >
              <a href="#">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
