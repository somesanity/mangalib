import React from 'react';
import './App.css';
import { MainPage } from './components/Pages/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import { TitlePage } from './components/Pages/TitlePage/TitlePage';
import { ChapterPage } from './components/Pages/ChapterPage/ChapterPage';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/title/:id" element={<TitlePage />} />
        <Route path="/title/:id/chapter/:chapterid" element={<ChapterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
