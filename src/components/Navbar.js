import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/today-birthdays" className="nav-link">Today's Birthdays</Link>
        </li>
        <li>
          <Link to="/employees" className="nav-link">All Employees</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
