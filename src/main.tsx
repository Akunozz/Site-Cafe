import React from "react";
import ReactDOM from "react-dom/client";
import { RouterConfig } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterConfig />
    </QueryClientProvider>
  </React.StrictMode>
);