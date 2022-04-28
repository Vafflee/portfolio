import React, { useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom'

type HeaderProps = {
  toggleModal: () => void
}

export const Header:React.FC<HeaderProps> = ({ toggleModal }) => {

  return (
    <>
      <header className="header container bold">
        <Link to='/'>  
          <div className="header__link">
            About
          </div>
        </Link>
        <Link to='/projects'>  
          <div className="header__link">
            Projects
          </div>
        </Link>
        <Link to='/skills'>  
          <div className="header__link">
            Skills
          </div>
        </Link>
        <Link to='/contacts'>  
          <div className="header__link">
            Contacts
          </div>
        </Link>
        <button className="header__textme btn" onClick={() => toggleModal()}>Text Me</button>
      </header>
    </>
  );
};
