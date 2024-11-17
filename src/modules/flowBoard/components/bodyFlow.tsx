import React from "react";
import {FlowContent} from "../../../components";

const BodyFlow = () => {
  return (
    <div className="w-full min-h-screen text-black flex flex-col">
      <header className="p-6">
        <h1 className="text-4xl font-bold text-gray-700">Interactive Flow Editor</h1>
      </header>

      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000vh] h-[80vh] border border-gray-300 bg-white shadow-md rounded-lg">
          <FlowContent />
        </div>
      </div>
    </div>
  );
};

export default BodyFlow;
