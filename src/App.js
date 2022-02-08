import { createTheme,ThemeProvider } from '@mui/material/styles';
import Login from './components/login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/register';
import Todo from './components/todo';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#FF9505',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#FFB627',
      main: '#E2711D',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#CC5803',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  const token = localStorage.getItem('token');
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/todo" element={<Todo/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
