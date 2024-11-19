import React from "react";

interface PropsButton {
  valueText: string;
  handleClickButton: () => void;
}

const Button: React.FC<PropsButton> = ({valueText, handleClickButton}) => {
  return (
    <button
      onClick={handleClickButton}
      className="inline-block rounded bg-[#3d405b] border-none text-white text-center text-[15px] py-2 px-4 w-[100px] transition-all duration-500 cursor-pointer m-1 group"
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
