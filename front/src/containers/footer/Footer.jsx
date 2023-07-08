import React from 'react';
import './footer.css';
import redlistlogo from '../../assets/logo_transparent.png'
import { APP_NAME } from '../../constants';

const Footer = () => {

  return (
    <div className='redlist__footer section__padding'>
        <div className='redlist__footer-links'>
          <div className='redlist__footer-links_logo'>
            <img src={redlistlogo} alt='logo' />
            <p>NFTでイベント共有</p>
          </div>
          <div className='redlist__footer-links_div'>
            <h4>Links</h4>
            <p><a href='/privacy'>個人情報保護方針</a></p>
            <p><a href='/terms'>会社案内</a></p>
            <p><a href='/contact'>サイトマップ</a></p>
          </div>
        </div>
        <div className='redlist__footer-copyright'>
          <p>{new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer;