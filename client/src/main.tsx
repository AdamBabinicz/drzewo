import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./hooks/useTheme";
import { LanguageProvider } from "./hooks/useLanguage";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider defaultTheme="light" storageKey="genealogy-theme">
      <LanguageProvider defaultLanguage="pl">
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </HelmetProvider>
);
