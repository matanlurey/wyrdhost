// biome-ignore lint/correctness/noUnresolvedImports: React exports StrictMode at runtime; TypeScript verifies its types.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import "@fontsource-variable/alegreya";
import "@fontsource-variable/source-sans-3";
import "./ui/styles/layers.css";

const container = document.querySelector("#root");

if (!(container instanceof HTMLElement)) {
  throw new Error("Missing #root element");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
