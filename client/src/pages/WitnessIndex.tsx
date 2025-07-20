import { useState, useMemo } from "react";
import { Search, MapPin, BookOpen, XCircle } from "lucide-react";
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
    if (!searchTerm) {
      return genealogyData.witnesses;
    }
    return genealogyData.witnesses.filter((witness: Witness) => {
      const fullName = `${witness.firstName} ${witness.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif heritage-text">
            {t("witnessIndex.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("witnessIndex.subtitle")}
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("witnessIndex.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
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

        <div className="text-center mb-6 text-sm text-muted-foreground">
          {t("witnessIndex.resultsFound", { count: filteredWitnesses.length })}
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
                          ? language === "en"
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
      <DocumentModal
        isOpen={documentModalOpen}
        onClose={() => setDocumentModalOpen(false)}
        documentId={selectedDocumentId}
      />
    </>
  );
}
