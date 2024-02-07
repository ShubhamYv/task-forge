import { ThemeProvider } from '@emotion/react';
import './App.css';
import Navbar from './Page/Navbar/Navbar';
import { darkTheme } from './Theme/DarkTheme';
import Home from './Page/Home/Home';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
