import React from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';

const EventDetails = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Typography>イベントの情報を入力してください</Typography>
        <div>
            <TextField
                sx={{width: 350}}
                id="outlined-textarea"
                label="イベント名"
                placeholder="イベント名"
                multiline
            />
        </div>
        <div>
            <TextField
                sx={{width: 350, top: 10}}
                id="outlined-textarea"
                label="概要"
                placeholder="概要"
                multiline
                rows={10}
            />
        </div>
        <div>
            <Button
                sx={{top: 20}}
                variant="contained"
                onClick={() => {navigate("/createEvent/eventCompleted");}}
            >次へ</Button>
        </div>
    </div>
  )
}

export default EventDetails