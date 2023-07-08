import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import UserSidebar from '../../../components/navbar/UserSidebar';

import { db } from "../../../config/firebase";
import { doc, getDoc } from 'firebase/firestore';

const MyPage = ({account}) => {

  const navigate = useNavigate();

  const drawerWidth = 240;

  const [open, setOpen] = React.useState(true);

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));


  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="マイページ" />
        <Main open={open}>
          <DrawerHeader />
          {/* check if user exists, if not take them to signup page */}
        </Main>
      </Box>
    </div>
  )
}

export default MyPage;
