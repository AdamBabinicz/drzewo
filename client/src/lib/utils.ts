import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLifespan(birthDate?: string, deathDate?: string): string {
  if (!birthDate && !deathDate) return '';
  
  const birth = birthDate || '?';
  const death = deathDate || '';
  
  if (death) {
    return `${birth} - ${death}`;
  }
  
  return `ur. ${birth}`;
}

export function calculateAge(birthDate?: string, deathDate?: string): number | null {
  if (!birthDate || !deathDate) return null;
  
  const birthYear = parseInt(birthDate);
  const deathYear = parseInt(deathDate);
  
  if (isNaN(birthYear) || isNaN(deathYear)) return null;
  
  return deathYear - birthYear;
}

export function sortPeopleByName<T extends { firstName: string; lastName: string }>(people: T[]): T[] {
  return [...people].sort((a, b) => {
    const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
    const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
    return nameA.localeCompare(nameB, 'pl');
  });
}

export function sortPeopleByBirthDate<T extends { birthDate?: string }>(people: T[]): T[] {
  return [...people].sort((a, b) => {
    const yearA = a.birthDate ? parseInt(a.birthDate) : 0;
    const yearB = b.birthDate ? parseInt(b.birthDate) : 0;
    return yearA - yearB;
  });
}

export function getPersonDisplayName(person: { firstName: string; lastName: string; maidenName?: string }): string {
  let name = `${person.firstName} ${person.lastName}`;
  if (person.maidenName) {
    name += ` (z d. ${person.maidenName})`;
  }
  return name;
}

export function getFamilyColor(family: string): string {
  switch (family) {
    case 'gierczak':
      return 'heritage-burgundy';
    case 'ofiara':
      return 'heritage-teal';
    default:
      return 'heritage-brown';
  }
}

export function getFamilyColorClass(family: string, type: 'text' | 'bg' | 'border' = 'text'): string {
  const color = getFamilyColor(family);
  
  switch (type) {
    case 'bg':
      return `bg-[hsl(var(--${color}))]`;
    case 'border':
      return `border-[hsl(var(--${color}))]`;
    case 'text':
    default:
      return `text-[hsl(var(--${color}))]`;
  }
}
