import React from "react";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AllBlog from "./components/Blog/AllBlog";
import Hackathon from "./components/Hackathon/Hackathon";
import HackathonDetail from "./components/Hackathon/HackathonDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-blog" element={<AllBlog />} />
        <Route path="/hackathons" element={<Hackathon />} />
        <Route path="/hackathons/:id" element={<HackathonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
