import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null; // early return patern

  return (
    <div className="p-5 shadow-lg w-48">
      <ul>
        <li>
          {" "}
          <Link to="/">Home</Link>
        </li>
        <li>shorts</li>
        <li>vedeos</li>
        <li>live</li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li>music</li>
        <li>sports</li>
        <li>gaming</li>
        <li>movies</li>
      </ul>
      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li>music</li>
        <li>sports</li>
        <li>gaming</li>
        <li>movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
