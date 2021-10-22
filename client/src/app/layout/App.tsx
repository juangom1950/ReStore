import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, createTheme } from '@mui/material';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    
    palette: {
      mode: paletteType
    }
  })

  return (
    //this is jsx
    <ThemeProvider theme={theme}>
      {/* Use this Material UI component to get away of the padding that the browser lives arround */}
      <CssBaseline/>
      <Header/>
      {/* Container is a material ui component */}
      <Container>
        <Catalog/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
