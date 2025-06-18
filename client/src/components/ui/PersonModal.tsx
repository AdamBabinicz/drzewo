import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, MapPin, Briefcase, Users, FileText, Eye } from 'lucide-react';
import { Person, Document } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import Lightbox from './Lightbox';

interface PersonModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
  onPersonClick: (person: Person) => void;
  allPeople: Person[];
}

export default function PersonModal({ person, isOpen, onClose, onPersonClick, allPeople }: PersonModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{src: string, alt: string} | null>(null);

  const { data: documents = [] } = useQuery({
    queryKey: [`/api/documents/person/${person?.id}`],
    enabled: !!person?.id,
  });

  if (!person) return null;

  const parents = person.parentIds ? allPeople.filter(p => person.parentIds!.includes(p.id)) : [];
  const spouses = person.spouseIds ? allPeople.filter(p => person.spouseIds!.includes(p.id)) : [];
  const children = person.childIds ? allPeople.filter(p => person.childIds!.includes(p.id)) : [];

  const isGierczak = person.family === 'gierczak';
  const familyColor = isGierczak ? 'heritage-burgundy' : 'heritage-teal';

  const handleDocumentClick = (doc: Document) => {
    setLightboxImage({ src: doc.imageUrl, alt: doc.title });
    setLightboxOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl heritage-text">
              {person.firstName} {person.lastName}
              {person.maidenName && <span className="text-lg ml-2">(z d. {person.maidenName})</span>}
            </DialogTitle>
            <DialogDescription className={`${familyColor}`}>
              Ród {person.family === 'gierczak' ? 'Gierczaków' : 'Ofiarów'}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="w-48 h-48 bg-stone-200 rounded-lg mx-auto flex items-center justify-center">
                    {person.photoUrl ? (
                      <img 
                        src={person.photoUrl} 
                        alt={`${person.firstName} ${person.lastName}`}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-stone-500" />
                    )}
                  </div>
                </div>
                
                <div className="md:w-2/3 space-y-4">
                  {(person.birthDate || person.deathDate) && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-stone-600" />
                      <span className="heritage-text">
                        {person.birthDate}{person.deathDate ? ` - ${person.deathDate}` : ''}
                        {person.birthDate && person.deathDate && (
                          <span className="text-stone-600 ml-2">
                            ({parseInt(person.deathDate) - parseInt(person.birthDate)} lat)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  
                  {person.birthPlace && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-stone-600" />
                      <span className="heritage-text">ur. {person.birthPlace}</span>
                    </div>
                  )}
                  
                  {person.deathPlace && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-stone-600" />
                      <span className="heritage-text">zm. {person.deathPlace}</span>
                    </div>
                  )}
                  
                  {person.occupation && (
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-stone-600" />
                      <span className="heritage-text">{person.occupation}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Biography */}
              {person.biography && (
                <div>
                  <h4 className="font-semibold heritage-text mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Biografia
                  </h4>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <p className="heritage-text leading-relaxed">{person.biography}</p>
                  </div>
                </div>
              )}

              {/* Family Connections */}
              <div>
                <h4 className="font-semibold heritage-text mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Rodzina
                </h4>
                
                <div className="space-y-4">
                  {parents.length > 0 && (
                    <div>
                      <h5 className="font-medium heritage-text mb-2">Rodzice:</h5>
                      <div className="flex flex-wrap gap-2">
                        {parents.map(parent => (
                          <Badge 
                            key={parent.id}
                            variant="secondary" 
                            className="cursor-pointer hover:bg-stone-200"
                            onClick={() => onPersonClick(parent)}
                          >
                            {parent.firstName} {parent.lastName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {spouses.length > 0 && (
                    <div>
                      <h5 className="font-medium heritage-text mb-2">Małżonek:</h5>
                      <div className="flex flex-wrap gap-2">
                        {spouses.map(spouse => (
                          <Badge 
                            key={spouse.id}
                            variant="secondary" 
                            className={`cursor-pointer hover:bg-stone-200 ${
                              spouse.family === 'gierczak' ? 'bg-red-100' : 'bg-teal-100'
                            }`}
                            onClick={() => onPersonClick(spouse)}
                          >
                            {spouse.firstName} {spouse.lastName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {children.length > 0 && (
                    <div>
                      <h5 className="font-medium heritage-text mb-2">Dzieci:</h5>
                      <div className="flex flex-wrap gap-2">
                        {children.map(child => (
                          <Badge 
                            key={child.id}
                            variant="secondary" 
                            className="cursor-pointer hover:bg-stone-200"
                            onClick={() => onPersonClick(child)}
                          >
                            {child.firstName} {child.lastName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              {documents && documents.length > 0 && (
                <div>
                  <h4 className="font-semibold heritage-text mb-3">Dokumenty i źródła:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {documents.map((doc: Document) => (
                      <div 
                        key={doc.id}
                        className="bg-stone-100 rounded-lg p-3 text-center cursor-pointer hover:bg-stone-200 transition-colors"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <FileText className="w-8 h-8 heritage-text mx-auto mb-2" />
                        <p className="text-xs heritage-text font-medium">{doc.title}</p>
                        <p className="text-xs text-stone-600 mt-1">{doc.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Actions */}
              <div className="flex justify-center">
                <Button 
                  className={`btn-heritage-${person.family === 'gierczak' ? 'burgundy' : 'teal'}`}
                  onClick={() => {
                    onClose();
                    // Navigate to tree view centered on this person
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Pokaż w drzewie
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={lightboxImage}
      />
    </>
  );
}
