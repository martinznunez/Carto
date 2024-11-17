import React, {useCallback} from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const FlowContent: React.FC = () => {
  const initialNodes: Node[] = [
    {id: "1", position: {x: 100, y: 100}, data: {label: "Node 1"}},
    {id: "2", position: {x: 300, y: 200}, data: {label: "Node 2"}},
  ];

  const initialEdges: Edge[] = [{id: "e1-2", source: "1", target: "2"}];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{height: 800}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="w-full h-full"
      />
    </div>
  );
};

export default FlowContent;
