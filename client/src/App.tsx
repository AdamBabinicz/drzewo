import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, Router, useLocation } from "wouter";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

import Home from "@/pages/Home";
import InteractiveTreeView from "@/pages/InteractiveTreeView";
import PersonIndex from "@/pages/PersonIndex";
import GalleryView from "@/pages/GalleryView";
import SourcesView from "@/pages/SourcesView";
import FamilyBranchView from "@/pages/FamilyBranchView";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

function AppRoutes() {
  const { p } = useLanguage();

  return (
    <Switch>
      <Route path={p("home")} component={Home} />
      <Route path={p("tree")} component={InteractiveTreeView} />
      <Route path={p("index")} component={PersonIndex} />
      <Route path={p("gallery")} component={GalleryView} />
      <Route path={p("sources")} component={SourcesView} />
      <Route path={`${p("familyBase")}/:family`} component={FamilyBranchView} />
      <Route path={p("terms")} component={Terms} />
      <Route path={p("privacy")} component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="genealogy-theme">
        <Router>
          <LanguageProvider defaultLanguage="pl">
            <TooltipProvider>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen dark:bg-card pt-16">
                <Navbar />
                <main className="flex-grow">
                  <AppRoutes />
                </main>
                <Footer />
                <Toaster />
                <ScrollToTopButton />
              </div>
            </TooltipProvider>
          </LanguageProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
