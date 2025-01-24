import React from "react";
import ReactDOM from "react-dom/client";
import { RouterConfig } from "./routes/router";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);
