import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Typography, Button, Grid, Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import storage from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
const EventDetails = () => {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
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

      function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/eventPhotos/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                    <DateTimePicker
                        label="開始日時"
                        value={startTime}
                        onChange={setStartTime}
                        disablePast
                        renderInput={(params) => <TextField {...params} sx={{width: 350, marginTop: 1}} size="small" />}
                    />
                </div>
                <div>
                    <DateTimePicker
                        label="終了日時"
                        value={endTime}
                        onChange={setEndTime}
                        disablePast
                        renderInput={(params) => <TextField {...params} sx={{width: 350, marginTop: 1}} size="small" />}
                    />
                </div>
            </LocalizationProvider>
            <div>
                <Grid sx={{marginTop: 1}}>
                    <Typography variant="subtitle2">ヘッダー画像をアップロード:</Typography>
                    <Button variant="outlined" size="small" component="label">画像を選択<input type="file" onChange={handleChange} accept="/image/*" hidden /></Button>
                    <Button variant="contained" onClick={handleUpload} size="small" sx={{marginLeft: 1}}>アップロードする</Button>
                    <Typography variant="body2">({percent}% 完了)</Typography>
                </Grid>
            </div>
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
                    sx={{width: 350, top: 20}}
                    variant="contained"
                    onClick={() => {navigate("/createEvent/eventCompleted");}}
                >作成</Button>
            </div>
        </Grid>
    </div>
  )
}

export default EventDetails