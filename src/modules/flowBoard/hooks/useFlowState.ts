import {useCallback} from "react";
import {useNodesState, useEdgesState, Edge, Connection, EdgeChange} from "@xyflow/react";
import {v4 as uuid4} from "uuid";
import {CustomNodeData} from "../domain/types";
import {getSessionStorage, saveSessionStorage} from "../../../utils/storage/sessionStorage";

const useFlowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>(
    getSessionStorage("nodes") || [],
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(getSessionStorage("edges") || []);

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

  const handleSaveSessionStorage = () => {
    saveSessionStorage("nodes", nodes);
    saveSessionStorage("edges", edges);
  };

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    handleSaveSessionStorage,
  };
};

export default useFlowState;
