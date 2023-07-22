import React from 'react';
import FirstPage from './components/first-page';
import SecondPage from './components/second-page';
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

