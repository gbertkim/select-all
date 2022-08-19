import React from 'react'
import './CheckBox.css'
const CheckBox = (props) => {
    return (
        <li className='listItem'>
            <input className='listItem__input' type='checkbox' name={props.name} value={props.value} onClick={(e) => props.onClickHandler(e)} id={props.id} checked={props.checked} />
            <label className='listItem__label' htmlFor={props.name}>{props.value}</label>
        </li>
    )
}

export default CheckBox