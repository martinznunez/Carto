import React from "react";
import {NodeTypes} from "@xyflow/react";
import {ConnectionPoint, SourceNode} from "../../../components";

const NodeTypesComponent: NodeTypes = {
  custom: (props) => (
    <ConnectionPoint {...props} label={props.data.label} isConnectable={props.isConnectable} />
  ),
  source: (props) => (
    <SourceNode
      {...props}
      label={props.data.label}
      isConnectable={props.isConnectable}
      nodeId={props.id}
      handleInputUrl={props.data.handleInputUrl}
    />
  ),
};

export default NodeTypesComponent;
