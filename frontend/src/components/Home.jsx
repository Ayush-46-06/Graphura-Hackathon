import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Home/Hero";

import { FaFirstAid } from "react-icons/fa";
import First from "./Home/First";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <First />
      <Footer />
    </div>
  );
};

export default Home;
