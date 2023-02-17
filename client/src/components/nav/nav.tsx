import { NavLink } from "react-router-dom";

const Nav : React.FC = () =>
  <nav>
      <ul className="nav__container">
          <li className="nav__link"><NavLink to='/home'>Home</NavLink></li>
          <li className="nav__link"><NavLink to='/misdemeanours'>Misdemeanours</NavLink></li>
          <li className="nav__link" ><NavLink to='/confession'>Confess To Us</NavLink></li>
      </ul>
  </nav>;

  export default Nav;