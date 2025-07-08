import React, { useLayoutEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Edge,
  Node,
  NodeTypes,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import PersonNode from "./PersonNode";
import { Person } from "@shared/schema";
import dagre from "dagre";
import { useTheme } from "@/hooks/useTheme";

interface InteractiveTreeProps {
  allPeople: Person[];
  onPersonClick: (person: Person) => void;
  showGierczak: boolean;
  showOfiara: boolean;
  showDescendants: boolean;
  showMarriages: boolean;
}

type LayoutEdge = Edge & {
  minlen?: number;
  weight?: number;
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 240;
const nodeHeight = 100;

const nodeTypes: NodeTypes = {
  person: PersonNode,
};

const getLayoutedElements = (nodes: Node[], edges: LayoutEdge[]) => {
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 25, ranksep: 90 });

  nodes.forEach((node) => {
    const width = node.id.startsWith("union-") ? 0 : nodeWidth;
    const height = node.id.startsWith("union-") ? 0 : nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      minlen: edge.minlen || 1,
      weight: edge.weight || 1,
    });
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const n = dagreGraph.node(node.id);
    if (n) {
      node.targetPosition = Position.Top;
      node.sourcePosition = Position.Bottom;
      node.position = {
        x: n.x - n.width / 2,
        y: n.y - n.height / 2,
      };
    }
  });

  return { nodes };
};

export default function InteractiveTree({
  allPeople,
  onPersonClick,
  showGierczak,
  showOfiara,
  showDescendants,
  showMarriages,
}: InteractiveTreeProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { theme } = useTheme();

  useLayoutEffect(() => {
    if (!allPeople || allPeople.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const isDarkMode = theme === "dark";

    const descendantColor = isDarkMode
      ? "hsl(35, 70%, 75%)"
      : "hsl(0, 65%, 45%)";
    const marriageColor = isDarkMode
      ? "hsl(200, 60%, 70%)"
      : "hsl(220, 50%, 45%)";

    const allPersonNodes: Node[] = allPeople.map((person) => ({
      id: person.id.toString(),
      type: "person",
      data: {
        person,
        onClick: () => onPersonClick(person),
        family: person.family,
      },
      position: { x: 0, y: 0 },
    }));

    const unionNodes: Node[] = [];
    const layoutEdges: LayoutEdge[] = [];

    allPeople.forEach((person) => {
      const pid = person.id.toString();

      if (person.parentIds?.length === 2) {
        const [p1, p2] = person.parentIds.sort((a, b) => a - b);
        const coupleKey = `${p1}-${p2}`;
        const unionId = `union-${coupleKey}`;

        if (!unionNodes.find((u) => u.id === unionId)) {
          unionNodes.push({
            id: unionId,
            type: "default",
            position: { x: 0, y: 0 },
            data: {},
            className: "w-0 h-0",
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          });
          layoutEdges.push({
            id: `l-${p1}-${unionId}`,
            source: p1.toString(),
            target: unionId,
            weight: 2,
          });
          layoutEdges.push({
            id: `l-${p2}-${unionId}`,
            source: p2.toString(),
            target: unionId,
            weight: 2,
          });
        }
        layoutEdges.push({
          id: `l-${unionId}-${pid}`,
          source: unionId,
          target: pid,
          weight: 2,
        });
      } else if (person.parentIds?.length === 1) {
        const p = person.parentIds[0].toString();
        layoutEdges.push({
          id: `l-${p}-${pid}`,
          source: p,
          target: pid,
          weight: 2,
        });
      }

      person.spouseIds?.forEach((sid) => {
        if (person.id < sid) {
          layoutEdges.push({
            id: `rank-${person.id}-${sid}`,
            source: person.id.toString(),
            target: sid.toString(),
            minlen: 1,
            weight: 10,
          });
        }
      });
    });

    layoutEdges.push({
      id: "stacking-edge",
      source: "1",
      target: "133",
      minlen: 1,
      weight: 1,
    });

    const allNodesForLayout = [...allPersonNodes, ...unionNodes];
    const { nodes: positionedNodes } = getLayoutedElements(
      allNodesForLayout,
      layoutEdges
    );

    const visibleIds = new Set(
      allPeople
        .filter(
          (p) =>
            (p.family === "gierczak" && showGierczak) ||
            (p.family === "ofiara" && showOfiara)
        )
        .map((p) => p.id.toString())
    );

    const allPeopleMap = new Map(allPeople.map((p) => [p.id, p]));
    allPeople.forEach((p) => {
      if (p.parentIds?.length === 2) {
        const p1 = allPeopleMap.get(p.parentIds[0]);
        const p2 = allPeopleMap.get(p.parentIds[1]);
        if (p1 && p2 && p1.family !== p2.family) {
          if (
            visibleIds.has(p1.id.toString()) ||
            visibleIds.has(p2.id.toString())
          ) {
            visibleIds.add(p.id.toString());
            visibleIds.add(p1.id.toString());
            visibleIds.add(p2.id.toString());
          }
        }
      }
    });

    const finalNodes = positionedNodes.filter(
      (node) => !node.id.startsWith("union-") && visibleIds.has(node.id)
    );

    const finalEdges: Edge[] = [];

    if (showDescendants) {
      allPeople.forEach((p) => {
        p.parentIds?.forEach((par) => {
          const cid = p.id.toString(),
            pid = par.toString();
          if (visibleIds.has(cid) && visibleIds.has(pid)) {
            finalEdges.push({
              id: `s-${pid}-${cid}`,
              source: pid,
              target: cid,
              type: "smoothstep",
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: descendantColor,
              },
              style: { stroke: descendantColor, strokeWidth: 2 },
            });
          }
        });
      });
    }

    if (showMarriages) {
      const positionedNodesMap = new Map(finalNodes.map((n) => [n.id, n]));
      allPeople.forEach((p) => {
        p.spouseIds?.forEach((sid) => {
          const pidStr = p.id.toString();
          const sidStr = sid.toString();
          if (p.id < sid && visibleIds.has(pidStr) && visibleIds.has(sidStr)) {
            const sourceNode = positionedNodesMap.get(pidStr);
            const targetNode = positionedNodesMap.get(sidStr);

            if (sourceNode && targetNode) {
              const isSourceOnLeft =
                sourceNode.position.x < targetNode.position.x;

              finalEdges.push({
                id: `m-${pidStr}-${sidStr}`,
                type: "default",
                source: pidStr,
                target: sidStr,
                sourceHandle: isSourceOnLeft ? Position.Right : Position.Left,
                targetHandle: isSourceOnLeft ? Position.Left : Position.Right,
                zIndex: 1,
                style: {
                  stroke: marriageColor,
                  strokeWidth: 2,
                  strokeDasharray: "5,5",
                },
              });
            }
          }
        });
      });
    }

    setNodes(finalNodes);
    setEdges(finalEdges);
  }, [
    allPeople,
    onPersonClick,
    showGierczak,
    showOfiara,
    showDescendants,
    showMarriages,
    setNodes,
    setEdges,
    theme,
  ]);

  return (
    <div className="w-full h-full bg-stone-50 dark:bg-card">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        className="react-flow-heritage z-10"
      >
        <Background />
        <Controls />
        <MiniMap
          className="!bg-background border heritage-border"
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            if (node.data?.family === "gierczak")
              return "hsl(var(--heritage-burgundy))";
            if (node.data?.family === "ofiara")
              return "hsl(var(--heritage-teal))";
            return "hsl(var(--muted))";
          }}
        />
      </ReactFlow>
    </div>
  );
}
