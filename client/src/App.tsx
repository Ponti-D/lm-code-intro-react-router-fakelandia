import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";
import {
  MisdemeanourProps,
  MisdemeanoursContext,
} from "./components/misdemeanours/MisdemeanoursContext";
import { Router } from "./components/router/router";

function App() {
   
  const [misdemeanours, setMisdemeanours] = useState<MisdemeanourProps[]>([]);
  const amount = 10;

  useEffect(() => {
    const getMisdemeanours = async (amount: number) => {
    try {
      const apiResponse = await fetch(
        `http://localhost:8080/api/misdemeanours/${amount}`
      );
      const json = await apiResponse.json();
      setMisdemeanours(json.misdemeanours);
    } catch (error) {}
  };
    getMisdemeanours(amount);
  }, []);
  
  return (
    
    <MisdemeanoursContext.Provider value={misdemeanours}>
       <HashRouter>
        <Router />
        </HashRouter>
    </MisdemeanoursContext.Provider>
  );
}

export default App;
