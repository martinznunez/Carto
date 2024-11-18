import React from "react";
import {Card} from "../../../components";

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, toggleMenu}) => {
  return (
    <div className={`relative ${isOpen ? "w-60" : "w-16"} transition-all duration-300`}>
      <button
        className="absolute top-4 left-4 z-30 p-2 text-white bg-blue-600 rounded-md shadow-md"
        onClick={toggleMenu}
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out border-r border-white z-20`}
      >
        <div className="p-4 mt-16 overflow-y-auto h-full w-full">
          <Card label="Source Node" nodeType="source" />
          <Card label="Layer" nodeType="custom" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
