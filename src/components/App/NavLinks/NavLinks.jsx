import { NavLink } from 'react-router-dom';
import s from './NavLinks.module.css';

export const NavLinks = () => {
  return (
    <nav className={s.navigationLinks}>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <NavLink
            exact
            to="/"
            className={s.navLink}
            activeClassName={s.activeLink}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={s.navLink}
            activeClassName={s.activeLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
