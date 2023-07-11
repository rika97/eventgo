import {React, useState} from 'react'
import { Box, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import AllEventCards from './AllEventCards';

const EventTabs = () => {
  const [tabValue, setTabValue] = useState("0")
  const handleChange = (e, value) => {
    setTabValue(value)
  }
  return (
    <div>
      <Box sx={{maxWidth: '100%'}}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, 
                borderColor: "divider"}}>
              <TabList
                scrollButtons="auto"
                variant="scrollable"
                onChange={handleChange}
              >
                <Tab sx={{minWidth: 0}} label="全て" value="0" />
                <Tab sx={{minWidth: 0}} label="音楽" value="1" />
                <Tab sx={{minWidth: 0}} label="映像" value="2" />
                <Tab sx={{minWidth: 0}} label="お祭り" value="3" />
                <Tab sx={{minWidth: 0}} label="食べもの" value="4" />
                <Tab sx={{minWidth: 0}} label="展示会" value="5" />
                <Tab sx={{minWidth: 0}} label="テクノロジー" value="6" />
                <Tab sx={{minWidth: 0}} label="ビジネス" value="7" />
                <Tab sx={{minWidth: 0}} label="ゲーム" value="8" />
                <Tab sx={{minWidth: 0}} label="スポーツ" value="9" />
                <Tab sx={{minWidth: 0}} label="教育" value="10" />
                <Tab sx={{minWidth: 0}} label="その他" value="11" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <AllEventCards type={"all"} />
            </TabPanel>
            <TabPanel value="1">
              <AllEventCards type={"music"} />
            </TabPanel>
            <TabPanel value="2">
              <AllEventCards type={"film"} />
            </TabPanel>
            <TabPanel value="3">
              <AllEventCards type={"festival"} />
            </TabPanel>
            <TabPanel value="4">
              <AllEventCards type={"food"} />
            </TabPanel>
            <TabPanel value="5">
              <AllEventCards type={"expo"} />
            </TabPanel>
            <TabPanel value="6">
              <AllEventCards type={"tech"} />
            </TabPanel>
            <TabPanel value="7">
              <AllEventCards type={"business"} />
            </TabPanel>
            <TabPanel value="8">
              <AllEventCards type={"game"} />
            </TabPanel>
            <TabPanel value="9">
              <AllEventCards type={"sports"} />
            </TabPanel>
            <TabPanel value="10">
              <AllEventCards type={"education"} />
            </TabPanel>
            <TabPanel value="11">
              <AllEventCards type={"others"} />
            </TabPanel>
          </TabContext>
        </Box>
    </div>
  )
}

export default EventTabs