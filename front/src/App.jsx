import React, { useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { EventCompleted, Feedback } from './components';
import { Comment, CreateEvent, CreatedEvents, Event, Gallery, Landing, MyPage, Timeline } from './pages';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { useEthers } from '@usedapp/core';
import './App.css';
import { APP_THEME, DEFAULT_HOME_PAGE } from './constants';

const App = () => {
  const { activateBrowserWallet, account, error } = useEthers();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const userRoute = pathname.startsWith('/user')

  useEffect(() => {
    if (!account && userRoute && error) {
      navigate('/')
    } else if (account && pathname === '/') {
      navigate(DEFAULT_HOME_PAGE)
    }
  }, [account, userRoute])

  useEffect(() => {
    activateBrowserWallet();
  }, [])



  return (
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="mypage" element={<MyPage account={account} />} />
          <Route path="gallery" element={<Gallery account={account} />} />
          <Route path="timeline" element={<Timeline account={account} />} />
          <Route path="createEvent" element={<Outlet />}>
            <Route path="createEvent" element={<CreateEvent account={account} />} />
            <Route path="eventCompleted" element={<EventCompleted account={account} />} />
          </Route>
          <Route path="createdEvents" element={<CreatedEvents account={account} />} />
          <Route path="feedback" element={<Feedback account={account} />} />
          <Route path="event/:event_id/comment" element={<Comment account={account} />} />
          <Route path="event/:event_id" element={<Event account={account} />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App;
