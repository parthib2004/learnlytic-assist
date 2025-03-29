import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Learnlytic Assist - AI-Powered Learning Disability Detection</title>
        <meta
          name="description"
          content="Early detection of learning disabilities and personalized learning plans powered by AI"
        />
      </Helmet>
      <Hero />
      <Features />
      <CTA />
    </>
  );
};

export default Home;
