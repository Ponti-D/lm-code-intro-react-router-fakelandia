import React from "react";
import { MisdemeanourKind, JustTalk } from "../../../types/misdemeanours.types";

export interface MisdemeanourProps {
  citizenId: number;
  misdemeanour: MisdemeanourKind | JustTalk;
  date: string;
}

export const MisdemeanoursContext = React.createContext<MisdemeanourProps[]>(
  []
);
