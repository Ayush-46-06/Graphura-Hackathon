import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons";
import Footer from "../Footer";
import Navbar from "../Navbar";
import {
  faArrowLeft,
  faArrowRight,
  faAward,
  faCalendarWeek,
  faCheck,
  faCircleCheck,
  faCommentDots,
  faCopy,
  faMedal,
  faPeopleGroup,
  faRobot,
  faRocket,
  faShareNodes,
  faTrophy,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Overview");
  const [allHackathons, setAllHackathons] = useState([]);
  const [share, setShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await axios.get(
          `/api/hackathon/${id}`
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

  useEffect(() => {
    const fetchAllHackathons = async () => {
      try {
        const res = await axios.get("/api/hackathon");
        setAllHackathons(res.data.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllHackathons();
  }, []);

  // fetching comments
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.error("error fetching comments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  // post comments
  const postComment = async () => {
    try {
      const res = await axios.post(
        "/api/comment",
        {
          hackathonId: id,
          text: replyTo ? replyText : commentText,
          ...(replyTo && { parentCommentId: replyTo }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newComment = res.data.data;

      // IF REPLY
      if (replyTo) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === replyTo
              ? { ...c, replies: [...(c.replies || []), newComment] }
              : c
          )
        );
        setReplyText("");
        setReplyTo(null);
      }
      // IF NORMAL COMMENT
      else {
        setComments([newComment, ...comments]);
        setCommentText("");
      }
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Hackathon not found</p>;

  const list = ["Overview", "Rules & Guidlines", "Prizes", "Comments"];

  const rules = [
    "Only original code, content, and design are allowed.",
    "Teams must stick to the event timeline and checkpoints.",
    "Any prohibited tool, plagiarism, or misconduct results in immediate elimination.",
    "Final project submission must include a working demo and documentation.",
    "Respect mentors, organizers, other teams, and the spirit of competition.",
    "Follow all announcements on official communication channels.",
    "The decision of the judging panel is final.",
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleRegister = async () => {
    navigate("/signup");
  };

  const isEnrollmentClosed =
    data.lastEnrollmentDate && new Date() > new Date(data.lastEnrollmentDate);

  // copying link
  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const shareText = "Check out this hackathon on Graphura!";

  // time ago
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (let i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count >= 1) {
        return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  const formatLocalMidnightTime = (dateString) => {
    if (!dateString) return "";

    const localDateString = dateString.replace("Z", "");
    const date = new Date(localDateString);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const prizes = data?.prizeDetails?.split(",").map((p) => Number(p.trim()));

const start = new Date(data.startDate).getTime();
const end = new Date(data.endDate).getTime();

const durationInHours = Math.ceil(
  (end - start) / (1000 * 60 * 60)
);


  return (
    <div className="pt-25">
      <Navbar />
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-1 mx-4 lg:mx-8 my-2">
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
      <section>
        <div className="mx-4 lg:mx-8 lg:flex gap-[5%] mt-5">
          <div className="pb-4 w-full">
            <button onClick={()=>navigate("/hackathons")} className="bg-yellow-400 hover:bg-amber-500 hover:-translate-y-1 cursor-pointer duration-200 transition-transform text-white py-2 px-4 rounded-2xl"><FontAwesomeIcon icon={faArrowLeft} /> Back to Hackathons</button>
            <div className=" relative mt-2 rounded-2xl overflow-hidden max-h-[250px] lg:max-h-[320px]">
              <img
                src={data.image}
                alt="hackathon-image"
                className="w-full h-full object-cover"
              />
              <div className="absolute bg-black/35 inset-0 flex flex-col justify-center items-center">
                <h1 className="font-bold text-xl text-white md:text-2xl lg:text-3xl xl:text-4xl mb-5">
                  {data.title}
                </h1>
                <p className="text-white font-medium text-center md:text-lg lg:text-xl px-4">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-5">
              <div className="border border-gray-200 shadow-md p-2 flex flex-col rounded-xl justify-between lg:items-center lg:justify-start">
                <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-center justify-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faHourglassHalf}
                      className="text-green-500"
                    />
                  </span>
                  <span className="text-gray-500 text-sm font-medium lg:text-lg">
                    ENROLLMENT ENDS
                  </span>
                </div>
                <span className="font-bold lg:text-lg">
                  {formatDate(data.lastEnrollmentDate)}
                </span>
              </div>
              <div className="border border-gray-200 shadow-md p-2 flex flex-col rounded-xl lg:items-center lg:justify-start">
                <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-center justify-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      className="text-green-500"
                    />
                  </span>
                  <span className="text-gray-500 text-sm font-medium lg:text-lg">
                    STUDENT ENROLLED
                  </span>
                </div>
                <span className="font-bold lg:text-lg">
                  {data.participants.length}
                </span>
              </div>
              <div className="border border-gray-200 shadow-md p-2 flex flex-col rounded-xl lg:items-center lg:justify-start">
                <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-center justify-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faRocket}
                      className="text-green-500"
                    />
                  </span>
                  <span className="text-gray-500 text-sm font-medium lg:text-lg">
                    STARTS ON
                  </span>
                </div>
                <span className="mt-auto font-bold lg:text-lg">
                  {formatDate(data.startDate)}
                </span>
              </div>
            </div>
            <div>
              <div className="mt-5 overflow-x-auto border-b-2 border-gray-200 scrollbar-hide">
                <ul className="flex whitespace-nowrap gap-5 pb-2">
                  {list.map((val) => (
                    <li
                      onClick={() => setActive(val)}
                      key={val}
                      className={`font-medium cursor-pointer ${
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
                <div className="mt-4 max-w-[700px]">
                  <h3 className="font-bold text-xl mb-2 lg:text-2xl">
                    About the Hackathon
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    {data?.about.split("\\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              )}
              {active === "Rules & Guidlines" && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2 lg:text-2xl">
                    Play fair. Innovate bold.
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {rules.map((val) => (
                      <li key={val} className="flex gap-2">
                        <span className="pt-1">
                          <FontAwesomeIcon
                            className="text-green-500"
                            icon={faCircleCheck}
                          />
                        </span>{" "}
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                  <p className=" mt-2 p-4 bg-green-100 border-l-4 border-green-500 rounded-xl font-semibold">
                    Pro tip: Strategy matters as much as skill. Plan wisely.
                  </p>
                </div>
              )}
              {/* {active === "Sponsors" && (
                <div className="mt-4">
                  <h3 className="font-bold text-xl lg:text-2xl">
                    Our Proud Sponsors
                  </h3>
                  <div className="flex flex-wrap gap-6 mt-4">
                    {data?.sponsors?.map((sponsor) => (
                      <div
                        key={sponsor._id}
                        className="max-w-[200px] border border-gray-300 rounded-xl p-2"
                      >
                        <img src={sponsor} alt="sponsor-logo" />
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
              {active === "Prizes" && (
                <div className="mt-4">
                  <h3 className="font-bold text-xl lg:text-2xl">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-green-500 mr-2"
                    />
                    Prizes & Awards
                  </h3>
                  <div className="flex gap-6 mt-2 justify-center w-full flex-wrap">
                    {/* 1st Prize Winner */}
                    <div className="relative rounded-2xl p-5 bg-gradient-to-br from-yellow-300 via-yellow-100 to-yellow-500 shadow-[0_10px_30px_rgba(234,179,8,0.6)] border border-yellow-600">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-600 shadow-inner">
                          <FontAwesomeIcon
                            icon={faTrophy}
                            className="text-yellow-100 text-lg"
                          />
                        </span>

                        <h3 className="text-xl font-bold text-yellow-900">
                          1st Prize Winner
                        </h3>
                      </div>

                      {/* Prize amount */}
                      <p className="text-lg font-bold text-yellow-900">
                        ₹{prizes?.[0]?.toLocaleString()}
                      </p>

                      <p className="text-sm text-yellow-800 mt-1 font-medium">
                        Champion of the Hackathon
                      </p>

                      <span className="absolute inset-0 rounded-2xl ring-2 ring-yellow-400/50 pointer-events-none"></span>
                    </div>

                    {/* 2nd Prize Winner */}
                    <div className="relative rounded-2xl p-5 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 shadow-[0_10px_30px_rgba(156,163,175,0.6)] border border-gray-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 shadow-inner">
                          <FontAwesomeIcon
                            icon={faMedal}
                            className="text-gray-100 text-lg"
                          />
                        </span>

                        <h3 className="text-xl font-bold text-gray-800">
                          2nd Prize Winner
                        </h3>
                      </div>

                      <p className="text-lg font-bold text-gray-800">
                        ₹{prizes?.[1]?.toLocaleString()}
                      </p>

                      <p className="text-sm text-gray-700 mt-1 font-medium">
                        Outstanding Performance
                      </p>

                      <span className="absolute inset-0 rounded-2xl ring-2 ring-gray-300/60 pointer-events-none"></span>
                    </div>

                    {/* 3rd Prize Winner */}
                    <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#8C6239] via-[#ec9645] to-[#7A4A2E] shadow-[0_10px_30px_rgba(120,74,46,0.6)] border border-[#6E3B1F]">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6E3B1F] shadow-inner">
                          <FontAwesomeIcon
                            icon={faAward}
                            className="text-[#F5E6D3] text-lg"
                          />
                        </span>

                        <h3 className="text-xl font-bold text-white">
                          3rd Prize Winner
                        </h3>
                      </div>

                      {/* Prize */}
                      <p className="text-lg font-bold text-white">
                        ₹{prizes?.[2]?.toLocaleString()}
                      </p>

                      <p className="text-sm text-white mt-1 font-medium">
                        Strong Performance
                      </p>

                      <span className="absolute inset-0 rounded-2xl ring-2 ring-[#B87333]/40 pointer-events-none"></span>
                    </div>
                  </div>
                </div>
              )}
              {active === "Comments" && (
                <div className="mt-4 max-h-[500px] overflow-y-scroll">
                  <div className="relative flex gap-3 mb-6 p-2">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 rounded-lg bg-gray-100 shadow-md border border-gray-200 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-800 font-medium"
                      rows={3}
                    />
                    <button
                      onClick={postComment}
                      className="absolute right-5 bottom-5 py-1 bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-white px-6 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-md duration-200 transition-transform"
                    >
                      Post
                    </button>
                  </div>

                  {/* COMMENTS LIST */}
                  {loading ? (
                    <p className="text-gray-500 text-sm">Loading comments...</p>
                  ) : comments.length === 0 ? (
                    <p className="text-gray-500 text-sm">No comments yet</p>
                  ) : (
                    <div className="space-y-4">
                      <p className="font-bold text-lg mx-2">
                        Comments{" "}
                        <span className="font-semibold text-white bg-yellow-500 text-sm rounded-xl px-2">
                          {comments.length}
                        </span>
                      </p>
                      {comments.map((comment) => (
                        <div key={comment._id} className="ml-2 pb-4">
                          {/* MAIN COMMENT */}
                          <div className="flex gap-2 items-center">
                            {comment.user.image ? (
                              <img
                                src={comment.user.image}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <span className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full text-lg font-semibold">
                                {comment.user?.name?.[0]}
                              </span>
                            )}

                            <p className="font-semibold">
                              {comment.user?.name}
                              <span className="text-gray-600 font-normal ml-3">
                                {timeAgo(comment.createdAt)}
                              </span>
                            </p>
                          </div>

                          <p className="text-sm text-gray-700 ml-12 font-medium">
                            {comment.text}
                          </p>

                          {/* REPLY BUTTON */}
                          <button
                            onClick={() => setReplyTo(comment._id)}
                            className="ml-15 text-sm text-green-700 font-semibold mt-1 cursor-pointer"
                          >
                            <FontAwesomeIcon
                              icon={faCommentDots}
                              className="pr-1"
                            />
                            Reply
                          </button>

                          {/* REPLY INPUT */}
                          {replyTo === comment._id && (
                            <div className="ml-12 mt-2 flex gap-2">
                              <input
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="flex-1 rounded-lg bg-gray-100 shadow-md border border-gray-200 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-800 font-medium"
                              />
                              <button
                                onClick={postComment}
                                className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-white px-4 rounded-lg text-sm hover:-translate-y-1 hover:shadow-md duration-200 transition-transform"
                              >
                                Send
                              </button>
                            </div>
                          )}

                          {/* REPLIES */}
                          {comment.replies?.length > 0 && (
                            <div className="ml-16 mt-3 space-y-2 pl-4 border-l border-green-700">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply._id}
                                  className="flex gap-2 pb-2"
                                >
                                  {reply.user.image ? (
                                    <img
                                      src={comment.user.image}
                                      alt="user"
                                      className="w-10 h-10 rounded-full"
                                    />
                                  ) : (
                                    <span className="flex items-center justify-center w-8 h-8 bg-gray-500 text-white rounded-full text-sm">
                                      {reply.user?.name?.[0]}
                                    </span>
                                  )}
                                  <div>
                                    <p className="text-xs font-semibold">
                                      {reply.user?.name}
                                    </p>
                                    <p className="text-xs text-gray-700">
                                      {reply.text}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* hackathon detail card */}
          <div className="flex justify-center lg:self-start lg:sticky lg:top-0">
            <div className="mt-2 rounded-2xl overflow-hidden pb-4 shadow-xl w-[300px]">
              <div>
                <img src={data.image} alt="hackathon-image" />
              </div>
              <ul className="py-2 px-4 flex flex-col gap-2 border-b border-gray-300">
                <li className="flex justify-between font-semibold">
                  <span className="text-gray-500">Starts at:</span>
                  <span>{formatLocalMidnightTime(data.startDate)}</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span className="text-gray-500">Enrolled:</span>
                  <span>{data.participants.length}</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span className="text-gray-500">Certificate:</span>
                  <span>Available</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span className="text-gray-500">Duration:</span>
                  <span>{durationInHours} hrs</span>
                </li>
              </ul>
              <div className="flex justify-center bg-yellow-400 hover:bg-yellow-500 hover:scale-105 hover:shadow-lg duration-200 transition-transform text-white mx-6 mt-4 py-2 rounded-2xl cursor-pointer">
                <button
                  onClick={handleRegister}
                  className="font-semibold cursor-pointer"
                  disabled={isEnrollmentClosed}
                >
                  {isEnrollmentClosed ? "Registration Closed" : "Apply Now"}
                </button>
              </div>
              <div className="mt-2 flex justify-around">
                <span
                  onClick={() => setShare(true)}
                  className="bg-gray-200 py-1.5 px-3 rounded-xl text-gray-600 font-semibold cursor-pointer"
                >
                  <FontAwesomeIcon icon={faShareNodes} /> Share
                  {share && (
                    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#03594e85] via-[#03594e83] to-[#1ab69c88] flex justify-center items-center">
                      <div
                        className="bg-white py-5 px-8 flex flex-col rounded-2xl shadow-2xl border-r-6 border-b-6 border-yellow-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="flex justify-between">
                          <span className="text-lg">Share</span>
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="text-xl"
                            onClick={() => setShare(false)}
                          />
                        </p>
                        <p className="text-gray-400 text-sm">
                          Share this with your friends
                        </p>
                        <div className="relative flex gap-5 justify-center mt-5 border-b pb-10 border-gray-200">
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                              `${shareText} ${currentUrl}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] text-4xl"
                          >
                            <FontAwesomeIcon
                              icon={faWhatsapp}
                              className="hover:rotate-y-360 transition-transform duration-500"
                            />
                          </a>

                          <a
                            href={`https://t.me/share/url?url=${encodeURIComponent(
                              currentUrl
                            )}&text=${encodeURIComponent(shareText)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#229ED9] text-4xl"
                          >
                            <FontAwesomeIcon
                              icon={faTelegram}
                              className="hover:rotate-y-360 transition-transform duration-500"
                            />
                          </a>
                          <span className="absolute bg-white text-sm -bottom-2 px-2">
                            OR COPY LINK
                          </span>
                        </div>
                        <div className="mt-5 flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 max-w-xl pt-2">
                          <input
                            type="text"
                            value={currentUrl}
                            readOnly
                            className="flex-1 bg-transparent outline-none text-gray-500 text-sm truncate"
                          />

                          <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-gray-700 transition"
                          >
                            <FontAwesomeIcon
                              icon={copied ? faCheck : faCopy}
                              className="cursor-pointer"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </span>
                <span className="bg-gray-200 py-1.5 px-3 rounded-xl text-gray-600 font-semibold cursor-pointer">
                  <FontAwesomeIcon icon={faRobot} /> AI Chat
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live hackathons section */}
      <section>
        <div className="mt-8 pb-5">
          <div className="flex justify-between mx-4 lg:mx-8">
            <span className="font-bold lg:text-xl">
              100+ Latest Hackathons Live Now
            </span>
            <span
              className="font-semibold text-green-500 lg:text-xl cursor-pointer"
              onClick={() => navigate("/hackathons")}
            >
              View All <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </div>
          <div className="pl-4 lg:pl-8 flex gap-5 overflow-x-auto scrollbar-hide py-6">
            {allHackathons
              .filter((event) => event.status === "ongoing")
              .map((hackathon) => (
                <div
                  key={hackathon._id}
                  className="group cursor-pointer bg-white rounded-xl pb-2 shadow-lg border border-gray-200 max-w-[250px] shrink-0 overflow-hidden hover:scale-105 duration-200 transition-transform"
                >
                  <div className="overflow-hidden h-[150px]">
                    <img
                      src={hackathon.image}
                      alt="live-hackathon-image"
                      className="group-hover:scale-105 transition-transform duration-200 h-full w-full object-cover"
                    />
                  </div>
                  <div className="mx-2">
                    <h3 className="font-bold text-xl group-hover:text-green-900">
                      {hackathon.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">
                      <FontAwesomeIcon icon={faCalendarWeek} />{" "}
                      {formatDate(hackathon.startDate)}
                    </p>
                    <p className="text-gray-500 text-sm font-medium">
                      <FontAwesomeIcon icon={faPeopleGroup} />{" "}
                      {hackathon.participants.length}
                    </p>
                    <Link to={`/hackathons/${hackathon._id}`}>
                      <button className="mt-2 border border-gray-200 text-green-500 font-semibold w-full bg-gray-100 p-2 rounded-xl hover:bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] hover:text-white duration-200 hover:shadow-lg cursor-pointer">
                        Visit hackathon
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HackathonDetail;
