import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import PersonNode from './PersonNode';
import { Person } from '@shared/schema';

interface InteractiveTreeProps {
  people: Person[];
  onPersonClick: (person: Person) => void;
}

const nodeTypes = {
  person: PersonNode,
};

export default function InteractiveTree({ people, onPersonClick }: InteractiveTreeProps) {
  const { nodes, edges } = useMemo(() => {
    if (!people || people.length === 0) {
      return { nodes: [], edges: [] };
    }

    const nodeMap = new Map<number, Node>();
    const edgeList: Edge[] = [];

    // Calculate generations for proper positioning
    const generations = new Map<number, number>();
    const visited = new Set<number>();

    // Find root nodes (those without parents)
    const roots = people.filter(person => !person.parentIds || person.parentIds.length === 0);
    
    // BFS to assign generation levels
    const queue: { person: Person, generation: number }[] = roots.map(p => ({ person: p, generation: 0 }));
    
    while (queue.length > 0) {
      const { person, generation } = queue.shift()!;
      
      if (visited.has(person.id)) continue;
      visited.add(person.id);
      generations.set(person.id, generation);

      // Add children to queue
      if (person.childIds) {
        person.childIds.forEach(childId => {
          const child = people.find(p => p.id === childId);
          if (child && !visited.has(childId)) {
            queue.push({ person: child, generation: generation + 1 });
          }
        });
      }
    }

    // Group people by generation for layout
    const generationGroups = new Map<number, Person[]>();
    people.forEach(person => {
      const gen = generations.get(person.id) || 0;
      if (!generationGroups.has(gen)) {
        generationGroups.set(gen, []);
      }
      generationGroups.get(gen)!.push(person);
    });

    // Create nodes with proper positioning
    people.forEach((person) => {
      const generation = generations.get(person.id) || 0;
      const generationPeople = generationGroups.get(generation) || [];
      const indexInGeneration = generationPeople.indexOf(person);
      
      const isGierczak = person.family === 'gierczak';
      
      nodeMap.set(person.id, {
        id: person.id.toString(),
        type: 'person',
        position: {
          x: indexInGeneration * 280 + (isGierczak ? 0 : 140), // Offset families slightly
          y: generation * 200,
        },
        data: {
          person,
          onClick: () => onPersonClick(person),
          family: person.family,
        },
        className: isGierczak ? 'family-gierczak' : 'family-ofiara',
      });
    });

    // Create edges for family relationships
    people.forEach(person => {
      // Child-parent relationships
      if (person.parentIds) {
        person.parentIds.forEach(parentId => {
          const parentNode = nodeMap.get(parentId);
          const childNode = nodeMap.get(person.id);
          if (parentNode && childNode) {
            edgeList.push({
              id: `parent-${parentId}-child-${person.id}`,
              source: parentId.toString(),
              target: person.id.toString(),
              type: 'smoothstep',
              style: { 
                stroke: person.family === 'gierczak' ? 'hsl(var(--heritage-burgundy))' : 'hsl(var(--heritage-teal))',
                strokeWidth: 2 
              },
              animated: false,
            });
          }
        });
      }

      // Spouse relationships
      if (person.spouseIds) {
        person.spouseIds.forEach(spouseId => {
          const spouseNode = nodeMap.get(spouseId);
          const personNode = nodeMap.get(person.id);
          if (spouseNode && personNode && person.id < spouseId) { // Avoid duplicate edges
            edgeList.push({
              id: `spouse-${person.id}-${spouseId}`,
              source: person.id.toString(),
              target: spouseId.toString(),
              type: 'straight',
              style: { 
                stroke: 'hsl(var(--heritage-teal))',
                strokeWidth: 2,
                strokeDasharray: '5,5'
              },
              animated: false,
            });
          }
        });
      }
    });

    return {
      nodes: Array.from(nodeMap.values()),
      edges: edgeList,
    };
  }, [people, onPersonClick]);

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes and edges when they change
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background />
        <Controls />
        <MiniMap 
          className="!bg-card border heritage-border"
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            return node.className?.includes('gierczak') 
              ? 'hsl(var(--heritage-burgundy))' 
              : 'hsl(var(--heritage-teal))';
          }}
        />
      </ReactFlow>
    </div>
  );
}