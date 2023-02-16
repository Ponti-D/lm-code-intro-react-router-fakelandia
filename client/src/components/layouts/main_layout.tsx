import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import '../../App.css';

const DefaultLayout: React.FC = () => {
  return (
    <>   
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
