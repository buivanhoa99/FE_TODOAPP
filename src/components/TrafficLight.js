import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import "./TodoItem.css"
export default function(){
    const [currentColor,setCurrentcolor] = useState(0);
    setInterval(()=>{
    },1000)
    

    console.log(currentColor);
    return (
        <div className ="Circle">
            <div className={classNames("Circle,red",{"active": true})}></div>
            <div className={classNames("Circle,yellow",{"active": currentColor===1})}></div>
            <div className={classNames("Circle,green",{"active": currentColor===2})}></div>


        </div>
    )
}