import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Card, Grid, Paper, Grow, CardMedia, CardContent, CardActions, Button, Box, Divider, Chip, Stack } from '@mui/material';
import { Modal } from '@mui/base';
import CloseIcon from '@mui/icons-material/Close';

import { db } from "../../config/firebase";
import { getDocs, collection } from  "firebase/firestore";

function AllEventCards ({type}) {
  const [eventList, setEventList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const handleOpen = () => {
      setModalOpen(true)
  };
  const handleClose = () => {
    setModalOpen(false)
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '80%',
    overflowY: "scroll",
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '1px solid rgba(0,0,0,.333)',
    boxShadow: 20,
    p: 4,
    borderRadius: '7px',
    justifyContent: 'center'
};

  const eventsCollectionRef = collection(db, "events");

    const getEventList = async () => {
        try { 
            const data = await getDocs(eventsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), 
                id: doc.id,
            }));
            setEventList(filteredData)
        } catch (err) {
            console.error(err)
        }
    };
    useEffect(() => {
        getEventList();
    }, []);

  return (
    <div>
        <Grow in>
            <Grid container justify="center" alignItems='flex-start' spacing={1}>
            {eventList.map((event) => {
                if (event.type === type || type == "all") return(
                <div>
                    <Grid item minWidth={270} sx={{marginRight: 2, marginBottom: 2}}>
                        <Paper elevation={2}>
                            <div>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt="event photo"
                                        height="200"
                                        image={event.photoURI}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant='h5' sx={{fontWeight: 'bold'}}>{event.title}</Typography>
                                        <Typography id="modal-modal-title" component="h2">
                                            主催: {event.userName}
                                        </Typography>
                                        <Typography variant='subtitle2'>{event.location}</Typography>
                                        <Typography id="modal-modal-title" variant='subtitle2'>
                                            {new Date(event.startTime.seconds * 1000).toLocaleDateString('ja-JP')}~{new Date(event.endTime.seconds * 1000).toLocaleDateString('ja-JP')}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={handleOpen} >詳細を確認</Button>
                                    </CardActions>
                                    <Modal
                                        open={modalOpen}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Button onClick={handleClose} sx={{ position: "fixed", top: 10, right: 25 }}><CloseIcon />閉じる</Button>
                                            <Button variant="contained" sx={{ position: "fixed", top: 50, right: 25 }}>参加登録する</Button>
                                            <Stack direction="row" spacing={1}>
                                                <Chip label={event.type} size="small"/>
                                            </Stack>
                                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                                {event.title}
                                            </Typography>
                                            <Typography id="modal-modal-title" component="h2" sx={{fontWeight: 'bold'}}>
                                                主催: {event.userName}
                                            </Typography>
                                            <Typography id="modal-modal-title" variant='subtitle2'>
                                                場所: {event.location}
                                            </Typography>
                                            <Typography id="modal-modal-title" variant='subtitle2'>
                                                日時: {new Date(event.startTime.seconds * 1000).toLocaleString('ja-JP')}~{new Date(event.endTime.seconds * 1000).toLocaleString('ja-JP')}
                                            </Typography>
                                            <img src={event.photoURI} alt="photo" height='70%' />
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                概要
                                            </Typography>
                                            <Divider />
                                            <Typography component="h2" sx={{marginTop: 2}}>
                                                {event.details}
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </Card>
                            </div>
                        </Paper>
                    </Grid>
                </div>)
            })}
            </Grid>
        </Grow>
    </div>
  )
}

export default AllEventCards