import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/errorPage/404Error.png";

const Error404Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <img
        src={errorImg}
        alt="404"
        className="w-full max-w-md mb-6 object-contain"
      />

      <h1 className="text-4xl font-bold text-gray-900 mb-3">Page not found</h1>

      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <Link
        to="/"
        className="bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-semibold px-6 py-2 rounded-lg"
      >
        Go back home
      </Link>
    </div>
  );
};

export default Error404Page;
