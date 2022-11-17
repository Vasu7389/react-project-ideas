import React from "react";
import "./ProjectPage.css";

const ProjectPage = () => {
  return (
    <div className="project-container">
      <div className="project-header">
        <span>pro</span>jects
      </div>
      <div className="project-list">
        <div className="project">
          <p>E-commerce</p>
          <p>Shoppinn</p>
          <p>
            <span>2022</span>
            <a href="https://www.codinn.dev/article/ecommerce-website-in-reactjs">
              Tap to view
            </a>
          </p>
        </div>
        <div className="project">
          <p>Clock</p>
          <p>Stopwatch & Counter</p>
          <p>
            <span>2022</span>
            <a href="https://www.codinn.dev/article/stopwatch-timer-in-reactjs">
              Tap to view
            </a>
          </p>
        </div>
        <div className="project">
          <p>Game</p>
          <p>Snake Game</p>
          <p>
            <span>2020</span>
            <a href="https://www.codinn.dev/article/snake-game-in-reactjs">
              Tap to view
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
