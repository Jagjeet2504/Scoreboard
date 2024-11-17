import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import OversList from "./OversList";
import Scoreboard from "./Scoreboard";
import UserOverList from "./UserOverList";

const socketURL = "https://scoreboard-server.onrender.com";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);

  const [overs, setOvers] = useState([]);

  const calculateOvers = () => {
    const overs = Math.floor(balls / 6);
    const ballsInOver = balls % 6;
    return `${overs}.${ballsInOver}`;
  };

  useEffect(() => {
    const socket = socketIOClient(socketURL);

    socket.on("liveScore", (receivedData) => {
      setData(receivedData);
      // alert(receivedData);
      console.log(receivedData);
      updateScore(receivedData.runs, receivedData.wicket, receivedData.extras);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // const updateScore = (runsScored, isWicket, extras) => {
  //   if (wickets >= 10) {
  //     alert("Innings Over");
  //     return;
  //   }

  //   const isExtra = extras.wide || extras.noBall;
  //   const ballType = isExtra ? 0 : 1; // 0 for extra, 1 for a valid ball

  //   // Update runs
  //   const additionalRuns = isExtra ? runsScored + 1 : runsScored;
  //   setRuns((prevRuns) => prevRuns + additionalRuns);

  //   // Update balls and overs only if it's a valid ball
  //   if (ballType === 1) {
  //     setBalls((prevBalls) => prevBalls + 1);

  //     setOvers((prevOvers) => {
  //       const updatedOvers = [...prevOvers];
  //       const currentOverIndex = Math.floor(balls / 6);

  //       // If a new over starts, initialize it
  //       if (!updatedOvers[currentOverIndex]) {
  //         updatedOvers[currentOverIndex] = [];
  //       }

  //       // Add the ball's runs to the current over
  //       updatedOvers[currentOverIndex] = [
  //         ...updatedOvers[currentOverIndex],
  //         runsScored,
  //       ];

  //       return updatedOvers;
  //     });
  //   }

  //   // Update wickets
  //   if (isWicket) {
  //     setWickets((prevWickets) => prevWickets + 1);
  //     if (wickets + 1 >= 10) {
  //       alert("Innings Over");
  //     }
  //   }
  // };

  const updateScore = (runsScored, isWicket, extras) => {
    console.log("User: ", runsScored, isWicket, extras);
    if (wickets >= 10) {
      alert("Innings Over");
      return;
    }

    const isExtra = extras.wide || extras.noBall;
    const ballType = isExtra ? 0 : 1; // 0 for extra, 1 for a valid ball

    // Update runs
    const additionalRuns = isExtra ? runsScored + 1 : runsScored;
    setRuns((prevRuns) => prevRuns + additionalRuns);

    // Update balls and overs only if it's a valid ball
    if (ballType === 1) {
      setBalls((prevBalls) => prevBalls + 1);

      setOvers((prevOvers) => {
        const updatedOvers = [...prevOvers];
        const currentOverIndex = Math.floor(balls / 6);

        // If a new over starts, initialize it
        if (!updatedOvers[currentOverIndex]) {
          updatedOvers[currentOverIndex] = [];
        }

        // Add the ball's runs to the current over
        updatedOvers[currentOverIndex] = [
          ...updatedOvers[currentOverIndex],
          runsScored,
        ];

        return updatedOvers;
      });
    }

    // Update wickets
    if (isWicket) {
      setWickets((prevWickets) => prevWickets + 1);
      if (wickets + 1 >= 10) {
        alert("Innings Over");
      }
    }
  };

  return (
    <div className="App">
      <div className="mt-2">
        <h1 className="text-2xl font-semibold underline text-center">
          Cricket Scorecard
        </h1>
      </div>
      <div className="flex justify-center items-center mt-2">
        <Scoreboard runs={runs} wickets={wickets} overs={calculateOvers()} />
      </div>
      <UserOverList overs={overs} />
      {/* <OversList overs={overs} /> */}
      {/* <UpdateScore updateScore={updateScore} /> */}
    </div>
  );
};

export default Dashboard;
