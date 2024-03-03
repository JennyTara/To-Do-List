import React from "react";
import "./Button.css";

type ButtonPropsTypes = {
  title: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  title,
  className,
  disabled,
  onClick,
}: ButtonPropsTypes) {
  return (
    <button
      key={title}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
