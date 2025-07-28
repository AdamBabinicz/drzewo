import { useState, useMemo } from "react";
import InteractiveTree from "@/components/tree/InteractiveTree";
import PersonModal from "@/components/ui/PersonModal";
import KeepsakesModal from "@/components/ui/KeepsakesModal";
import { Person } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check, Settings, Users, ZoomIn } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import genealogyData from "@/data/index";

const ControlCheckbox = ({
  label,
  checked,
  onToggle,
  colorClass = "",
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  colorClass?: string;
}) => (
  <button
    onClick={onToggle}
    className="flex items-center cursor-pointer text-sm gap-2 text-foreground"
  >
    <div className="w-4 h-4 border rounded flex items-center justify-center bg-background">
      {checked && <Check className={`w-3 h-3 ${colorClass}`} />}
    </div>
    {label}
  </button>
);

// --- NOWE STAŁE DLA CZYTELNOŚCI ---
const GIERCZAK_ROOT_ID = 1;
const OFIARA_ROOT_ID = 161;

export default function InteractiveTreeView() {
  const { t } = useLanguage();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [keepsakesPerson, setKeepsakesPerson] = useState<Person | null>(null);

  // Zmieniono domyślny ID na stałą
  const [focusedPersonId, setFocusedPersonId] =
    useState<number>(GIERCZAK_ROOT_ID);

  const [showGierczak, setShowGierczak] = useState(true);
  const [showOfiara, setShowOfiara] = useState(true);
  const [showDescendants, setShowDescendants] = useState(true);
  const [showMarriages, setShowMarriages] = useState(true);

  const allPeople = genealogyData.people as Person[];
  const isLoading = false;
  const error = null;

  const focusedPerson = useMemo(
    () => allPeople.find((p) => p.id === focusedPersonId),
    [allPeople, focusedPersonId]
  );

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPerson(null);
  };

  const handleSetFocus = (personId: number) => {
    setFocusedPersonId(personId);
    handleModalClose();
  };

  const handleOpenKeepsakes = (person: Person) => {
    handleModalClose();
    setTimeout(() => {
      setKeepsakesPerson(person);
    }, 150);
  };

  const handleCloseKeepsakes = () => {
    setKeepsakesPerson(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Nie udało się załadować danych genealogicznych. Spróbuj ponownie
            później.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <SEO title={t("tree.title")} description={t("tree.subtitle")} />

      <div className="min-h-screen dark:bg-background flex flex-col">
        <div className="bg-white dark:bg-background-alt shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold heritage-gradient-text mb-4">
              {t("tree.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("tree.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex-grow h-[calc(100vh-164px)] relative">
          <InteractiveTree
            key={focusedPersonId}
            allPeople={allPeople}
            focusedPersonId={focusedPersonId}
            onPersonClick={handlePersonClick}
            showGierczak={showGierczak}
            showOfiara={showOfiara}
            showDescendants={showDescendants}
            showMarriages={showMarriages}
          />

          <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg heritage-border flex items-center gap-2">
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium heritage-text">
              {focusedPerson?.firstName} {focusedPerson?.lastName}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg heritage-border flex items-center flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center text-sm font-semibold heritage-text mr-2">
              <Settings className="w-4 h-4 mr-2" />
              {t("tree.viewFilters")}
            </div>
            <ControlCheckbox
              label={t("family.gierczak")}
              checked={showGierczak}
              onToggle={() => setShowGierczak(!showGierczak)}
              colorClass="heritage-burgundy-text"
            />
            <ControlCheckbox
              label={t("family.ofiara")}
              checked={showOfiara}
              onToggle={() => setShowOfiara(!showOfiara)}
              colorClass="heritage-teal-text"
            />
            <ControlCheckbox
              label={t("tree.legend.descendants")}
              checked={showDescendants}
              onToggle={() => setShowDescendants(!showDescendants)}
              colorClass="heritage-burgundy-text"
            />
            <ControlCheckbox
              label={t("tree.legend.marriages")}
              checked={showMarriages}
              onToggle={() => setShowMarriages(!showMarriages)}
              colorClass="heritage-teal-text"
            />
          </div>

          {/* --- NOWY BLOK KONTROLEK DO ZMIANY FOKUSU --- */}
          <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg heritage-border flex items-center flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center text-sm font-semibold heritage-text mr-2">
              <Users className="w-4 h-4 mr-2" />
              <span>{t("tree.focusOn")}</span>
            </div>
            <button
              onClick={() => setFocusedPersonId(GIERCZAK_ROOT_ID)}
              className="px-3 py-1 rounded text-sm transition-colors data-[active=true]:bg-heritage-burgundy data-[active=true]:text-white data-[active=false]:bg-background"
              data-active={focusedPerson?.family === "gierczak"}
            >
              {t("family.gierczak")}
            </button>
            <button
              onClick={() => setFocusedPersonId(OFIARA_ROOT_ID)}
              className="px-3 py-1 rounded text-sm transition-colors data-[active=true]:bg-heritage-teal data-[active=true]:text-white data-[active=false]:bg-background"
              data-active={focusedPerson?.family === "ofiara"}
            >
              {t("family.ofiara")}
            </button>
          </div>
          {/* --- KONIEC NOWEGO BLOKU --- */}
        </div>

        <PersonModal
          person={selectedPerson}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onPersonClick={handlePersonClick}
          allPeople={allPeople}
          onOpenKeepsakes={handleOpenKeepsakes}
          onSetFocus={handleSetFocus}
        />

        {keepsakesPerson && (
          <KeepsakesModal
            person={keepsakesPerson}
            isOpen={!!keepsakesPerson}
            onClose={handleCloseKeepsakes}
          />
        )}
      </div>
    </>
  );
}
