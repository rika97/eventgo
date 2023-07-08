import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Card, Grid, Paper, Grow, CardMedia, CardContent, CardActions, Button } from '@mui/material';

import { db } from "../../config/firebase";
import { getDocs, collection } from  "firebase/firestore";

function EventCards () {
  const [eventList, setEventList] = useState([]);

  const eventCollectionRef = collection(db, "events");

    const getEventList = async () => {
        try { 
            const data = await getDocs(eventCollectionRef);
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
            <Grid container justify="center" alignItems='flex-start' spacing={1} >
            {eventList.map((event) => {
                if (event.userId === "0x82BD5fD0F73bA74f335917991519b151f7eD6E02") return(
                <div>
                    <Grid item minWidth={210} sx={{marginRight: 2, marginBottom: 2}}>
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
                                        <Typography gutterBottom variant='h5'>{event.title}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">詳細を確認</Button>
                                    </CardActions>
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

export default EventCards