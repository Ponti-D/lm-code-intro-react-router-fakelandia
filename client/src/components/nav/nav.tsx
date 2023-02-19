import { NavLink } from "react-router-dom";

const Nav: React.FC = () => (
  <nav>
    <ul className="nav__container">
        
      <li className="nav__link">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "nav__link--active" : "nav__link")}
        >
          Home
        </NavLink>
      </li>
      <li className="nav__link">
        <NavLink
          to="/misdemeanours"
          className={({ isActive }) => ( isActive ? "nav__link--active" : "nav__link")}
        >
          Misdemeanours
        </NavLink>
      </li>
      <li className="nav__link">
        <NavLink
          to="/confession"
          className={({ isActive }) => (isActive ? "nav__link--active" : "nav__link")}
        >
          Confess To Us
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
