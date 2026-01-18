import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Home/Hero";

import { FaFirstAid } from "react-icons/fa";
import First from "./Home/First";
import GraphuraSEO from "./SEO/GraphuraSEO";

const Home = () => {
  return (
    <div>
      <GraphuraSEO />
      <Navbar />
      <Hero />
      <First />
      <Footer />
    </div>
  );
};

export default Home;
