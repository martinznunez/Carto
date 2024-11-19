import React, {useState, useCallback} from "react";
import {ReactFlow, Controls, Background, ConnectionMode} from "@xyflow/react";
import {useNavigate} from "react-router-dom";

import useFlowState from "../hooks/useFlowState";
import {HandleInputUrl, CustomNodeData, InputsNodes, NodeLabel} from "../domain/types";

import {v4 as uuid4} from "uuid";
import NodeTypesComponent from "./NodeTypesComponent";
import {Button} from "../../../components";
import {ROUTES} from "../../../routes/constants";

const WorkflowEditor = () => {
  const navigate = useNavigate();
  const {nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect} =
    useFlowState();
  const [urls, setUrls] = useState<InputsNodes[]>([]);

  const handleInputUrl: HandleInputUrl = (value, nodeId) => {
    if (value !== "") {
      setUrls((prevUrls) => {
        const updatedUrls = prevUrls.filter((url) => url.nodeId !== nodeId);
        return [...updatedUrls, {nodeId, value}];
      });
    } else {
      setUrls((prevUrls) => prevUrls.filter((url) => url.nodeId !== nodeId));
    }
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");
      const target = event.target as HTMLElement;
      const position = {
        x: event.clientX - target.getBoundingClientRect().left,
        y: event.clientY - target.getBoundingClientRect().top,
      };

      const labelText = nodeType === "custom" ? NodeLabel.Custom : NodeLabel.Source;

      const newNode: CustomNodeData = {
        id: uuid4(),
        type: nodeType,
        position,
        data: {label: labelText, handleInputUrl},
        measured: {width: 208, height: 118},
        isConnectable: true,
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleClickButton = () => navigate(ROUTES.MAP);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="h-full bg-[#F7F9FB] border-2 border-dashed border-gray-300 relative flex flex-col items-end"
    >
      <div className="mr-4 mt-4">
        <Button handleClickButton={handleClickButton} valueText="Map" />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NodeTypesComponent}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
