import { createRoot } from "react-dom/client";
import "./ui/styles/layers.css";

const container = document.querySelector("#root");

if (!(container instanceof HTMLElement)) {
  throw new Error("Missing #root element");
}

createRoot(container).render(null);
