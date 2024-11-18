import React from "react";

interface CardProps {
  label: string;
  nodeType: "source" | "custom";
}

const Card: React.FC<CardProps> = ({label, nodeType}) => {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
  };

  const nodeConfigurations = {
    source: (
      <>
        <div className="w-full h-6 p-1 text-xs border border-gray-300 rounded-md bg-transparent"></div>
        <div className="absolute top-1/2 right-[-8px] transform -translate-y-1/2 bg-white w-3 h-3 border-t-2 border-r-2 border-gray-300 rounded-full" />
      </>
    ),
    custom: (
      <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 bg-white w-3 h-3 border-t-2 border-l-2 border-gray-300 rounded-full" />
    ),
  };

  return (
    <div
      className="w-full min-w-[200px] p-4 mb-4 bg-white text-black rounded shadow cursor-pointer relative"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="mb-2">{label}</div>
      {nodeConfigurations[nodeType] || null}
    </div>
  );
};

export default Card;
