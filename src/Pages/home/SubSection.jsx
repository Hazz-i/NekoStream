import React from "react";
import { NavLink } from "react-router-dom";
import MainComponent from "@/components/MainComponent";

const SubSection = ({ title, isLoading, animesData, length }) => {
  return (
    <span className="container bg-gray-900 rounded-lg pb-5">
      <div className="flex items-center justify-start gap-2">
        <NavLink
          to="/neko-stream/home"
          className="flex items-center justify-center pt-0.5">
          <i className="bx bx-chevron-left text-xl"></i>
        </NavLink>
        <h1 className="font-bold text-xl py-5">{title}</h1>
      </div>

      <MainComponent
        isLoading={isLoading}
        length={length}
        animesData={animesData}
        grid="grid-cols-1 sm:grid-cols-2 md:grid-cols-8"
      />
    </span>
  );
};

export default SubSection;
