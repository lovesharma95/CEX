import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type: "btn-primary" | "btn-neutral" | "btn-secondary" | "btn-link";
}

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
