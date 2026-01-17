import React, { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timer === 0 || isPaused) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isPaused]);

  const handleStart = () => {
    setTimer(30);
    setCount(0);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    setTimer(0);
    setCount(0);
    setIsPaused(false);
  };

  return (
    <div className="home-container">
      <div className="home-timer">Timer: {timer}</div>
      <div className="home-count">{count}</div>

      <button
        className="home-btn-start btn"
        onClick={handleStart}
        disabled={timer !== 0}
      >
        Start
      </button>

      <button
        className="home-btn-click btn"
        onClick={() => setCount((prev) => prev + 1)}
        disabled={timer === 0 || isPaused}
      >
        Click Me
      </button>

      <button
        className="home-btn-pause btn"
        onClick={handlePauseResume}
        disabled={timer === 0}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>

      <button
        className="home-btn-stop btn"
        onClick={handleStop}
        disabled={timer === 0}
      >
        Stop
      </button>
    </div>
  );
}

export default HomePage;
