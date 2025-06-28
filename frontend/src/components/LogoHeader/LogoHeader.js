import React from "react";
import logoRoot from "../../assets/coralinIA.png";
import logoDark from "../../assets/coralinIA-dark.png"
import "./LogoHeader.css";

const LogoHeader = ({ darkTheme }) => {
  const logo = darkTheme ? logoDark : logoRoot

  return (
    <div className={`logo-header ${darkTheme ? "dark-mode": ''}`}>
      <img src={logo} alt="CoralinIA Logo" />
    </div>
  );
};

export default LogoHeader;
