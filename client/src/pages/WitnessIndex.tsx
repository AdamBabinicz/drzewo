import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, MapPin, BookOpen, XCircle, User } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import genealogyData from "@/data/index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DocumentModal from "@/components/ui/DocumentModal";
import { Witness } from "@shared/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SEO from "@/components/SEO";

export default function WitnessIndex() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null
  );

  const handleDocumentClick = (docId: number) => {
    setSelectedDocumentId(docId);
    setDocumentModalOpen(true);
  };

  const filteredWitnesses = useMemo(() => {
    const sortedWitnesses = [...genealogyData.witnesses].sort((a, b) => {
      const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
      const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    if (!searchTerm) {
      return sortedWitnesses;
    }

    return sortedWitnesses.filter((witness: Witness) => {
      const fullName = `${witness.firstName} ${witness.lastName}`.toLowerCase();
      const residence = witness.residence.toLowerCase();
      const term = searchTerm.toLowerCase();
      return fullName.includes(term) || residence.includes(term);
    });
  }, [searchTerm]);

  return (
    <>
      <SEO
        title={t("witnessIndex.title")}
        description={t("witnessIndex.subtitle")}
      />
      <div className="min-h-screen bg-stone-50 dark:bg-card">
        <div className="bg-white dark:bg-background shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="text-center">
              <h1 className="text-4xl font-bold font-serif heritage-text">
                {t("witnessIndex.title")}
              </h1>
              <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                {t("witnessIndex.subtitle")}
              </p>
            </header>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("witnessIndex.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setSearchTerm("")}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-background-alt rounded-lg p-4 sm:p-8 mt-8">
            <div className="text-center mb-6 text-sm text-muted-foreground">
              {t("witnessIndex.resultsFound", {
                count: filteredWitnesses.length,
              })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredWitnesses.length > 0 ? (
                filteredWitnesses.map((witness: Witness, index: number) => (
                  <div key={index} className="heritage-card p-4">
                    <h3 className="font-semibold heritage-text">
                      {witness.firstName} {witness.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-2" />
                      {t("witnessIndex.residence")}: {witness.residence}
                    </p>
                    {witness.personId && (
                      <Link
                        href={`/person/${witness.personId}`}
                        className="text-sm text-blue-600 hover:underline mt-2 flex items-center"
                      >
                        <User className="w-3.5 h-3.5 mr-2" />
                        {t("witnessIndex.viewInTree")}
                      </Link>
                    )}
                    <div className="mt-3 pt-3 border-t heritage-border">
                      <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center">
                        <BookOpen className="w-3.5 h-3.5 mr-2" />
                        {t("witnessIndex.appearsIn")}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <TooltipProvider>
                          {witness.documentIds.map((id: number) => {
                            const doc = genealogyData.documents.find(
                              (d) => d.id === id
                            );
                            const docTitle = doc
                              ? language === "en" && doc.title_en
                                ? doc.title_en
                                : doc.title_pl
                              : "";
                            return (
                              <Tooltip key={id}>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7"
                                    onClick={() => handleDocumentClick(id)}
                                  >
                                    {t("witnessIndex.documentLink", { id })}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{docTitle}</p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold heritage-text">
                    {t("witnessIndex.noResults.title")}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {t("witnessIndex.noResults.desc")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DocumentModal
        isOpen={documentModalOpen}
        onClose={() => setDocumentModalOpen(false)}
        documentId={selectedDocumentId}
      />
    </>
  );
}
