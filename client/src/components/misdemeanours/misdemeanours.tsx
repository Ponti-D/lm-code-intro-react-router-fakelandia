import React from "react";
import { useEffect, useState } from "react";
import MisdemeanoursTable, { misdemeanourProps } from "./misdemeanours_table";
import MisdemeanerFilter from "./misdemeanour_filter";

export const MisdemeanoursContext = React.createContext<misdemeanourProps[]>([]);
const amount = 10;
const Misdemeanours: React.FC = () => {
  const [misdemeanours, setMisdemeanours] = useState<misdemeanourProps[]>([]);

  useEffect(() => {
    getMisdemeanours(amount);
  }, []);

  const getMisdemeanours = async (amount: number) => {
    const apiResponse = await fetch(
      `http://localhost:8080/api/misdemeanours/${amount}`
    );
    const json = await apiResponse.json();
    setMisdemeanours(json.misdemeanours);
  };

  return (
    <MisdemeanoursContext.Provider value={misdemeanours}>
      <div>
        <MisdemeanoursTable />
      </div>
    </MisdemeanoursContext.Provider>
  );
};

export default Misdemeanours;
