import React from 'react';
import './App.css';
import Task from './Task';
import data from './data.json'

const App = ()=>{
  return (
    <div>
      <Task data={data}/>
    </div>
  )
}
export default App;
