import React, {useCallback} from "react";
import {v4 as uuid4} from "uuid";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  NodeTypes,
  ConnectionMode,
  Controls,
  Connection,
  EdgeChange,
  Edge,
} from "@xyflow/react";
import {ConnectionPoint, SourceNode} from "../../../components";
import {CustomNodeData, NodeLabel} from "../domain/types";

const nodeTypes: NodeTypes = {
  custom: (props) => (
    <ConnectionPoint {...props} label={props.data.label} isConnectable={props.isConnectable} />
  ),
  source: (props) => (
    <SourceNode {...props} label={props.data.label} isConnectable={props.isConnectable} />
  ),
};

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection | EdgeChange) => {
      if ("source" in params && "target" in params) {
        const newEdge: Edge = {
          id: uuid4(),
          source: params.source,
          target: params.target,
          type: "default",
        };

        setEdges((eds) => [...eds, newEdge]);

        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === params.source || node.id === params.target) {
              return {...node, isConnectable: false};
            }
            return node;
          }),
        );
      }
    },
    [setEdges, setNodes],
  );

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
        data: {label: labelText},
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
