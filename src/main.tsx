import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { YoutubeProvider } from "@contexts/youtubeContext.tsx";
import "./main.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <YoutubeProvider>
      <App />
    </YoutubeProvider>
  </StrictMode>,
);
