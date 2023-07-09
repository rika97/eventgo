import React from 'react';
import './header.css';
import people from '../../assets/people.svg';
import { useNavigate } from 'react-router-dom';
import ConnectButton from '../../components/ConnectButton';
import { useEthers } from '@usedapp/core';

const Header = () => {
  const navigate = useNavigate();
  const { account } = useEthers();

  return (
    <div className="redlist__header section__padding" id="home">
        <div className='redlist__header-content'>
          <h1 className='gradient__text'>イベントに参加してNFTを集めよう </h1>
          <p>テキトーな文章でかっこいいアプリっぽくする</p>

          <div className='redlist__header-content__input'>
            {/* <input id="email" type="email" placeholder="Your Email Address" autoComplete="on"></input> */}
            {account ? 
              <button onClick={() => navigate('/mypage')}>マイページへ移動する</button> :
              <ConnectButton text="ワォレットを連携する" />
            }
          </div>

        </div>
        <div className="redlist__header-image">
          <img src={people} alt="conference icon" />
        </div>
    </div>
  )
};

export default Header;