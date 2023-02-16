import { NavLink } from "react-router-dom";

const Nav : React.FC = () =>
  <nav>
      <ul>
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/misdemeanours'>Misdemeanours</NavLink></li>
          <li><NavLink to='/confession'>Confess To Us</NavLink></li>
      </ul>
  </nav>;

  export default Nav;