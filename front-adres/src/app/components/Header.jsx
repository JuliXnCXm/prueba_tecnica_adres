import React from 'react';
import Logo from '../../assets/Icon.svg';
import '../styles/components/Header.css';


const Header = () => {

  return (
    <header className="header">
      <img src={Logo} alt=''/>
    </header>
  );

};


export default Header;