import React from "react";
import './CoralsFooter.css';  
import CoraisRoot from "../../assets/coral.png";
import CoraisDark from "../../assets/coral-dark.png"


const CoralsFooter = ({ darkTheme }) => {
  const Corais = darkTheme ? CoraisDark : CoraisRoot


  return (
    <div className="corals-container">
      <img src={Corais} alt="Coral 1" className="coral" />
      <img src={Corais} alt="Coral 1" className="coral" />
      <img src={Corais} alt="Coral 1" className="coral" />
    </div>
  );
};

export default CoralsFooter;
