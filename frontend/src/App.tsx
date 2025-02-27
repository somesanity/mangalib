import React from 'react';
import './App.css';
import { MainPage } from './components/Pages/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import { TitlePage } from './components/Pages/TitlePage/TitlePage';
import { ChapterPage } from './components/Pages/ChapterPage/ChapterPage';
import { NewTitlePage } from './components/Pages/NewTitlePage/NewTitlePage';
import { NewChapterPage } from './components/Pages/NewChapterPage/NewChapterPage';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

const whiteTheme = createTheme({
  palette: {
    primary: blueGrey, 
    secondary: grey 
  }
})

function App() {
  return (
    <ThemeProvider theme={whiteTheme}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/title/:id" element={<TitlePage />} />
        <Route path="/title/:id/chapter/:chapterid" element={<ChapterPage />} />
        <Route path="/title/:id/chapter/:chapterid/edit" element={<NewChapterPage />} />
        <Route path="/title/createnewtitle" element={<NewTitlePage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
