import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        {/* <img src={} alt="logo " /> */}
      </div>
      <div className="flex-fill">
        <ul className={`${styles.headerList}`}>
          <NavLink to="/client" className="justify-content mr-5" style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }}>
            Clients
          </NavLink>
          <NavLink to="/home" style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }} >
            Voitures
          </NavLink>
        </ul>
      </div>
      <ul className={`${styles.headerList}`}>
        <button className="btn btn-primary">Deconnexion</button>
      </ul>
    </header>
  );
}

export default Header;
