export interface ConnectionType {
  id: string;
  source: {
    id: string;
    label: string;
    position: {x: number; y: number};
    url: string;
  };
  target: {id: string; label: string; position: {x: number; y: number}};
  type: string;
}
