import {Handle, Position} from "@xyflow/react";
import React from "react";
import "@xyflow/react/dist/style.css";

interface SourceProps {
  isConnectable: boolean;
  label: string;
}

const ConnectionPoint: React.FC<SourceProps> = ({isConnectable, label}) => {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-2 w-40 shadow-sm flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-2 w-full">
        <label htmlFor="handle" className="block text-xs font-semibold text-gray-700 mb-1">
          {label}
        </label>
      </div>

      <div className="flex flex-col items-center space-y-1">
        <Handle
          id="a"
          type="source"
          position={Position.Left}
          className="bg-green-500 rounded-full w-3 h-3 shadow-sm"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
};

export default ConnectionPoint;
