import React from 'react';
import './possibility.css';

import meeting from '../../assets/meeting.svg';
import { APP_NAME } from '../../constants';

const Possibility = () => {
  return (
    <div className="redlist__possibility" id="possibility">
        <div className='redlist__possibility-wrapper section__padding'>
          <div className="redlist__possibility-image">
            <img src={meeting} alt="possibility" />
          </div>
          <div className='redlist__possibility-content'>
            <p>イベントに参加してNFTを得よう</p>
          </div>
        </div>
    </div>
  )
};

export default Possibility;