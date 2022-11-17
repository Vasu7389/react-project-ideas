import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        ab<span>out</span>
      </div>
      <div className="about-info">
        <div className="about-left">
          I love to create something simple and clean using javascript with html
          and css.
        </div>
        <div className="about-right">
          <p>
            I'm Vasu Awasthi. I am a <span>Software Developer</span>. I have
            done Post Graduate Diploma in Advanced Computing from{" "}
            <span>CDAC</span>, Bangalore.
          </p>
          <p>
            I specialize in efficient <span>React</span> apps and
            <span> CSS</span> & <span>HTML</span> that just work across all
            platforms and browsers. I care deeply about building interfaces that
            are usable and pleasant for the most number of people possible.
          </p>
          <p>
            Right now, I’m excited about improving skill on writing automated
            <span> test cases</span> and becoming a <span>React senior</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
