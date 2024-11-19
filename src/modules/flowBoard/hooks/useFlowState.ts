import {useCallback} from "react";
import {useNodesState, useEdgesState, Edge, Connection, EdgeChange} from "@xyflow/react";
import {v4 as uuid4} from "uuid";
import {CustomNodeData} from "../domain/types";

const useFlowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const updateIsConnectable = useCallback(
    (nodeId: string, value: boolean) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === nodeId ? {...node, isConnectable: value} : node)),
      );
    },
    [setNodes],
  );

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
        updateIsConnectable(params.source, false);
        updateIsConnectable(params.target, false);
      }
    },
    [setEdges, updateIsConnectable],
  );

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
  };
};

export default useFlowState;
