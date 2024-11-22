import React, {useState} from "react";
import {useReactFlow} from "@xyflow/react";

interface InputProps {
  placeholder: string;
  nodeId: string;
  initialValue: string;
}

const Input: React.FC<InputProps> = ({placeholder, nodeId, initialValue}) => {
  const {setNodes} = useReactFlow();
  const [inputValue, setInputValue] = useState<string>(initialValue || "");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value.trim();
    setInputValue(newValue);

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              inputValue: newValue,
            },
          };
        }
        return node;
      }),
    );
  };

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full p-1 text-xs border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-0"
      autoComplete="off"
    />
  );
};

export default Input;
