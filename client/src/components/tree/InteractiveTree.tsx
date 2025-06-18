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
    const nodeMap = new Map<number, Node>();
    const edgeList: Edge[] = [];

    // Create nodes for each person
    people.forEach((person, index) => {
      const isGierczak = person.family === 'gierczak';
      nodeMap.set(person.id, {
        id: person.id.toString(),
        type: 'person',
        position: {
          x: index * 200,
          y: 0, // Will be adjusted based on generation
        },
        data: {
          person,
          onClick: () => onPersonClick(person),
          family: person.family,
        },
        className: isGierczak ? 'family-gierczak' : 'family-ofiara',
      });
    });

    // Position nodes by generation
    const generations = new Map<number, Person[]>();
    const visited = new Set<number>();
    
    // Find root nodes (people without parents)
    const rootNodes = people.filter(person => 
      !person.parentIds || person.parentIds.length === 0
    );

    // Build generation levels
    const buildGenerations = (persons: Person[], level: number) => {
      if (!generations.has(level)) {
        generations.set(level, []);
      }
      
      persons.forEach(person => {
        if (!visited.has(person.id)) {
          visited.add(person.id);
          generations.get(level)!.push(person);
          
          // Add children to next level
          if (person.childIds && person.childIds.length > 0) {
            const children = people.filter(p => person.childIds!.includes(p.id));
            buildGenerations(children, level + 1);
          }
        }
      });
    };

    buildGenerations(rootNodes, 0);

    // Position nodes by generation
    generations.forEach((generationPeople, level) => {
      generationPeople.forEach((person, indexInGeneration) => {
        const node = nodeMap.get(person.id);
        if (node) {
          node.position = {
            x: indexInGeneration * 250 - (generationPeople.length * 125) + 400,
            y: level * 200 + 50,
          };
        }
      });
    });

    // Create edges for relationships
    people.forEach(person => {
      // Parent-child relationships
      if (person.childIds) {
        person.childIds.forEach(childId => {
          edgeList.push({
            id: `parent-${person.id}-${childId}`,
            source: person.id.toString(),
            target: childId.toString(),
            type: 'straight',
            style: { stroke: '#8B2635', strokeWidth: 2 },
            markerEnd: { type: 'arrowclosed', color: '#8B2635' },
          });
        });
      }

      // Marriage relationships
      if (person.spouseIds) {
        person.spouseIds.forEach(spouseId => {
          // Only create edge if this person's ID is smaller to avoid duplicates
          if (person.id < spouseId) {
            edgeList.push({
              id: `marriage-${person.id}-${spouseId}`,
              source: person.id.toString(),
              target: spouseId.toString(),
              type: 'straight',
              style: { stroke: '#0F5F5C', strokeWidth: 3, strokeDasharray: '5,5' },
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

  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background color="#f5f5f4" gap={20} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            return node.className?.includes('gierczak') ? '#8B2635' : '#0F5F5C';
          }}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
}
