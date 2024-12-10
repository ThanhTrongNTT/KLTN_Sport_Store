import React from "react";
import { useNavigate } from "react-router-dom";

const BreadCrumb = () => {
  const navigate = useNavigate();
  return (
    <nav aria-label="breadcrumb" className="w-max">
      <ul className="flex flex-wrap items-center w-full px-4 py-2 rounded-md bg-blue-gray-50 bg-opacity-60">
        <li
          className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500"
          onClick={() => navigate("/")}
        >
          <a className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </a>
          <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
            /
          </span>
        </li>
        <li
          className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500"
          onClick={() => navigate("/cart")}
        >
          <a className="opacity-60">
            <span>Components</span>
          </a>
          <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
            /
          </span>
        </li>
        <li
          className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500"
          onClick={() => navigate("/order")}
        >
          <a>Order</a>
        </li>
      </ul>
    </nav>
  );
};

export default BreadCrumb;
