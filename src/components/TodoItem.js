import React, { useState } from 'react'
import className from 'classnames'
import checked from '../assets/checked.png'
import unchecked from '../assets/unchecked.png'
import Delete from '../assets/delete.png'
import "./TodoItem.css"
export default (props) => {

    const {item,onClick,onItemDelete} = props;
    // console.log("ITEM",item);
    return(
        <div className="TodoContainer">
        
            <img src={item.status? checked : unchecked} onClick= {onClick} className="icon"/>

            <div  className={className("TodoItem",{"TodoItem-Complete":item.status})}>{item.title}</div>
            
            <img
                src={Delete}
                className="icon"
                onClick = {onItemDelete}
            />

            
        </div>
    )
}