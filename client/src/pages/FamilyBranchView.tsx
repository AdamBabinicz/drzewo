// src/pages/FamilyBranchView.tsx
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PersonModal from "@/components/ui/PersonModal";
import KeepsakesModal from "@/components/ui/KeepsakesModal";
import PlaceModal from "@/components/ui/PlaceModal";
import { Person, Place } from "@shared/schema";
import { MapPin, Users, Eye, BookText, ChevronDown, Award } from "lucide-react";
import { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import genealogyData from "@/data/index";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { getFamilyStructure } from "@/lib/genealogyUtils";
import FamilyUnitCard from "@/components/ui/FamilyUnitCard";

export default function FamilyBranchView() {
  const { t, p } = useLanguage();
  const [, params] = useRoute(`${p("familyBase")}/:family`);
  const family = params?.family as "gierczak" | "ofiara";

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [etymologyOpen, setEtymologyOpen] = useState(false);
  const [keepsakesPerson, setKeepsakesPerson] = useState<Person | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [placeModalOpen, setPlaceModalOpen] = useState(false);

  const { data: allPeople = [] } = useQuery({
    queryKey: ["/api/people"],
    queryFn: () => Promise.resolve(genealogyData.people as Person[]),
  });

  const { progenitorUnit, descendantUnits } = useMemo(() => {
    if (family && allPeople.length > 0) {
      return getFamilyStructure(family, allPeople);
    }
    return { progenitorUnit: null, descendantUnits: [] };
  }, [family, allPeople]);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleOpenKeepsakes = (person: Person) => {
    setModalOpen(false);
    setTimeout(() => {
      setKeepsakesPerson(person);
    }, 150);
  };

  const handleCloseKeepsakes = () => {
    setKeepsakesPerson(null);
  };

  const handlePlaceClick = (placeId: string) => {
    const placeData = genealogyData.places.find(
      (p) => p.id.toLowerCase() === placeId.toLowerCase()
    );
    if (placeData) {
      setSelectedPlace(placeData);
      setPlaceModalOpen(true);
    }
  };

  const familyInfo = {
    gierczak: {
      name: t("family.gierczak"),
      description: t("home.branches.gierczak.desc"),
      color: "heritage-burgundy",
      borderColor: "border-heritage-burgundy",
      btnColor: "btn-heritage-burgundy",
      imageUrl: "/images/jaszowice.avif",
      placeIds: ["jaszowice", "gulinek_gierczak", "mleczkow"],
    },
    ofiara: {
      name: t("family.ofiara"),
      description: t("home.branches.ofiara.desc"),
      color: "heritage-teal",
      borderColor: "border-heritage-teal",
      btnColor: "btn-heritage-teal",
      imageUrl: "/images/ludwikow.avif",
      placeIds: ["wola_gutowska", "ludwikow", "gulinek_ofiara"],
    },
  };

  const currentFamily = family ? familyInfo[family] : null;

  const renderDescriptionWithLinks = (description: string) => {
    const placeLookup: { [key: string]: string } = {
      Jaszowic: "jaszowice",
      Gulinku: "gulinek_gierczak",
      Mleczkowie: "mleczkow",
      "Dąbrówce Nagórnej": "dabrowka_nagorna",
      Klwatach: "klwaty",
      Radomiu: "radom",
      "Wolą Gutowską": "wola_gutowska",
      Ludwikowem: "ludwikow",
    };

    const placeNames = Object.keys(placeLookup);
    const regex = new RegExp(`(${placeNames.join("|")})`, "g");
    const parts = description.split(regex);

    return parts.map((part, index) => {
      if (placeLookup[part]) {
        return (
          <button
            key={index}
            onClick={() => handlePlaceClick(placeLookup[part])}
            className="font-semibold text-heritage-burgundy dark:text-heritage-gold hover:underline"
          >
            {part}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  if (!family || !currentFamily) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold heritage-text mb-4">
            {t("familyBranch.notFound.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("familyBranch.notFound.desc")}
          </p>
        </div>
      </div>
    );
  }

  const totalPeopleInBranch = useMemo(() => {
    if (!progenitorUnit) return 0;
    const allIds = new Set<number>();
    [progenitorUnit, ...descendantUnits].forEach((unit) => {
      unit.parents.forEach((p) => allIds.add(p.id));
      unit.children.forEach((c) => allIds.add(c.id));
    });
    return allIds.size;
  }, [progenitorUnit, descendantUnits]);

  const familyPlaces =
    genealogyData.places
      ?.filter((place) => currentFamily.placeIds.includes(place.id))
      .sort(
        (a, b) =>
          currentFamily.placeIds.indexOf(a.id) -
          currentFamily.placeIds.indexOf(b.id)
      ) || [];

  const GierczakEtymology = () => (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h4>{t("familyBranch.etymology.gierczak.h1")}</h4>
      <p>{t("familyBranch.etymology.gierczak.p1")}</p>
      <p>{t("familyBranch.etymology.gierczak.p2")}</p>
      <ul>
        <li>{t("familyBranch.etymology.gierczak.l1")}</li>
        <li>{t("familyBranch.etymology.gierczak.l2")}</li>
      </ul>
      <h4>{t("familyBranch.etymology.gierczak.h2")}</h4>
      <p>{t("familyBranch.etymology.gierczak.p3")}</p>
      <h5>{t("familyBranch.etymology.gierczak.h3")}</h5>
      <p>{t("familyBranch.etymology.gierczak.p4")}</p>
      <p>{t("familyBranch.etymology.gierczak.p5")}</p>
      <h5>{t("familyBranch.etymology.gierczak.h4")}</h5>
      <p>{t("familyBranch.etymology.gierczak.p6")}</p>
      <h5>{t("familyBranch.etymology.gierczak.h5")}</h5>
      <p>{t("familyBranch.etymology.gierczak.p7")}</p>
      <h4>{t("familyBranch.etymology.gierczak.h6")}</h4>
      <p>{t("familyBranch.etymology.gierczak.p8")}</p>
      <h4>{t("familyBranch.etymology.gierczak.h7")}</h4>
      <p>{t("familyBranch.etymology.gierczak.p9")}</p>
    </div>
  );

  const OfiaraEtymology = () => (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h4>{t("familyBranch.etymology.ofiara.h1")}</h4>
      <p>{t("familyBranch.etymology.ofiara.p1")}</p>
      <h4>{t("familyBranch.etymology.ofiara.h2")}</h4>
      <p>{t("familyBranch.etymology.ofiara.p2")}</p>
      <h5>{t("familyBranch.etymology.ofiara.h3")}</h5>
      <p>{t("familyBranch.etymology.ofiara.p3")}</p>
      <h5>{t("familyBranch.etymology.ofiara.h4")}</h5>
      <p>{t("familyBranch.etymology.ofiara.p4")}</p>
      <h4>{t("familyBranch.etymology.ofiara.h5")}</h4>
      <p>{t("familyBranch.etymology.ofiara.p5")}</p>
      <h5>{t("familyBranch.etymology.ofiara.h6")}</h5>
      <p>{t("familyBranch.etymology.ofiara.p6")}</p>
      <h4>{t("familyBranch.etymology.ofiara.h7")}</h4>
      <p>{t("familyBranch.etymology.ofiara.p7")}</p>
    </div>
  );

  return (
    <>
      <SEO
        title={currentFamily.name}
        description={`${
          currentFamily.description
        } Poznaj historię i członków ${currentFamily.name.toLowerCase()}.`}
      />

      <div className="bg-background">
        <div className="relative h-80 md:h-96">
          <img
            src={currentFamily.imageUrl}
            alt={`Miejsca związane z ${currentFamily.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">
                {currentFamily.name}
              </h2>
              <p className="text-xl md:text-2xl opacity-90">
                {familyPlaces.map((p) => p.name).join(", ")}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <Card className="bg-stone-50 dark:bg-background-alt">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold heritage-text mb-4">
                      {t("familyBranch.history.title")}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {renderDescriptionWithLinks(currentFamily.description)}
                    </p>
                    <div className="mb-6">
                      <Button
                        variant="ghost"
                        onClick={() => setEtymologyOpen(!etymologyOpen)}
                        className="text-sm text-muted-foreground dark:hover:text-popover p-1 h-auto"
                      >
                        <BookText className="w-4 h-4 mr-2" />
                        {t("familyBranch.etymology.title")}
                        <ChevronDown
                          className={`w-4 h-4 ml-1 transition-transform ${
                            etymologyOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                      {etymologyOpen && (
                        <div className="mt-4 p-4 rounded-md border bg-background/50">
                          {family === "gierczak" && <GierczakEtymology />}
                          {family === "ofiara" && <OfiaraEtymology />}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {t("familyBranch.history.places")}:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {familyPlaces.map((place) => (
                          <span
                            key={place.id}
                            className="bg-muted dark:bg-card text-muted-foreground dark:text-foreground px-2 py-1 rounded"
                          >
                            {place.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-stone-100 dark:bg-card mb-4`}
                    >
                      <Users className={`w-12 h-12 ${currentFamily.color}`} />
                    </div>
                    <p className="text-3xl font-bold heritage-text">
                      {totalPeopleInBranch}
                    </p>
                    <p className="text-muted-foreground">
                      {t("familyBranch.history.membersInDb")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white dark:bg-gradient-dark-brown rounded-lg p-4 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="font-serif text-3xl font-semibold heritage-text">
                {t("familyBranch.members.title")}
              </h2>
              <Button
                asChild
                className={`${currentFamily.btnColor} transition-all duration-300 hover:scale-105 hover:shadow-md`}
              >
                <Link href={p("tree")}>
                  <Eye className="w-4 h-4 mr-2" />
                  {t("familyBranch.members.viewInTree")}
                </Link>
              </Button>
            </div>

            {progenitorUnit ? (
              <div>
                <div className="mb-12">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 mr-3 text-amber-500" />
                    <h2 className="font-serif text-2xl font-semibold heritage-text">
                      {t("familyBranch.progenitorTitle")}
                    </h2>
                  </div>
                  <div
                    className={`p-4 rounded-lg bg-stone-50 dark:bg-background-alt border-t-4 ${currentFamily.borderColor}`}
                  >
                    <FamilyUnitCard
                      unit={progenitorUnit}
                      onPersonClick={handlePersonClick}
                      familyColor={currentFamily.borderColor}
                      isProgenitor={true}
                    />
                  </div>
                </div>

                {descendantUnits.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl font-semibold heritage-text mb-4">
                      {t("familyBranch.descendantsTitle")}
                    </h2>
                    {descendantUnits.map((unit, index) => (
                      <FamilyUnitCard
                        key={index}
                        unit={unit}
                        onPersonClick={handlePersonClick}
                        familyColor={currentFamily.borderColor}
                        isProgenitor={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Card className="heritage-card">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold heritage-text mb-2">
                    {t("familyBranch.members.noData.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("familyBranch.members.noData.desc")}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <PersonModal
          person={selectedPerson}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onPersonClick={handlePersonClick}
          allPeople={allPeople}
          onOpenKeepsakes={handleOpenKeepsakes}
        />

        {keepsakesPerson && (
          <KeepsakesModal
            person={keepsakesPerson}
            isOpen={!!keepsakesPerson}
            onClose={handleCloseKeepsakes}
          />
        )}

        <PlaceModal
          place={selectedPlace}
          isOpen={placeModalOpen}
          onClose={() => setPlaceModalOpen(false)}
        />
      </div>
    </>
  );
}
