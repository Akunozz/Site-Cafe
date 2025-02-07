import React from "react";
import ReactDOM from "react-dom/client";
import { RouterConfig } from "./routes/router";
import { Analytics } from "@vercel/analytics/react"
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterConfig />
    <Analytics />
  </React.StrictMode>
);
