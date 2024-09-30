import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-700 text-white font-bold py-4 shadow-lg">
      <div className="container mx-auto flex justify-center gap-8">
        <NavLink
          to="/"
          className="hover:text-yellow-300 transition-colors duration-200"
          activeClassName="underline"
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className="hover:text-yellow-300 transition-colors duration-200"
          activeClassName="underline"
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
