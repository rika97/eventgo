import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserSidebar from '../navbar/UserSidebar';

const EventCompleted = ({account, randomNum}) => {

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
        <UserSidebar open={open} setOpen={setOpen} pageTitle="新規イベント作成" />
        <Main open={open}>
          <DrawerHeader />
          <Typography>感想収集用QRコード{randomNum}</Typography>
          <div>
            <Button
                sx={{top: 20}}
                variant="contained"
                onClick={() => {navigate("/createEvent/eventCompleted");}}
            >保存</Button>
        </div>
        <div>
            <Button sx={{top: 20}} variant="text">感想の収集を中断して画像を生成する</Button>
        </div>
        </Main>
      </Box>
    </div>
  )
}

export default EventCompleted;