import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Hackathon = () => {
  const [view, setView] = useState("grid");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const filterList = [
    "All",
    "Coding",
    "Design",
    "AI/ML",
    "Blockchain",
    "Web Development",
    "Mobile Apps",
  ];

  // get api
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/hackathon");
        setData(res.data.data);
      } catch (err) {
        console.log("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Hackathon not found</p>;

  return (
    <div className="overflow-x-hidden">
      {/* Hero section */}
      <section>
        <div className="bg-gradient-to-br from-[#f9f7f1] via-[#eef4e8] to-[#e6f1e3] mx-4 md:mx-8 my-5 p-5 rounded-xl shadow-md flex flex-col md:flex-row gap-5 md:justify-between lg:px-10 items-center lg:h-[400px]">
          <div className="max-w-[300px] lg:max-w-[450px]">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
              Build the Future.
              <br />
              <span className="text-[#03594E]">Join a Hackathon.</span>
            </h1>
            <p className="mt-1 lg:text-lg lg:max-w-[400px]">
              Browse the best coding competitions and start building today.
              Connect with developers, win prizes, and launch your career.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden w-full max-w-[400px] lg:max-w-[500px]">
            <img
              src="https://res.cloudinary.com/drq2a0262/image/upload/v1766129810/hackathon_bljdtw.png"
              alt="hackathon-image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* search and filter hackathons*/}
      <section>
        <div className="my-10">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-end">
            <div className="flex flex-col gap-2 mb-2 lg:flex-row lg:border border-gray-200 lg:shadow-lg lg:bg-gray-100 lg:rounded-[40px] lg:mr-10 p-3 lg:items-center">
              <p className="mx-4 md:mx-8 font-semibold text-lg">
                We found <strong>46</strong> hackathons live now
              </p>
              <div className="mx-2 md:mx-8 relative flex lg:items-center">
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  className="bg-[#02b098] py-2 pl-8 pr-4 text-white placeholder:text-white focus:outline-none rounded-3xl"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-white top-3 left-2 absolute"
                />
                <span className="bg-[#03594E] w-10 h-10 lg:w-8 lg:h-8  flex items-center justify-center rounded-full mx-2 cursor-pointer">
                  <FontAwesomeIcon
                    icon={faCalendarWeek}
                    className="text-white text-lg"
                  />
                </span>
                <div className="lg:hidden">
                  {view === "grid" && (
                    <span
                      onClick={() => setView("list")}
                      className="w-10 h-10 ml-2 bg-[#03594E] rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <span className="grid grid-cols-2 gap-[3px]">
                        <span className="w-2 h-2 bg-white"></span>
                        <span className="w-2 h-2 bg-white"></span>
                        <span className="w-2 h-2 bg-white"></span>
                        <span className="w-2 h-2 bg-white"></span>
                      </span>
                    </span>
                  )}

                  {view === "list" && (
                    <span
                      onClick={() => setView("grid")}
                      className="w-10 h-10 ml-2 bg-[#03594E] rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={faList}
                        className="text-white text-lg"
                      />
                    </span>
                  )}
                </div>
                <div className="hidden lg:flex items-center bg-white border border-gray-200 rounded-full p-1 relative w-[76px]">
                  {/* Sliding active background */}
                  <span
                    className={`absolute top-1 left-1 h-8 w-8 rounded-full bg-[#03594E]
      transition-transform duration-300 ease-in-out
      ${view === "list" ? "translate-x-9" : "translate-x-0"}`}
                  />

                  {/* GRID icon (left) */}
                  <button
                    onClick={() => setView("grid")}
                    className="relative z-10 w-8 h-8 flex items-center justify-center"
                  >
                    <span className="grid grid-cols-2 gap-[3px]">
                      <span
                        className={`w-1.5 h-1.5 ${
                          view === "grid" ? "bg-white" : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`w-1.5 h-1.5 ${
                          view === "grid" ? "bg-white" : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`w-1.5 h-1.5 ${
                          view === "grid" ? "bg-white" : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`w-1.5 h-1.5 ${
                          view === "grid" ? "bg-white" : "bg-gray-400"
                        }`}
                      />
                    </span>
                  </button>

                  {/* LIST icon (right) */}
                  <button
                    onClick={() => setView("list")}
                    className="relative ml-1 z-10 w-8 h-8 flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faList}
                      className={`text-lg ${
                        view === "list" ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto pl-4 scrollbar-hide lg:hidden">
              <ul className="flex gap-3 whitespace-nowrap">
                {filterList.map((val) => (
                  <li
                    onClick={() => setActive(val)}
                    key={val}
                    className={`${
                      active === val ? "bg-green-500 text-white" : "bg-gray-300"
                    } px-5 py-2 shrink-0 rounded-3xl cursor-pointer`}
                  >
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* hackathons list */}
      <section className="mx-4">
        <div className="flex gap-[75px]">
          <div className="hidden shadow-xl p-4 border-2 border-gray-300 rounded-2xl lg:flex flex-col min-w-[220px] self-start">
            <h3 className="text-xl font-semibold">
              <FontAwesomeIcon
                icon={faFilter}
                className="text-green-500 text-lg"
              />
              Categories
            </h3>
            <ul className="flex flex-col gap-1 mt-2">
              {filterList.map((val) => (
                <li
                  onClick={() => setActive(val)}
                  className="flex items-center cursor-pointer"
                  key={val}
                >
                  <span
                    className={`${
                      active === val
                        ? "bg-green-500 border-green-700"
                        : "bg-gray-300 border-gray-500"
                    } border flex rounded-full w-3 h-3 mr-2`}
                  ></span>
                  {val}
                </li>
              ))}
            </ul>
          </div>
          {view === "grid" && (
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {data.map((val) => (
                <Link to={`/hackathons/${val._id}`} key={val._id}>
                  <div className="relative mx-2 rounded-3xl shadow-lg overflow-hidden pb-3 border border-gray-200 max-w-[320px] lg:max-w-[280px]">
                    <div className="mb-4">
                      <img
                        src="https://res.cloudinary.com/drq2a0262/image/upload/v1766129810/hackathon_bljdtw.png"
                        alt="hackathon-image"
                      />
                    </div>
                    <div className="mx-4  pb-3 border-b border-gray-300">
                      <span className="px-4 py-[2px] bg-green-100 border border-green-400 rounded-2xl text-green-500">
                        Tags
                      </span>
                      <h2 className="font-bold text-lg mt-2 truncate">
                        {val.title}
                      </h2>
                      <p className="font-semibold text-gray-500 text-sm">
                        {val.description}
                      </p>
                    </div>
                    <span className="absolute top-2 right-2 bg-blue-900 text-green-400 font-semibold py-1 px-3 rounded-2xl">
                      {val.status}
                    </span>
                    <div className="mx-4 flex justify-between mt-2">
                      <div className="flex flex-col font-semibold items-center">
                        <span className="text-gray-500">Participants</span>
                        <span className="text-green-400">1234</span>
                      </div>
                      <div className="flex flex-col font-semibold">
                        <span className="text-gray-500">Ends In</span>
                        <span className="text-green-400">2d 14h</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {view === "list" && (
            <div className="md:mx-8 flex flex-wrap gap-6 justify-center lg:justify-end">
              {data.map((val) => (
                <div
                  key={val._id}
                  className="relative w-full sm:max-w-[600px] xl:max-w-[800px] rounded-3xl shadow-lg flex border border-gray-200 overflow-hidden"
                >
                  {/* LEFT IMAGE */}
                  <div className="w-[130px] md:w-[180px] xl:w-[220px] h-full flex-shrink-0">
                    <img
                      src="https://res.cloudinary.com/drq2a0262/image/upload/v1766129810/hackathon_bljdtw.png"
                      alt="hackathon-image"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="px-2 py-2 w-full">
                    <span className="px-3 py-[1px] bg-green-100 border border-green-400 rounded-2xl text-green-500">
                      Tags
                    </span>
                    <h2 className="font-bold text-sm truncate">{val.title}</h2>
                    <p className="font-semibold text-gray-500 text-xs line-clamp-2">
                      {val.description}
                    </p>
                    <div className="pt-2 flex justify-between mt-2 mx-2 border-t border-gray-300">
                      <div className="flex flex-col font-semibold items-center">
                        <span className="text-gray-500 text-sm">
                          Participants
                        </span>
                        <span className="text-green-400">1234</span>
                      </div>
                      <div className="flex flex-col font-semibold">
                        <span className="text-gray-500 text-sm">Ends In</span>
                        <span className="text-green-400">2d 14h</span>
                      </div>
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 bg-blue-900 text-green-400 font-semibold py-1 px-3 rounded-2xl">
                    {val.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hackathon;
