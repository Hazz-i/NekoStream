import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AnimeSkeleton = ({ isLoading, length }) => {
  return (
    <>
      {isLoading &&
        Array.from({ length: length }).map((_, index) => (
          <div
            key={index}
            className="relative group">
            {/* CARD */}
            <Skeleton className="w-[145px] h-[200px]" />
            {/* END CARD */}
          </div>
        ))}
    </>
  );
};

export default AnimeSkeleton;
