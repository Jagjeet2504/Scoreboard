import React from "react";

const Scoreboard = ({ runs, wickets, overs }) => {
  return (
    <div className="w-[40%] flex flex-col border-2 rounded-[12px] p-2">
      <div className="flex">
        <span className="font-bold">Score:</span>{" "}
        <span className="ml-2 font-bold">
          {runs}/{wickets}
        </span>
        <p className="text-center ml-10">Overs: </p>
        <p className="ml-2">{overs}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
