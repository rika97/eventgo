import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
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
          <Typography variant="h2">Hey, Miyu!</Typography>
          <Button variant="contained" sx={{marginTop: 2}}>アカウント情報を変更する</Button>
          <Typography sx={{marginTop: 4}} variant="h5" fontWeight={'bold'}>ワォレット情報</Typography>
          <Typography sx={{marginTop: 1}} variant="h6">残高: 10.001 ETH</Typography>
          <Typography sx={{marginTop: 1}} variant="h6">Collected: 32</Typography>
        </Main>
      </Box>
    </div>
  )
}

export default MyPage;
