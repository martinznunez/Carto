import React, {useCallback} from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  NodeTypes,
  ConnectionMode,
  Controls,
} from "@xyflow/react";
import {ConnectionPoint, SourceNode} from "../../../components";
import {CustomNodeData, NodeLabel} from "../domain/types";

const nodeTypes: NodeTypes = {
  custom: (props) => <ConnectionPoint {...props} label={props.data.label} />,
  source: (props) => <SourceNode {...props} label={props.data.label} />,
};

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
        id: `${Date.now()}`,
        type: nodeType,
        position,
        data: {label: labelText, connectionCount: "1"},
        measured: {width: 208, height: 118},
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="h-full bg-[#F7F9FB] border-2 border-dashed border-gray-300 relative"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Strict}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
