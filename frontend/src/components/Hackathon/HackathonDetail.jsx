import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCircleCheck,
  faPeopleGroup,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

const HackathonDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Overview");

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/hackathon/${id}`
        );

        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch hackathon", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Hackathon not found</p>;

  const list = [
    "Overview",
    "Rules & Guidlines",
    "Judges",
    "Sponsors",
    "Prizes",
  ];

  const rules = [
    "Only original code, content, and design are allowed.",
    "Teams must stick to the event timeline and checkpoints.",
    "Any prohibited tool, plagiarism, or misconduct results in immediate elimination.",
    "Final project submission must include a working demo and documentation.",
    "Respect mentors, organizers, other teams, and the spirit of competition.",
    "Follow all announcements on official communication channels.",
    "The decision of the judging panel is final.",
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-1 mx-4 my-2">
        <Link to="/" className="hover:text-black">
          Home
        </Link>

        <span>/</span>

        <Link to="/hackathons" className="hover:text-black">
          Hackathons
        </Link>

        <span>/</span>

        <span className="text-black font-medium">{data.title}</span>
      </nav>

      {/* hackathon details */}
      <section className="mx-4">
        <div className="">
          <h1 className="font-bold text-xl">{data.title}</h1>
          <p className="text-gray-500">{data.description}</p>
          <div className="mt-2 rounded-2xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/drq2a0262/image/upload/v1766129810/hackathon_bljdtw.png"
              alt="hackathon-image"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <div className="border border-gray-200 shadow-md p-2 flex flex-col rounded-xl justify-between">
              <span>
                <FontAwesomeIcon
                  icon={faHourglassHalf}
                  className="text-green-500"
                />
              </span>
              <span className="text-gray-500 text-sm font-medium">
                ENROLLMENT ENDS
              </span>
              <span className="font-bold">30th Dec</span>
            </div>
            <div className="border border-gray-200 shadow-md p-2 flex flex-col rounded-xl">
              <span>
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="text-green-500"
                />
              </span>
              <span className="text-gray-500 text-sm font-medium">
                STUDENT ENROLLED
              </span>
              <span className="font-bold">1234</span>
            </div>
            <div className="border border-gray-200 shadow-md p-2 flex flex-col rounded-xl">
              <span>
                <FontAwesomeIcon icon={faRocket} className="text-green-500" />
              </span>
              <span className="text-gray-500 text-sm font-medium">
                STARTS ON
              </span>
              <span className="mt-auto font-bold">31st Dec</span>
            </div>
          </div>
          <div>
            <div className="mt-5 overflow-x-auto border-b-2 border-gray-200 scrollbar-hide">
              <ul className="flex whitespace-nowrap gap-5 pb-2">
                {list.map((val) => (
                  <li
                    onClick={() => setActive(val)}
                    key={val}
                    className={`font-medium ${
                      active === val
                        ? "text-green-500 border-b-2 border-green-500"
                        : "text-gray-500"
                    } pb-2`}
                  >
                    {val}
                  </li>
                ))}
              </ul>
            </div>
            {active === "Overview" && (
              <div className="mt-2">
                <h3 className="font-bold text-xl">About the Hackathon</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                  suscipit id delectus nemo, totam aliquam quo fugiat aperiam
                  voluptatem qui, magni ullam dicta sequi ipsa ratione alias
                  accusantium voluptatibus, facere quam molestiae fuga
                  temporibus. Recusandae numquam qui assumenda? Consequatur
                  quasi id odio sunt quaerat praesentium repudiandae rem
                  eligendi velit tenetur. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ipsam, sapiente?
                </p>
              </div>
            )}
            {active === "Rules & Guidlines" && (
              <div>
                <ul className="flex flex-col gap-2">
                  {rules.map((val)=>(
                    <li key={val}><FontAwesomeIcon className="text-green-500" icon={faCircleCheck} /> {val}</li>
                  ))
                  }
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* hackathon detail card */}
        <div className="mt-2 rounded-2xl overflow-hidden pb-4 shadow-xl">
          <div>
            <img
              src="https://res.cloudinary.com/drq2a0262/image/upload/v1766129810/hackathon_bljdtw.png"
              alt="hackathon-image"
            />
          </div>
          <div className="flex gap-2 items-center px-2 mt-1">
            <div className="bg-gray-300 p-2 rounded-full">
              <FontAwesomeIcon
                icon={faBuilding}
                className="text-[#03594E] text-2xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Organizer</span>
              <span className="font-semibold">Graphura Pvt Ltd.</span>
            </div>
          </div>
          <ul className="py-2 px-4 flex flex-col gap-1 border-b border-gray-300">
            <li className="flex justify-between font-semibold">
              <span className="text-gray-500">Duration:</span>
              <span>24 hrs</span>
            </li>
            <li className="flex justify-between font-semibold">
              <span className="text-gray-500">Enrolled:</span>
              <span>123</span>
            </li>
            <li className="flex justify-between font-semibold">
              <span className="text-gray-500">Certificate:</span>
              <span>Available</span>
            </li>
            <li className="flex justify-between font-semibold">
              <span className="text-gray-500">Language:</span>
              <span>English</span>
            </li>
          </ul>
          <div className="flex justify-center bg-green-500 text-white mx-4 mt-4 py-2 rounded-3xl">
            <Link className="font-semibold">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HackathonDetail;
