import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ResultsProvider } from "./context/ResultsContext";

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ResultsProvider>
      <App />
    </ResultsProvider>
  </BrowserRouter>,
);
