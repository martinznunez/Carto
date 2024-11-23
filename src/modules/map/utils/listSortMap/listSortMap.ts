import {MappedConnectionType} from "../layerTypes";

export const listSortMap = (connections: MappedConnectionType[]) => {
  const sortedConnections = connections.sort((a, b) => {
    return b.target.position.y - a.target.position.y;
  });

  return sortedConnections;
};
