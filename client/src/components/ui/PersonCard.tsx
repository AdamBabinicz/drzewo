import { User, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Person } from '@shared/schema';

interface PersonCardProps {
  person: Person;
  onClick: () => void;
}

export default function PersonCard({ person, onClick }: PersonCardProps) {
  const isGierczak = person.family === 'gierczak';
  const accentColor = isGierczak ? 'text-[hsl(var(--heritage-burgundy))]' : 'text-[hsl(var(--heritage-teal))]';

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow heritage-border" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
            {person.photoUrl ? (
              <img 
                src={person.photoUrl} 
                alt={`${person.firstName} ${person.lastName}`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-stone-500" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold heritage-text truncate">
              {person.firstName} {person.lastName}
              {person.maidenName && <span className="text-sm ml-1">(z d. {person.maidenName})</span>}
            </h4>
            
            {(person.birthDate || person.deathDate) && (
              <p className="text-sm text-stone-600 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {person.birthDate}{person.deathDate ? `-${person.deathDate}` : ''}
              </p>
            )}
            
            {person.birthPlace && (
              <p className="text-xs text-stone-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                ur. {person.birthPlace}
              </p>
            )}
            
            {person.occupation && (
              <p className={`text-xs ${accentColor} font-medium`}>
                {person.occupation}
              </p>
            )}
          </div>
          
          <div className={`${accentColor}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
