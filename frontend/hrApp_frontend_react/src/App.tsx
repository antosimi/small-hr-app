import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import Header from './components/Header/Header';
import EmployeePage from './components/Pages/EmployeePage/EmployeePage';
import People from './components/Pages/People/People';
import { authService } from './services/authService';
import LoginPage from './components/Pages/Login/LoginPage';
import ManageCalendar from './components/Pages/ManageCalendarPage/ManageCalendar';

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2f297eff" },
    secondary: { main: "#2251aaff" }
  }
});

dayjs.locale("en-gb");

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [selectedMainTab, setSelectedMainTab] = useState(0);


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    authService.logout(); 
    setIsLoggedIn(false);
    setSelectedMainTab(0);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {!isLoggedIn ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Header
              selectedMainTab={selectedMainTab}
              onChange={(_e, newVal) => setSelectedMainTab(newVal)}
              onLogout={handleLogout}
            />

            <main style={{ padding: '20px' }}>
              {selectedMainTab === 0 && <div>Bine ai venit la LuckyPeople!</div>}
              {selectedMainTab === 1 && <EmployeePage />} 
              {selectedMainTab === 2 && <People/>}
              {selectedMainTab === 3 && <ManageCalendar />}
            </main>
          </>
        )}
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;