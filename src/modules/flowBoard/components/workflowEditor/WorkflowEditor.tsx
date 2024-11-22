import React, {useCallback} from "react";
import {ReactFlow, Controls, Background, ConnectionMode} from "@xyflow/react";
import {useNavigate} from "react-router-dom";

import useFlowState from "../../hooks/useFlowState";
import {CustomNodeData, NodeLabel} from "../../domain/types";

import {v4 as uuid4} from "uuid";
import NodeTypesComponent from "../nodeTypesComponent/NodeTypesComponent";
import {Button} from "../../../../components";
import {ROUTES} from "../../../../routes/constants";

import {useMapConnections} from "../../../../context/MapConnectionsContext";
import {validationsEdges} from "./validations/validations";

const WorkflowEditor = () => {
  const navigate = useNavigate();
  const {addConnection} = useMapConnections();

  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    handleSaveSessionStorage,
  } = useFlowState();

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
        data: {label: labelText, inputValue: ""},
        measured: {width: 208, height: 118},
        isConnectable: true,
        selected: false,
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const disabledButton: boolean = validationsEdges(edges, nodes);

  const handleClickButton = () => {
    addConnection(edges, nodes);
    handleSaveSessionStorage();
    navigate(ROUTES.MAP);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="h-full bg-[#F7F9FB] border-2 border-dashed border-gray-300 relative flex flex-col items-end"
    >
      <div className="mr-2 mt-1">
        <Button
          isDisabled={!disabledButton}
          handleClickButton={handleClickButton}
          valueText="Map"
        />
        <Button handleClickButton={handleSaveSessionStorage} valueText="save" />
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
