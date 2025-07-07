// src/lib/genealogyUtils.ts
import { Person } from "@shared/schema";

export interface FamilyUnit {
  parents: Person[];
  children: Person[];
}

const sortByBirthDate = (a: Person, b: Person): number => {
  const getYear = (p: Person): number => {
    // 1. Spróbuj użyć precyzyjnej daty
    if (p.birthDate) {
      const yearStr = p.birthDate.substring(0, 4);
      if (!isNaN(parseInt(yearStr))) {
        return parseInt(yearStr);
      }
    }

    if (p.birthDateNote) {
      const match = p.birthDateNote.match(/\d{4}/);
      if (match && match[0]) {
        return parseInt(match[0]);
      }
    }
    // 3. Jeśli nigdzie nie znaleziono roku, użyj wartości domyślnej
    return 9999;
  };
  return getYear(a) - getYear(b);
};

const sortParents = (a: Person, b: Person): number => {
  const aIsWife = !!a.maidenName;
  const bIsWife = !!b.maidenName;

  if (aIsWife && !bIsWife) {
    return 1;
  }
  if (!aIsWife && bIsWife) {
    return -1;
  }

  return sortByBirthDate(a, b);
};

function getFullBranch(
  rootPeople: Person[],
  peopleMap: Map<number, Person>
): Person[] {
  const fullBranchSet = new Set<Person>();
  const queue = [...rootPeople];
  const processedIds = new Set<number>();

  while (queue.length > 0) {
    const person = queue.shift();
    if (!person || processedIds.has(person.id)) continue;

    processedIds.add(person.id);
    fullBranchSet.add(person);

    (person.spouseIds ?? []).forEach((spouseId) => {
      const spouse = peopleMap.get(spouseId);
      if (spouse) fullBranchSet.add(spouse);
    });

    (person.childIds ?? []).forEach((childId) => {
      const child = peopleMap.get(childId);
      if (child) queue.push(child);
    });
  }
  return Array.from(fullBranchSet);
}

export function getFamilyStructure(
  familyTag: "gierczak" | "ofiara",
  allPeople: Person[]
): { progenitorUnit: FamilyUnit | null; descendantUnits: FamilyUnit[] } {
  if (allPeople.length === 0) {
    return { progenitorUnit: null, descendantUnits: [] };
  }

  const peopleMap = new Map(allPeople.map((p) => [p.id, p]));

  const initialRoots = allPeople.filter(
    (p) =>
      p.family === familyTag &&
      !(p.parentIds ?? []).some((id) => peopleMap.get(id)?.family === familyTag)
  );

  const progenitorBio = initialRoots.find((p) => {
    if (typeof p.biography !== "object" || p.biography === null) return false;
    const bioPL = p.biography.pl?.toLowerCase() || "";
    const bioEN = p.biography.en?.toLowerCase() || "";
    return bioPL.includes("protoplasta") || bioEN.includes("progenitor");
  });

  const mainProgenitor = progenitorBio ?? initialRoots.sort(sortByBirthDate)[0];

  if (!mainProgenitor) {
    return { progenitorUnit: null, descendantUnits: [] };
  }

  const branchPeople = getFullBranch([mainProgenitor], peopleMap);
  const branchPeopleIds = new Set(branchPeople.map((p) => p.id));

  const progenitorSpouses = (mainProgenitor.spouseIds ?? [])
    .map((id) => peopleMap.get(id))
    .filter((p): p is Person => p !== undefined);

  const progenitorChildren = (mainProgenitor.childIds ?? [])
    .map((id) => peopleMap.get(id))
    .filter((p): p is Person => p !== undefined && branchPeopleIds.has(p.id))
    .sort(sortByBirthDate);

  const progenitorUnit: FamilyUnit = {
    parents: [mainProgenitor, ...progenitorSpouses].sort(sortParents),
    children: progenitorChildren,
  };

  const descendantUnits: FamilyUnit[] = [];
  const processedParentIds = new Set<number>([
    mainProgenitor.id,
    ...progenitorSpouses.map((s) => s.id),
  ]);

  function buildDescendantUnits(children: Person[]) {
    for (const child of children) {
      if (processedParentIds.has(child.id)) continue;

      const grandChildren = (child.childIds ?? [])
        .map((id) => peopleMap.get(id))
        .filter(
          (p): p is Person => p !== undefined && branchPeopleIds.has(p.id)
        )
        .sort(sortByBirthDate);

      if ((child.childIds ?? []).length > 0) {
        processedParentIds.add(child.id);

        const childSpouses = (child.spouseIds ?? [])
          .map((id) => peopleMap.get(id))
          .filter((p): p is Person => p !== undefined);

        childSpouses.forEach((spouse) => processedParentIds.add(spouse.id));

        descendantUnits.push({
          parents: [child, ...childSpouses].sort(sortParents),
          children: grandChildren,
        });

        if (grandChildren.length > 0) {
          buildDescendantUnits(grandChildren);
        }
      }
    }
  }

  buildDescendantUnits(progenitorChildren);

  return { progenitorUnit, descendantUnits };
}
