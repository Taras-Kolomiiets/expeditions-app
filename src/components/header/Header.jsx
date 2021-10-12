import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <ul>
        <li>
          Explore Mars!
          <hr className={classes.hrShelf} />
        </li>
      </ul>
    </div>
  );
};

export default Header;
