import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import {
  MisdemeanourProps,
  MisdemeanoursContext,
} from "./components/misdemeanours/MisdemeanoursContext";
import { Router } from "./components/router/router";

function App() {
  const [misdemeanours, setMisdemeanours] = useState<MisdemeanourProps[]>([]);
  const amount = 10;

  const getMisdemeanours = async (amount: number) => {
    const apiResponse = await fetch(
      `http://localhost:8080/api/misdemeanours/${amount}`
    );
    const json = await apiResponse.json();
    setMisdemeanours(json.misdemeanours);
  };

  useEffect(() => {
    getMisdemeanours(amount);
    console.log("use effect");
  }, []);

  useContext(MisdemeanoursContext);
  return (
    <MisdemeanoursContext.Provider value={misdemeanours}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MisdemeanoursContext.Provider>
  );
}

export default App;
