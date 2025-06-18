import React from 'react';
import { Handle, Position } from 'reactflow';
import { User, Calendar } from 'lucide-react';
import { Person } from '@shared/schema';

interface PersonNodeProps {
  data: {
    person: Person;
    onClick: () => void;
    family: string;
  };
}

export default function PersonNode({ data }: PersonNodeProps) {
  const { person, onClick, family } = data;
  const isGierczak = family === 'gierczak';
  
  const borderColor = isGierczak ? 'border-[hsl(var(--heritage-burgundy))]' : 'border-[hsl(var(--heritage-teal))]';
  const accentColor = isGierczak ? 'text-[hsl(var(--heritage-burgundy))]' : 'text-[hsl(var(--heritage-teal))]';

  return (
    <div 
      className={`person-node bg-white border-2 ${borderColor} rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-all min-w-[180px]`}
      onClick={onClick}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-stone-400" />
      
      <div className="text-center">
        <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-3 flex items-center justify-center">
          {person.photoUrl ? (
            <img 
              src={person.photoUrl} 
              alt={`${person.firstName} ${person.lastName}`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-stone-500" />
          )}
        </div>
        
        <h4 className="font-semibold text-sm heritage-text mb-1">
          {person.firstName} {person.lastName}
        </h4>
        
        {(person.birthDate || person.deathDate) && (
          <p className="text-xs text-stone-600 flex items-center justify-center">
            <Calendar className="w-3 h-3 mr-1" />
            {person.birthDate}{person.deathDate ? `-${person.deathDate}` : ''}
          </p>
        )}
        
        {person.birthPlace && (
          <p className="text-xs text-stone-500 mt-1">{person.birthPlace}</p>
        )}
        
        {person.occupation && (
          <p className={`text-xs ${accentColor} font-medium mt-1`}>
            {person.occupation}
          </p>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-stone-400" />
    </div>
  );
}
