import { Routes, Route } from "react-router-dom";
import Home from "../home/home";

export const Router: React.FC = () => 
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </>

