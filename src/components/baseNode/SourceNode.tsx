import {Handle, Position} from "@xyflow/react";
import React, {useState} from "react";
import "@xyflow/react/dist/style.css";

interface SourceProps {
  isConnectable: boolean;
  label: string;
  nodeId: string;
  handleInputUrl: (value: string, nodeId: string) => void;
}

function SourceNode({label, isConnectable, nodeId, handleInputUrl}: SourceProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value.trim());
  };

  const onBlur = () => {
    handleInputUrl(inputValue, nodeId);
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-2 w-40 shadow-sm flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-2 w-full">
        <label htmlFor="text" className="block text-xs font-semibold text-gray-700 mb-1">
          {label}
        </label>
        <input
          id="text"
          name="text"
          onBlur={onBlur}
          placeholder="URL"
          onChange={onChange}
          className="w-full p-1 text-xs border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-0"
          autoComplete={"off"}
        />
      </div>

      <div className="flex flex-col items-center space-y-1">
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          className="bg-green-500 rounded-full w-3 h-3 shadow-sm"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default SourceNode;
