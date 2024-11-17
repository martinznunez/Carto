import React, {useState} from "react";
import {Sidebar} from "./modules/sidebar";
import BodyFlow from "./modules/flowBoard/components/bodyFlow";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "w-14" : "w-0"} bg-gray-800 text-white`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
      </div>

      <div
        className={`flex-1 flex justify-center items-start bg-gray-100 overflow-hidden ${
          isSidebarOpen ? "pl-60" : "pl-20"
        }`}
      >
        <div className="w-full h-full p-3 overflow-hidden">
          <BodyFlow />
        </div>
      </div>
    </div>
  );
}

export default App;
