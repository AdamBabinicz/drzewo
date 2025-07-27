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
  focusedPersonId: number;
  onPersonClick: (person: Person) => void;
  showGierczak: boolean;
  showOfiara: boolean;
  showDescendants: boolean;
  showMarriages: boolean;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 240;
const nodeHeight = 100;

// --- KLUCZOWA POPRAWKA ---
// Definicja `nodeTypes` została wyniesiona POZA komponent.
// Jest teraz tworzona tylko raz, a nie przy każdym renderowaniu.
const nodeTypes: NodeTypes = {
  person: PersonNode,
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 50, ranksep: 90 });

  nodes.forEach((node) => {
    const width = node.id.startsWith("union-") ? 0 : nodeWidth;
    const height = node.id.startsWith("union-") ? 0 : nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    if (nodeWithPosition) {
      node.targetPosition = Position.Top;
      node.sourcePosition = Position.Bottom;
      node.position = {
        x:
          nodeWithPosition.x -
          (node.id.startsWith("union-") ? 0 : nodeWidth / 2),
        y:
          nodeWithPosition.y -
          (node.id.startsWith("union-") ? 0 : nodeHeight / 2),
      };
    }
  });

  return { nodes, edges };
};

export default function InteractiveTree({
  allPeople,
  focusedPersonId,
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
    const personMap = new Map(allPeople.map((p) => [p.id, p]));
    const focusedPerson = personMap.get(focusedPersonId);
    if (!focusedPerson) return;

    const familyUnitIds = new Set<number>();

    const getFamilyUnit = (personId: number) => {
      const person = personMap.get(personId);
      if (!person || familyUnitIds.has(personId)) return;

      familyUnitIds.add(personId);
      person.parentIds?.forEach((pId) => familyUnitIds.add(pId));
      person.spouseIds?.forEach((spId) => familyUnitIds.add(spId));
      person.childIds?.forEach((cId) => familyUnitIds.add(cId));
    };

    getFamilyUnit(focusedPersonId);

    const peopleInUnit = Array.from(familyUnitIds)
      .map((id) => personMap.get(id))
      .filter((p): p is Person => p !== undefined);

    const visiblePeople = peopleInUnit.filter((p) => {
      if (
        (p.family === "gierczak" && showGierczak) ||
        (p.family === "ofiara" && showOfiara)
      ) {
        return true;
      }
      return p.spouseIds?.some((spId) => {
        const spouse = personMap.get(spId);
        if (!spouse) return false;
        const spouseFamily = spouse.family;
        return (
          (spouseFamily === "gierczak" && showGierczak) ||
          (spouseFamily === "ofiara" && showOfiara)
        );
      });
    });

    const visibleFinalIds = new Set(visiblePeople.map((p) => p.id));

    const isDarkMode = theme === "dark";
    const descendantColor = isDarkMode
      ? "hsl(35, 70%, 75%)"
      : "hsl(0, 65%, 45%)";
    const marriageColor = isDarkMode
      ? "hsl(200, 60%, 70%)"
      : "hsl(220, 50%, 45%)";

    const personNodes: Node[] = visiblePeople.map((person) => ({
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
    const layoutEdges: Edge[] = [];

    visiblePeople.forEach((person) => {
      if (person.parentIds && person.parentIds.length === 2) {
        const [p1, p2] = person.parentIds.sort((a, b) => a - b);

        if (visibleFinalIds.has(p1) && visibleFinalIds.has(p2)) {
          const unionKey = `union-${p1}-${p2}`;
          if (!unionNodes.find((n) => n.id === unionKey)) {
            unionNodes.push({
              id: unionKey,
              type: "default",
              data: {},
              position: { x: 0, y: 0 },
              className: "w-0 h-0 !border-none",
            });
            layoutEdges.push({
              id: `l-${p1}-${unionKey}`,
              source: p1.toString(),
              target: unionKey,
            });
            layoutEdges.push({
              id: `l-${p2}-${unionKey}`,
              source: p2.toString(),
              target: unionKey,
            });
          }
          layoutEdges.push({
            id: `l-${unionKey}-${person.id}`,
            source: unionKey,
            target: person.id.toString(),
          });
        }
      } else if (person.parentIds && person.parentIds.length === 1) {
        const pId = person.parentIds[0];
        if (visibleFinalIds.has(pId)) {
          layoutEdges.push({
            id: `l-${pId}-${person.id}`,
            source: pId.toString(),
            target: person.id.toString(),
          });
        }
      }
    });

    const allLayoutNodes = [...personNodes, ...unionNodes];
    const { nodes: positionedNodes, edges: positionedEdges } =
      getLayoutedElements(allLayoutNodes, layoutEdges);

    const finalNodes = positionedNodes;

    const finalEdges: Edge[] = [];
    if (showDescendants) {
      positionedEdges.forEach((edge) => {
        finalEdges.push({
          ...edge,
          id: `e-${edge.id}`,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed, color: descendantColor },
          style: { stroke: descendantColor, strokeWidth: 1.5 },
          zIndex: 0,
        });
      });
    }

    if (showMarriages) {
      const positionedNodesMap = new Map(finalNodes.map((n) => [n.id, n]));
      visiblePeople.forEach((p) => {
        p.spouseIds?.forEach((sid) => {
          if (p.id < sid && visibleFinalIds.has(sid)) {
            const sourceNode = positionedNodesMap.get(p.id.toString());
            const targetNode = positionedNodesMap.get(sid.toString());
            if (sourceNode && targetNode) {
              const isSourceOnLeft =
                sourceNode.position.x < targetNode.position.x;
              finalEdges.push({
                id: `m-${p.id}-${sid}`,
                type: "default",
                source: p.id.toString(),
                target: sid.toString(),
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
    focusedPersonId,
    onPersonClick,
    setNodes,
    setEdges,
    theme,
    showMarriages,
    showDescendants,
    showGierczak,
    showOfiara,
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
