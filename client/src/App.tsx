import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Home from "@/pages/Home";
import InteractiveTreeView from "@/pages/InteractiveTreeView";
import PersonIndex from "@/pages/PersonIndex";
import GalleryView from "@/pages/GalleryView";
import SourcesView from "@/pages/SourcesView";
import FamilyBranchView from "@/pages/FamilyBranchView";
import NotFound from "@/pages/not-found";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/drzewo" component={InteractiveTreeView} />
              <Route path="/indeks-osob" component={PersonIndex} />
              <Route path="/galeria" component={GalleryView} />
              <Route path="/zrodla" component={SourcesView} />
              <Route path="/rod/:family" component={FamilyBranchView} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;