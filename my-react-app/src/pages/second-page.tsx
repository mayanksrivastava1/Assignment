import React from 'react';

import './second-page.css'
import Firstcomponent from '../components/api_component';
import Secondcomponent from '../components/second_component';


const SecondPage: React.FC = () => {
  
  return (
    <div>
      <h1>Second Page</h1>
      <Firstcomponent />
      <Secondcomponent />
    </div>
  );
};

export default SecondPage
