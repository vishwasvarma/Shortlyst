import { createContext, useContext, useState } from "react";

const ResultsContext = createContext();

export function ResultsProvider({ children }) {
  const [results, setResults] = useState([]);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults() {
  return useContext(ResultsContext);
}
