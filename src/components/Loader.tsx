import React from "react";
import { Hourglass } from "react95";

const FullScreenLoader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Hourglass className="w-32 h-32" />
    </div>
  );
};

export default FullScreenLoader;
