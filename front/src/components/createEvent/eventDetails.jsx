import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Typography, Button, Grid, Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import storage from '../../config/firebase';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

const EventDetails = () => {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [event, setEvent] = useState({title: '', location: '', photoURI: '', startTime: new Date(), endTime: new Date(), type: '', userId: '', userName: '', details: ''});

    const navigate = useNavigate();
    const types = [
        { label: '音楽', category: 'music'},
        { label: '映像', category: 'film'},
        { label: 'お祭り', category: 'festival'},
        { label: '食べもの', category: 'food'},
        { label: '展示会', category: 'expo'},
        { label: 'テクノロジー', category: 'tech'},
        { label: 'ビジネス', category: 'business'},
        { label: 'ゲーム', category: 'game'},
        { label: 'スポーツ', category: 'sports'},
        { label: '教育', category: 'education'},
        { label: 'その他', category: 'others'}
      ];

      function handleChange(event) {
        setFile(event.target.files[0]);
    }
    function handleStartTime (time) {
        setEvent({ ...event, startTime: time.toString() })
      };

    function handleEndTime (time) {
        setEvent({ ...event, endTime: time.toString() })
      };
    
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/eventPhotos/${file.name}`);
 
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
                    setEvent({ ...event, photoURI: url })
                });
            }
        );
    };

    const addEvent = async (e) => {
       
        try {
            const docRef = await addDoc(collection(db, "events"), {
              event: event
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

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
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                />
            </div>
            <div>
            <Autocomplete
                disablePortal
                loading
                options={types}
                getOptionLabel={(option) => option.label}
                sx={{ width: 350, marginTop: 1 }}
                renderInput={(params) => <TextField {...params} label="カテゴリー" />}
                size="small"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, value) => setEvent({ ...event, type: value?.category })}
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
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                    <DateTimePicker
                        label="開始日時"
                        value={event.startTime}
                        onChange={handleStartTime}
                        disablePast
                        renderInput={(params) => <TextField {...params} sx={{width: 350, marginTop: 1}} size="small" />}
                    />
                </div>
                <div>
                    <DateTimePicker
                        label="終了日時"
                        value={event.endTime}
                        onChange={handleEndTime}
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
                    onChange={(e) => setEvent({ ...event, details: e.target.value })}
                />
            </div>
            <div>
                <Button
                    sx={{width: 350, top: 20}}
                    variant="contained"
                    onClick={() => {
                        addEvent();
                        navigate("/createEvent/eventCompleted");
                    }}
                >作成</Button>
            </div>
        </Grid>
    </div>
  )
}

export default EventDetails