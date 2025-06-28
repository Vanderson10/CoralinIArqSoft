import React from "react";
import { Button } from "primereact/button";
import "./ToogleTheme.css";

const ToogleTheme = ({ darkTheme, toggleTheme }) => {

  return (
    <div className="theme-toggle">
      <Button
        icon={darkTheme ? "pi pi-moon" : "pi pi-sun"}
        className="p-button-rounded p-button-secondary "
        style={{ backgroundColor: '#D93254', borderColor: '#D93254' }}
        onClick={toggleTheme}
      />
    </div>
  );
};

export default ToogleTheme;
