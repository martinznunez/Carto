export interface Data {
  label: string;
  [key: string]: string;
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
