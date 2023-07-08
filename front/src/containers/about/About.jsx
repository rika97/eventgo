import React from 'react';
import { Feature } from '../../components';
import './about.css';
import { APP_NAME } from '../../constants';

const about = () => {
  return (
    <div className="redlist__about section__margin" id="about">
      <div className='redlist__about-heading'>
        <h1 className='gradient__text'>{APP_NAME}とは何か?</h1>
        <p>イベントに参加してNFTを獲得しよう</p>
      </div>
      <div>
        <p>
        ここに適当な文章
        <br />
        <br />
        さらに適当な文章
        </p>
      </div>
    </div>
  )
}

export default about;