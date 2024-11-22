import React, {createContext, useContext, useState} from "react";
import {CustomNodeData} from "../modules/flowBoard/domain/types";
import {Edge} from "@xyflow/react";
import {saveSessionStorage, getSessionStorage} from "../utils/storage/sessionStorage";
import {ConnectionType} from "./types";

interface MapConnectionsContextType {
  connections: ConnectionType[];
  addConnection: (_edges: Edge[], _nodes: CustomNodeData[]) => void;
}

const initialContextValue: MapConnectionsContextType = {
  connections: [],
  addConnection: (_edges: Edge[], _nodes: CustomNodeData[]) => {},
};

export const MapConnectionsContext = createContext<MapConnectionsContextType>(initialContextValue);

export const MapConnectionsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [connections, setConnections] = useState<MapConnectionsContextType["connections"]>(
    getSessionStorage("connections") || [],
  );

  const addConnection = (edges: Edge[], nodes: CustomNodeData[]) => {
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));

    const createConnections = () => {
      return edges.reduce<ConnectionType[]>((acc, edge) => {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);

        if (!sourceNode || !targetNode) {
          return acc;
        }

        const newConnection: ConnectionType = {
          id: edge.id,
          source: {
            id: edge.source,
            label: sourceNode.data.label,
            position: sourceNode.position,
            url: sourceNode.data.inputValue,
          },
          target: {
            id: edge.target,
            label: targetNode.data.label,
            position: targetNode.position,
          },
          type: edge.type || "default",
        };

        acc.push(newConnection);
        return acc;
      }, []);
    };

    const newConnections = createConnections();
    setConnections(newConnections);

    saveSessionStorage("connections", newConnections);
  };

  return (
    <MapConnectionsContext.Provider value={{connections, addConnection}}>
      {children}
    </MapConnectionsContext.Provider>
  );
};

export const useMapConnections = () => {
  const context = useContext(MapConnectionsContext);
  if (!context) {
    throw new Error("useMapConnections must be used within a MapConnectionsProvider");
  }
  return context;
};
