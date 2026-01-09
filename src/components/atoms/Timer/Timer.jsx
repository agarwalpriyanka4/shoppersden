import React,{useState,useEffect} from 'react';

import './Timer.css';

function Timer(){
// state management for current time
const [currentTime, setCurrentTime] = useState(new Date());

// useEffect to update time every second
useEffect(() => {
  const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
  return () => clearInterval(timerID);

})

 return(
   /*  <h4 className='text-xl font-bold text-indigo-700'>{currentTime.toLocaleTimeString([], {hour12: true})}</h4> */ 
     <h4 className='text-xl font-bold text-indigo-700'>{currentTime.toLocaleTimeString("en-US",{
      timeZone: "Asia/Kolkata",
     })}</h4>   
 )

}

export default Timer;
