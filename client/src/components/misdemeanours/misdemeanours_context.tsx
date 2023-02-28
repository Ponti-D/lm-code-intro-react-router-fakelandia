import React, {  useEffect, useState } from "react";
import { MisdemeanourKind, JustTalk } from "../../../types/misdemeanours.types";

export interface MisdemeanourProps {
  citizenId: number;
  misdemeanour: MisdemeanourKind | JustTalk;
  date: string;
}

export const MisdemeanoursContext = React.createContext<MisdemeanourProps[]>(
  []
);

const MisdemeanoursContextProvider = ({children}:any) => {
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
    {children}
  </MisdemeanoursContext.Provider>
)
 
};
export default MisdemeanoursContextProvider;
