import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Card, Grid, Paper, Grow, CardMedia, CardContent, CardActions, Button } from '@mui/material';

import { db } from "../../config/firebase";
import { getDocs, collection } from  "firebase/firestore";

function AllEventCards ({type}) {
  const [eventList, setEventList] = useState([]);

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
                                        image={event.artworkURI}
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

export default AllEventCards