import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-[#6C5CE7]">
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
              className="bg-white hover:bg-gray-50 text-[#6C5CE7] font-medium rounded-xl"
            >
              <Link to="/writing-analysis" className="flex items-center">
                Try Writing Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#8A7EF2] hover:bg-[#7A6EE4] text-white font-medium border-0 rounded-xl"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
