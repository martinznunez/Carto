export interface InputsNodes {
  url: string;
  nodeId: string;
}
export interface Data {
  label: string;
  [key: string]: string;
  inputValue: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface CustomNodeData {
  selected: boolean;
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
