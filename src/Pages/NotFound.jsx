import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[93vh] text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600">Page Not Found</p>

      <Button
        className="mt-5"
        variant="secondary">
        <Link to="/neko-stream/home">Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
