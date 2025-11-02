import React from "react";
import HeroSection from "../components/HeroSection";  // <-- correct the path
import FeatureSection from "../components/FeatureSection";
import TrailersSection from "../components/TrailersSection";
import Footer from "../components/Footer";
// or "./HeroSection" depending on your folder

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <TrailersSection />
     
    </>
  );
};

export default Home;
