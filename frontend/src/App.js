import { ThemeProvider } from '@emotion/react';
import './App.css';
import Navbar from './Page/Navbar/Navbar';
import { darkTheme } from './Theme/DarkTheme';
import Home from './Page/Home/Home';
import Auth from './Page/Auth/Auth';
import { useState } from 'react';

function App() {
  const [user] = useState(true)
  return (
    <ThemeProvider theme={darkTheme}>
      {user
        ? <div>
          <Navbar />
          <Home />
        </div>
        : <Auth />
      }
    </ThemeProvider>
  );
}

export default App;
