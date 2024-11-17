import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const socketURL = "http://localhost:3000";
const UpdateScore = ({ updateScore }) => {
  const [runs, setRuns] = useState(0);
  const [wicket, setWicket] = useState(false);
  const [extras, setExtras] = useState({ wide: false, noBall: false });

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = socketIOClient(socketURL);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const handleRunChange = (e) => {
    setRuns(parseInt(e.target.value, 10) || 0);
  };
  const handleWicketChange = (e) => {
    setWicket(e.target.checked);
  };
  const handleExtrasChange = (e) => {
    setExtras({ ...extras, [e.target.name]: e.target.checked });
  };

  const handleUpdateScore = () => {
    updateScore(runs, wicket, extras);
    const scoreData = { runs, wicket, extras };
    if (socket) {
      socket.emit("updateScore", scoreData);
    }
    setRuns(0);
    setWicket(false);
    setExtras({ wide: false, noBall: false });
  };

  return (
    <div className="mt-4">
      {/* <div className="border-2 border-gray-300 p-4 rounded-lg shadow-md bg-white max-w-sm mx-auto">
        <label className="text-gray-700 font-semibold">
          Runs:
          <input
            className="border border-gray-300 w-24 ml-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            type="number"
            value={runs}
            onChange={handleRunChange}
            min={0}
            max={6}
            placeholder="Enter Run"
          />
        </label>
      </div> */}
      <div className="flex flex-col align-center justify-center gap-2 border-2 border-gray-300 p-4 rounded-lg shadow-md bg-white max-w-sm mx-auto">
        <h1 className="ml-2">{runs}</h1>
        <div className="flex gap-2 align-center justify-center">
          {[0, 1, 2, 3, 4, 5, 6].map((run, i) => {
            return (
              <div
                onClick={() => setRuns(run)}
                className={`w-[50px] h-[50px] flex items-center justify-center hover:scale-110 transition-transform duration-50 rounded-[100%] ${
                  run === 4
                    ? "bg-white border-2 border-red-500"
                    : run === 6
                    ? "bg-green-500"
                    : "bg-slate-400"
                }`}
                key={i}
              >
                <h1
                  className={`${
                    run === 4
                      ? "text-red-500"
                      : run === 6
                      ? "text-white"
                      : "text-white"
                  } font-bold`}
                >
                  {run}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
          <span className="block text-gray-700 font-semibold mb-2">
            Wicket:
          </span>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={wicket}
              onChange={handleWicketChange}
              className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span>Wicket</span>
          </label>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
          <span className="block text-gray-700 font-semibold mb-2">
            Extras:
          </span>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="wide"
              checked={extras.wide}
              onChange={handleExtrasChange}
              className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span>Wide Ball</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="noBall"
              checked={extras.noBall}
              onChange={handleExtrasChange}
              className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span>No Ball</span>
          </label>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleUpdateScore}
            className="mt-4  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            Update Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateScore;
