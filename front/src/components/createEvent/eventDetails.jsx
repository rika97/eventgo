import React from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Typography, Button, Grid, Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EventDetails = () => {
    const navigate = useNavigate();
    const types = [
        '音楽',
        '映像',
        'お祭り',
        '食べもの',
        '展示会',
        'テクノロジー',
        'ビジネス',
        'ゲーム',
        'スポーツ',
        '教育',
        'その他'
      ];
  return (
    <div>
        <Typography>下記のイベント情報を入力してください</Typography>
        <Grid sx={{marginTop: 2}}>
            <div>
                <TextField
                    sx={{width: 350}}
                    id="outlined-textarea"
                    label="イベント名"
                    placeholder="イベント名"
                    multiline
                    size="small"
                />
            </div>
            <div>
            <Autocomplete
                disablePortal
                options={types}
                sx={{ width: 350, marginTop: 1 }}
                renderInput={(params) => <TextField {...params} label="カテゴリー" />}
                size="small"
            />
            </div>
            <div>
                <TextField
                    sx={{width: 350, marginTop: 1}}
                    id="outlined-textarea"
                    label="場所"
                    placeholder="場所"
                    multiline
                    size="small"
                />
            </div>
            {/* 作成中 */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Expiration Date"
                    inputFormat="MM/DD/YYYY"
                    minDate={new Date()}
                    sx={{width: 350, marginTop: 1}}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <div>
                <TextField
                    sx={{width: 350, top: 10}}
                    id="outlined-textarea"
                    label="概要"
                    placeholder="概要"
                    multiline
                    rows={10}
                    size="small"
                />
            </div>
            <div>
                <Button
                    sx={{top: 20}}
                    variant="contained"
                    onClick={() => {navigate("/createEvent/eventCompleted");}}
                >次へ</Button>
            </div>
        </Grid>
    </div>
  )
}

export default EventDetails