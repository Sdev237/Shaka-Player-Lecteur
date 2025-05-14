import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
  variant = "default", 
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`lecteur-button lecteur-button-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
