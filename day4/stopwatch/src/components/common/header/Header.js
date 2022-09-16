import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const [header, setHeader] = useState(pathname);

  useEffect(() => {
    setHeader(pathname);
  }, [pathname]);

  return (
    <div className="header">
      <Link to="/" className={header === "/" ? "active" : ""}>
        Stopwatch
      </Link>
      <Link to="/timer" className={header === "/timer" ? "active" : ""}>
        Timer
      </Link>
    </div>
  );
};

export default Header;
