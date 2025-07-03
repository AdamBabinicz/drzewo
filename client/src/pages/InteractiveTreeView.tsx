import { useState } from "react";
import InteractiveTree from "@/components/tree/InteractiveTree";
import PersonModal from "@/components/ui/PersonModal";
import { Person } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check, Settings } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import genealogyData from "@/data/index";
// import genealogyData from "@/data/genealogy.json";

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

export default function InteractiveTreeView() {
  const { t } = useLanguage();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Stany do zarządzania widocznością wszystkich elementów
  const [showGierczak, setShowGierczak] = useState(true);
  const [showOfiara, setShowOfiara] = useState(true);
  const [showDescendants, setShowDescendants] = useState(true);
  const [showMarriages, setShowMarriages] = useState(true);

  const allPeople = genealogyData.people as Person[];
  const isLoading = false;
  const error = null;

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPerson(null);
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
            allPeople={allPeople}
            onPersonClick={handlePersonClick}
            showGierczak={showGierczak}
            showOfiara={showOfiara}
            showDescendants={showDescendants}
            showMarriages={showMarriages}
          />

          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg heritage-border flex items-center flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center text-sm font-semibold heritage-text mr-2">
              <Settings className="w-4 h-4 mr-2" />
              {t("tree.viewFilters")}
            </div>
            <ControlCheckbox
              label={t("family.gierczak")}
              checked={showGierczak}
              onToggle={() => setShowGierczak(!showGierczak)}
              colorClass="heritage-burgundy"
            />
            <ControlCheckbox
              label={t("family.ofiara")}
              checked={showOfiara}
              onToggle={() => setShowOfiara(!showOfiara)}
              colorClass="heritage-teal"
            />
            <ControlCheckbox
              label={t("tree.legend.descendants")}
              checked={showDescendants}
              onToggle={() => setShowDescendants(!showDescendants)}
              colorClass="heritage-burgundy"
            />
            <ControlCheckbox
              label={t("tree.legend.marriages")}
              checked={showMarriages}
              onToggle={() => setShowMarriages(!showMarriages)}
              colorClass="heritage-teal"
            />
          </div>
        </div>

        <PersonModal
          person={selectedPerson}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onPersonClick={handlePersonClick}
          allPeople={allPeople}
        />
      </div>
    </>
  );
}
