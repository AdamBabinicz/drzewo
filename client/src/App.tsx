import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import InteractiveTreeView from "@/pages/InteractiveTreeView";
import FamilyBranchView from "@/pages/FamilyBranchView";
import PersonIndex from "@/pages/PersonIndex";
import GalleryView from "@/pages/GalleryView";
import SourcesView from "@/pages/SourcesView";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/drzewo" component={InteractiveTreeView} />
        <Route path="/rod/:family" component={FamilyBranchView} />
        <Route path="/indeks-osob" component={PersonIndex} />
        <Route path="/galeria" component={GalleryView} />
        <Route path="/zrodla" component={SourcesView} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
