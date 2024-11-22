import React from "react";

interface PropsButton {
  valueText: string;
  handleClickButton: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<PropsButton> = ({valueText, handleClickButton, isDisabled}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={handleClickButton}
      className={`inline-block rounded text-white text-center text-[15px] py-2 px-4 w-[100px] transition-all duration-500 m-1 group ${
        isDisabled
          ? "bg-gray-400 cursor-not-allowed opacity-40"
          : "bg-[#3d405b] cursor-pointer hover:bg-[#4c4f6b]"
      }`}
    >
      <span className="relative inline-block transition-all duration-500 group-hover:pr-3">
        {valueText}
        <span className="absolute opacity-0 top-0 right-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:right-0">
          »
        </span>
      </span>
    </button>
  );
};

export default Button;
