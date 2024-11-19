import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Sidebar} from "../../modules/sidebar";
import {WorkflowEditor} from "../../modules/flowBoard";

function FlowBoardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <div className={`transition-all duration-300 w-0 bg-gray-800 text-white`}>
          <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
        </div>

        <div
          className={`flex-1 flex justify-center items-start bg-gray-100 overflow-hidden ${
            isSidebarOpen ? "pl-60" : "pl-20"
          }`}
        >
          <div className="w-full h-full p-3 overflow-hidden">
            <WorkflowEditor />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default FlowBoardLayout;
