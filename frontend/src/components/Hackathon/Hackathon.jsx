import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faPeopleGroup,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import HackathonSEO from "../SEO/HackathonPageSEO";

const Hackathon = () => {
  const [view, setView] = useState("grid");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [range, setRange] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaid, setIsPaid] = useState("All");
  const [participation, setParticipation] = useState("All");
  const itemsPerPage = 9;
  const navigate = useNavigate();
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

  const filteredData = data.filter((item) => {
    // CATEGORY FILTER
    const categoryMatch = active === "All" || item.category === active;

    // SEARCH FILTER
    const searchMatch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // DATE FILTER (react-calendar)
    let dateMatch = true;

    if (range && range.length === 2) {
      const [startDate, endDate] = range;

      const hackathonStart = new Date(item.startDate);
      const hackathonEnd = new Date(item.endDate);

      dateMatch = hackathonStart <= endDate && hackathonEnd >= startDate;
    }

    const paidMatch =
      isPaid === "All"
        ? true
        : isPaid === "Paid"
        ? item.isPaid === true
        : item.isPaid === false;

    const participationMatch =
      participation === "All"
        ? true
        : item.participationType === participation.toLowerCase();

    return (
      categoryMatch &&
      searchMatch &&
      dateMatch &&
      paidMatch &&
      participationMatch
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const sortedData = [...filteredData].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleChange = (value) => {
    setRange(value);
    setShowCalendar(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [active, searchTerm, range]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Hackathon not found</p>;

  return (
    <div className="overflow-x-hidden">
      <HackathonSEO />
      <Navbar />
      {/* Hero section */}
      <section className="bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] pt-27  pb-5 flex justify-center">
        <div className="relative mx-4 md:mx-8 flex flex-col md:flex-row gap-5 md:justify-between items-center lg:h-[400px] max-w-[1280px] w-full">
          <div className="relative z-10 max-w-[300px] lg:max-w-[450px]">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white">
              Build the Future.
              <br />
              <span className="text-[#F8C62F]">Join a Hackathon.</span>
            </h1>
            <p className="text-white mt-1 lg:text-lg lg:max-w-[400px] lg:font-medium">
              Browse the best coding competitions and start building today.
              Connect with developers, win prizes, and launch your career.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden w-full max-w-[400px] lg:max-w-[500px] floating">
            <img
              // src="https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767686265/Hero_section-removebg-preview_ati5st"
              src="https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1767686924/Hero_section_hpi4js"
              alt="hackathon-image"
              className="w-full h-full object-cover drop-shadow-filter"
            />
          </div>
        </div>
      </section>

      {/* search and filter hackathons*/}
      <section className="flex justify-center">
        <div className="my-10 w-full">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-end">
            <div className="flex flex-col gap-2 mb-2 lg:flex-row lg:border border-gray-200 lg:shadow-lg lg:rounded-[40px] lg:mr-10 p-3 lg:items-center">
              <p className="mx-2 font-semibold text-lg">
                We found <strong>46</strong> hackathons live now
              </p>
              <div className="relative flex lg:items-center">
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 py-2 pl-10 pr-4 text-black placeholder:text-black focus:outline-none rounded-3xl shadow-xl border border-gray-300"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-black top-3 left-3 absolute"
                />
                <span className="bg-[#03594E] w-10 h-10 lg:w-8 lg:h-8  flex items-center justify-center rounded-full mx-2 cursor-pointer">
                  <FontAwesomeIcon
                    icon={faCalendarWeek}
                    className="text-white text-lg"
                    onClick={() => setShowCalendar((prev) => !prev)}
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

                  {/* GRID icon  */}
                  <button
                    onClick={() => setView("grid")}
                    className="relative z-10 w-8 h-8 flex items-center justify-center cursor-pointer"
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

                  {/* LIST icon  */}
                  <button
                    onClick={() => setView("list")}
                    className="relative ml-1 z-10 w-8 h-8 flex items-center justify-center cursor-pointer"
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
                      active === val
                        ? "bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] text-white"
                        : "bg-gray-300"
                    } px-5 py-2 shrink-0 rounded-3xl cursor-pointer`}
                  >
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {showCalendar && (
          <div className="fixed top-20 right-2 z-50 bg-white shadow-xl rounded-xl overflow-hidden w-[320px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <p className="text-sm text-gray-600">
                Select <span className="font-semibold">start</span> and{" "}
                <span className="font-semibold">end</span> dates
              </p>

              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-red-500 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Calendar */}
            <div className="p-3">
              <Calendar selectRange={true} onChange={handleChange} />
            </div>
          </div>
        )}
      </section>

      {/* hackathons list */}
      <section className="mx-4 flex justify-center">
        <div className="flex gap-[75px] w-full mx-2">
          <div className="hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all duration-300 p-4 border-2 ml-2 border-gray-300 rounded-2xl lg:flex flex-col min-w-[250px] self-start lg:sticky lg:top-0">
            <div className="pb-2">
              <h3 className="text-xl font-semibold">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="text-green-500 text-lg pr-2"
                />
                Categories
              </h3>
              <ul className="flex flex-col gap-1 mt-2 px-2 mr-5">
                {filterList.map((val) => (
                  <li
                    onClick={() => setActive(val)}
                    className={`flex items-center cursor-pointer p-2 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out ${
                      active === val
                        ? "text-white bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]"
                        : ""
                    }`}
                    key={val}
                  >
                    <span
                      className={`${
                        active === val
                          ? "bg-white border-white"
                          : "bg-gray-300 border-gray-500"
                      } border flex rounded-full w-3 h-3 mr-2`}
                    ></span>
                    {val}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-2 border-t border-gray-200">
              <h3 className="text-xl font-semibold">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="text-green-500 text-lg pr-2"
                />
                Pricing
              </h3>
              <ul className="flex flex-col gap-1 mt-2 px-2 mr-5">
                {["All", "Free", "Paid"].map((val) => (
                  <li
                    key={val}
                    onClick={() => setIsPaid(val)}
                    className={`flex items-center cursor-pointer p-2 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out ${
                      isPaid === val
                        ? "text-white bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]"
                        : ""
                    }`}
                  >
                    <span
                      className={`${
                        isPaid === val
                          ? "bg-white border-white"
                          : "bg-gray-300 border-gray-500"
                      } border flex rounded-full w-3 h-3 mr-2`}
                    ></span>
                    {val}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <h3 className="text-xl font-semibold">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="text-green-500 text-lg pr-2"
                />
                Participation
              </h3>
              <ul className="flex flex-col gap-1 mt-2 px-2 mr-5">
                {["All", "Solo", "Team"].map((val) => (
                  <li
                    key={val}
                    onClick={() => setParticipation(val)}
                    className={`flex items-center cursor-pointer p-2 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out ${
                      participation === val
                        ? "text-white bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]"
                        : ""
                    }`}
                  >
                    <span
                      className={`${
                        participation === val
                          ? "bg-white border-white"
                          : "bg-gray-300 border-gray-500"
                      } border flex rounded-full w-3 h-3 mr-2`}
                    ></span>
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center lg:place-items-start w-full pb-5">
              {paginatedData.map((val) => (
                <div
                  key={val._id}
                  className="group h-full flex flex-col relative mx-2 rounded-3xl shadow-lg overflow-hidden pb-3 border border-gray-200 w-full max-h-[450px] hover:scale-105 hover:shadow-xl transition-transform duration-200 w-[320px]"
                >
                  <div className="mb-4 overflow-hidden h-[180px]">
                    <img
                      src={val.image}
                      alt="hackathon-image"
                      className="group-hover:scale-110 transition-transform duration-200 h-full w-full object-cover"
                    />
                  </div>
                  <div className="mx-4 mb-2 flex flex-col flex-1">
                    <div className="mt-2 w-full overflow-hidden">
                      <div className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {val.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={tag}
                            className={`px-3 py-0.75 text-[11px] font-medium rounded-full border transition-colors line-clamp-1
        ${index % 3 === 0 && "bg-green-50 text-green-700 border-green-300"}
        ${index % 3 === 1 && "bg-blue-50 text-blue-700 border-blue-300"}
        ${index % 3 === 2 && "bg-purple-50 text-purple-700 border-purple-300"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="font-bold text-lg mt-2 truncate group-hover:text-green-800">
                      {val.title}
                    </h2>
                    <p className="font-semibold text-gray-500 text-sm line-clamp-3 mb-2">
                      {val.description}
                    </p>
                    <button
                      onClick={() => navigate(`/hackathons/${val._id}`)}
                      className="cursor-pointer mt-auto w-full bg-gradient-to-br from-[#F8C62F] to-[#fee035] py-2 text-white rounded-xl font-semibold hover:scale-105 hover:shadow-md hover:bg-amber-500 duration-200 transition-transform"
                    >
                      View Details
                    </button>
                  </div>
                  <span className="absolute top-2 right-2 bg-[#2c572f] text-[#39ff14] font-semibold py-1 px-3 rounded-2xl border border-[#39ff14] shadow-[0_0_8px_#39ff14,0_0_16px_#39ff14]">
                    {val.isPaid === true ? "Paid" : "Free"}
                  </span>

                  <div className="mx-4 flex justify-between mt-2 pt-3 mt-auto border-t border-gray-300">
                    <div className="flex items-center gap-1">
                      <div className="bg-green-200 rounded-lg py-1.5 px-2">
                        <FontAwesomeIcon
                          icon={faPeopleGroup}
                          className="text-green-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">
                          Participants
                        </span>
                        <span className="text-green-400 font-medium text-sm">
                          {val.participants.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-blue-200 rounded-lg py-1.5 px-2">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-blue-600"
                        />
                      </div>

                      {val.status === "upcoming" && (
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm">
                            Starts On
                          </span>
                          <span className="text-blue-500 font-medium text-sm">
                            {formatDate(val.startDate)}
                          </span>
                        </div>
                      )}
                      {val.status === "ongoing" && (
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm">Ends On</span>
                          <span className="text-blue-500 font-medium text-sm">
                            {formatDate(val.endDate)}
                          </span>
                        </div>
                      )}
                      {val.status === "completed" && (
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm">
                            Ended on
                          </span>
                          <span className="text-blue-500 font-medium text-sm">
                            {formatDate(val.endDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "list" && (
            <div className="md:mx-8 pb-5 grid grid-cols-1 gap-6 place-items-center lg:place-items-end w-full">
              {paginatedData.map((val) => (
                <Link
                  to={`/hackathons/${val._id}`}
                  key={val._id}
                  className="w-full block"
                >
                  <div className="group cursor-pointer relative w-full rounded-3xl shadow-lg flex items-stretch border border-gray-200 overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-200">
                    {/* LEFT IMAGE */}
                    <div className="overflow-hidden h-[175px] w-[130px] md:w-[180px] xl:w-[250px] 2xl:w-[300px]  flex-shrink-0">
                      <img
                        src={val.image}
                        alt="hackathon-image"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="px-4 py-2 w-full flex flex-col h-full">
                      {/* TAGS */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {val.tags.map((tag, index) => (
                          <span
                            key={tag}
                            className={`px-3 py-[3px] text-xs font-medium rounded-full border
          ${index % 3 === 0 && "bg-green-50 text-green-700 border-green-300"}
          ${index % 3 === 1 && "bg-blue-50 text-blue-700 border-blue-300"}
          ${
            index % 3 === 2 && "bg-purple-50 text-purple-700 border-purple-300"
          }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* TITLE */}
                      <h2 className="font-bold text-sm line-clamp-1 md:text-lg xl:text-xl group-hover:text-green-800 mt-2">
                        {val.title}
                      </h2>

                      {/* DESCRIPTION */}
                      <p className="mb-2 font-semibold text-gray-500 text-xs sm:line-clamp-3 line-clamp-2 md:line-clamp-1 md:text-sm xl:text-base">
                        {val.description}
                      </p>
                      <div className="w-15 sm:hidden">
                        {" "}
                        <button
                          onClick={() => navigate(`/hackathons/${val._id}`)}
                          className="cursor-pointer w-full bg-gradient-to-br from-[#F8C62F] to-[#fee035] text-white rounded-xl font-semibold hover:scale-105 hover:shadow-md hover:bg-amber-500 duration-200 transition-transform"
                        >
                          View
                        </button>
                      </div>

                      <div className="hidden sm:flex justify-between mt-auto border-t border-gray-300 pt-3">
                        {/* PARTICIPANTS */}
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <div className="bg-green-200 rounded-lg py-1.5 px-2">
                            <FontAwesomeIcon
                              icon={faPeopleGroup}
                              className="text-green-500"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Participants
                            </span>
                            <span className="text-green-400 font-medium text-sm">
                              {val.participants.length}
                            </span>
                          </div>
                        </div>

                        {/* DATE */}
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <div className="bg-blue-200 rounded-lg py-1.5 px-2">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="text-blue-600"
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              {val.status === "completed"
                                ? "Ended On"
                                : "Ends On"}
                            </span>
                            <span className="text-blue-500 font-medium text-sm">
                              {formatDate(val.endDate)}
                            </span>
                          </div>
                        </div>

                        {/* ENROLL BY */}
                        <div className="hidden xl:flex items-center gap-2">
                          <div className="bg-purple-200 rounded-lg py-1.5 px-2">
                            <FontAwesomeIcon
                              icon={faCalendarDays}
                              className="text-purple-700"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Enrolls By
                            </span>
                            <span className="text-purple-600 font-medium text-sm">
                              {formatDate(val.lastEnrollmentDate)}
                            </span>
                          </div>
                        </div>
                        <div className="w-15">
                          {" "}
                          <button
                            onClick={() => navigate(`/hackathons/${val._id}`)}
                            className="cursor-pointer w-full bg-gradient-to-br from-[#F8C62F] to-[#fee035] py-2 text-white rounded-xl font-semibold hover:scale-105 hover:shadow-md hover:bg-amber-500 duration-200 transition-transform"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>

                    <span className="absolute top-2 left-2 bg-[#2c572f] text-[#39ff14] font-semibold py-1 px-3 rounded-2xl border border-[#39ff14] shadow-[0_0_8px_#39ff14,0_0_16px_#39ff14]">
                      {val.isPaid === true ? "Paid" : "Free"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* pagination */}
      <section>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 mb-6">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 border rounded-lg disabled:opacity-40"
            >
              ←
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg border font-semibold
          ${
            currentPage === i + 1
              ? "bg-[#03594E] text-white"
              : "bg-white text-gray-700"
          }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 border rounded-lg disabled:opacity-40"
            >
              →
            </button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Hackathon;
