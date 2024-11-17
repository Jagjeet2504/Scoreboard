import React from "react";

const OversList = ({ overs }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-2">Overs</h2>
      {overs.map((over, index) => (
        <div
          key={index}
          className="mb-2 p-2 bg-white rounded-md shadow-sm border border-gray-300"
        >
          <h3 className="font-bold text-gray-700 mb-1">Over {index + 1}:</h3>
          <div className="flex gap-2">
            {over.map((ball, i) => (
              <span
                key={i}
                className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${
                  ball === 4
                    ? "bg-red-500 text-white"
                    : ball === 6
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {ball}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OversList;
