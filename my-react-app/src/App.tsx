import React from 'react';
import FirstPage from './pages/first-page';
import SecondPage from './pages/second-page';
import {  Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
  
    </>
  );
};

export default App;

