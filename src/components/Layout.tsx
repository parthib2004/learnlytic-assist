import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Heart } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
        <div className="fixed bottom-4 right-4 flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-800 py-2.5 px-4 rounded-full shadow-lg border border-purple-100 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-purple-100/50">
          Made with{" "}
          <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
          {" "}for Dyslexic Minds
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
