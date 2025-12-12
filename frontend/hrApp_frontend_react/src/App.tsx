import { useState } from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box, Typography, Tabs, Tab, Container } from "@mui/material";
import Header from './components/Header/Header';

import './App.css'
import EmployeePage from './components/Pages/EmployeePage/EmployeePage';
import People from './components/Pages/People/People';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import "dayjs/locale/en-gb";


const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2f297eff" },
    secondary: { main: "#2251aaff" }
  }
});

dayjs.locale("en-gb");

function App() {
  const [selectedMainTab, setSelectedMainTab] = useState(0);


  return (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
    <ThemeProvider theme={theme}>
      <CssBaseline />

 


      <Header
        selectedMainTab={selectedMainTab}
        onChange={(_e, newVal) => setSelectedMainTab(newVal)}
      />

      {selectedMainTab === 0 && <div>Home Page</div>}
      {selectedMainTab === 1 && <EmployeePage />} 
      {selectedMainTab === 2 && <People/>}
    </ThemeProvider>
    </LocalizationProvider>
  );
}


export default App
