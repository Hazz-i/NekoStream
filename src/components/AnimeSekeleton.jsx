import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";

const AnimeSkeleton = ({ isLoading, length }) => {
  const [itemsToDisplay, setItemsToDisplay] = useState(length.sm);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToDisplay(length.lg);
      } else {
        setItemsToDisplay(length.sm);
      }
    };

    // Initialize the display size on component mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [length.sm, length.lg]);

  return (
    isLoading &&
    Array.from({ length: itemsToDisplay }).map((_, index) => (
      <div
        key={index}
        className="relative group">
        {/* CARD */}
        <Skeleton className="w-[130px] h-[175px] lg:w-[145px] lg:h-[200px]" />
        {/* END CARD */}
      </div>
    ))
  );
};

export default AnimeSkeleton;
