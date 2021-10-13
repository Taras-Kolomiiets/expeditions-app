import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <ul>
        <li>
          Explore Mars!
          <hr className={classes.hrShelf} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
