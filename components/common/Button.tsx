import React from "react";
import { ButtonProps } from "../../interfaces";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  const baseStyle = "px-4 py-2 rounded text-white font-semibold transition w-full";
  const variantStyle =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-gray-600 hover:bg-gray-700";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle}`}
    >
      {label}
    </button>
  );
};

export default Button;
