import {ConnectionType} from "../../../../context/types";

export const LAYER_TYPES = {
  POLYGON: "Polygon",
  MULTI_POLYGON: "MultiPolygon",
  POINT: "Point",
  MULTI_POINT: "MultiPoint",
  LINE_STRING: "LineString",
  MULTI_LINE_STRING: "MultiLineString",
};

export type MappedConnectionType = ConnectionType;
