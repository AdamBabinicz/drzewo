import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  EdgeProps,
} from "reactflow";

const MarriageEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY: sourceY - 30,
    targetX,
    targetY: targetY - 30,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: data?.color || "#888",
          strokeWidth: 2,
          strokeDasharray: "5,5",
          ...style,
        }}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${
              labelY - 10
            }px)`,
            fontSize: 12,
            background: "white",
            padding: "2px 4px",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {data?.label || ""}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default MarriageEdge;
