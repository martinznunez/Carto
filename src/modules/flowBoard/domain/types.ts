export type HandleInputUrl = (value: string, nodeId: string) => void;

export interface InputsNodes {
  value: string;
  nodeId: string;
}
export interface Data {
  label: string;
  handleInputUrl: HandleInputUrl;
  [key: string]: string | HandleInputUrl;
}

export interface Position {
  x: number;
  y: number;
}

export interface CustomNodeData {
  id: string;
  type: string;
  data: Data;
  position: Position;
  measured: {
    width: number;
    height: number;
  };
  isConnectable: boolean;
}

export enum NodeLabel {
  Custom = "Layer",
  Source = "Source",
}
