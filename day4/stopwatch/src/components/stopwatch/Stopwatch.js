import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [[m, s, ms], setTimer] = useState([0, 0, 0]);

  useEffect(() => {
    const timerId = setInterval(() => onStart(), 10);
    return () => clearInterval(timerId);
  });

  const onStart = () => {
    if (!isStarted) return;
    if (ms === 99 && s === 60) {
      setTimer([m + 1, 0, 0]);
    } else if (ms === 99) {
      setTimer([m, s + 1, 0]);
    } else {
      setTimer([m, s, ms + 1]);
    }
  };

  const onReset = () => {
    setIsStarted(false);
    setTimer([0, 0, 0]);
  };

  return (
    <div className="stopwatch">
      <div className="container">
        <div className="clock" onClick={() => setIsStarted(true)}>
          <div className="clock-border-ring">
            <div className="clock-border-ring-inner"></div>
          </div>
          <div className="clock-timer">
            {m < 10 && 0}
            {m}:{s < 10 && 0}
            {s}:{ms < 10 && 0}
            {ms}
          </div>
        </div>
        <div className="button-row">
          <Button onClickHandler={onReset}>Reset</Button>
          <Button onClickHandler={() => setIsStarted(!isStarted)}>
            {isStarted ? <>Pause</> : <>Start</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
