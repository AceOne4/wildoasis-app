"use client";
import { createContext, useContext, useState } from "react";

const ReservationsContext = createContext();
const intialState = {
  from: undefined,
  to: undefined,
};
function ReservationProvider({ children }) {
  const [range, setRange] = useState(intialState);
  const resetRange = () => setRange(intialState);
  return (
    <ReservationsContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationsContext.Provider>
  );
}

function useReservation() {
  const ctx = useContext(ReservationsContext);
  if (ctx === undefined)
    throw new Error("context has used outside the provider");
  return ctx;
}
export { ReservationProvider, useReservation };
