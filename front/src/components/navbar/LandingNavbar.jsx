import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png';
import './landingnavbar.css';
import { APP_NAME } from '../../constants';
import ConnectButton from '../ConnectButton';


const Menu = () => (
  <>
  <p><a href="#home">ホーム</a></p>
  <p><a href="#about">{APP_NAME}とは何か</a></p>
  <p><a href="#possibility">{APP_NAME}で出来ること</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  let navigate = useNavigate();
  return (
    <div className="redlist__navbar">
      <div className="redlist__navbar-links">
        <div className="redlist__navbar-links_logo">
          <img src={logo} alt="logo" className='pointer' onClick={() => navigate('')} />
        </div>
        <div className="redlist__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="redlist__navbar-sign">
        <ConnectButton/>
      </div>
      <div className='redlist__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="white" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="white" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='redlist__navbar-menu_container scale-up-center'>
            <div className='redlist__navbar-menu_container-links'>
              <Menu />
              <div className="redlist__navbar-menu_container-links-sign">
              <ConnectButton/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Navbar;