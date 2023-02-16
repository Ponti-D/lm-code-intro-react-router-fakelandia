import { Routes, Route } from "react-router-dom";
import Home from "../home/home";
import Misdemeanours from "../misdemeanours/misdemeanours";
import Confession from "../confession/confession";
import PageNotFound from "../../404";


export const Router: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="misdemeanours" element={<Misdemeanours />} />
      <Route path="confession" element={<Confession />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </>
);
