import React from "react";
import { NavLink } from "react-router-dom";
import MainComponent from "@/components/MainComponent";

const SubSection = ({ title, isLoading, animesData, length }) => {
  return (
    <span className="bg-gray-900 rounded-lg pb-5">
      <div className="ps-5 flex items-center justify-start gap-1 lg:gap-2">
        <NavLink
          to="/neko-stream/home"
          className="flex items-center justify-center pt-0 lg:pt-0.5">
          <i className="bx bx-chevron-left text-lg lg:text-xl"></i>
        </NavLink>
        <h1 className="font-bold text-lg lg:text-xl py-5">{title}</h1>
      </div>

      <MainComponent
        isLoading={isLoading}
        length={length}
        animesData={animesData}
        grid="grid-cols-2 md:grid-cols-8"
      />
    </span>
  );
};

export default SubSection;
