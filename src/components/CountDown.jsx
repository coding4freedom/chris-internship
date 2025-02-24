import React, { useState, useEffect } from "react";

const CountDown = ({ expiryDate }) => {
    const [ timeLeft, setTimeLeft ] = useState(getTimeLeft(expiryDate));
    
      useEffect(() => {
        const interval = setInterval(() => {
          setTimeLeft(getTimeLeft(expiryDate))
        }, 1000);
    
        return () => clearInterval(interval);
      }, [ expiryDate ]);

    return (
        <div className="de_countdown">{timeLeft}</div>
    )
}

function getTimeLeft(unix) {
    const milis = unix - Date.now();
    
    if (milis <= 0) return "0h 0m 0s"; 

    const seconds = Math.floor((milis / 1000) % 60);
    const minutes = Math.floor((milis / 1000 / 60) % 60);
    const hours = Math.floor(milis / 1000 / 60 / 60);
    return `${hours}h ${minutes}m ${seconds}s`
}

export default CountDown;