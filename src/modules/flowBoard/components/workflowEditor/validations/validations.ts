import {Edge} from "@xyflow/react";
import {CustomNodeData} from "../../../domain/types";

export const validationsEdges = (edges: Edge[], nodes: CustomNodeData[]) => {
  const atLeastOneNodeValidAndConnected = nodes.some((node) => {
    const hasValidInput = node.data?.inputValue?.trim() !== "";

    const isConnected = edges.some((edge) => edge.source === node.id || edge.target === node.id);

    return hasValidInput && isConnected;
  });

  const hasEdges = edges.length >= 1;

  return hasEdges && atLeastOneNodeValidAndConnected;
};
