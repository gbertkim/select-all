import React, { useState } from 'react'
import CheckBox from '../CheckBox/CheckBox'
import './Card.css'
const Card = () => {
    const [message, setMessage] = useState([])
    const [checked, setChecked] = useState([false, false, false])
    const [selectAllCheck, setSelectAllCheck] = useState(false)

    const ifChecked = (inputEl) => inputEl.checked
    const clearHandler = () => {
        setChecked([false, false, false])
        setSelectAllCheck(false)
        setMessage([''])
    }
    const inputClicker = (e) => {
        let inputEl = e.target
        let id = parseInt(inputEl.id)
        if (inputEl.value === 'Select All') {
            if (inputEl.checked === true) {
                setChecked([true, true, true])
                setSelectAllCheck(!selectAllCheck)
                setMessage(['Kosher', 'No Celery (inc celeriac)', 'No Egg'])
            }
        } else {
            if (ifChecked(inputEl)) {
                setMessage(prevState => [...prevState, inputEl.value])

            } else {
                setMessage(prevState => prevState.filter(message => message !== inputEl.value))
            }
            setChecked(prevState => {
                let items = [...prevState]
                items[id] = inputEl.checked
                return items
            })
        }
    }
    return (
        <section className='Card'>
            <span className='Card__notification'>Selected Value: {message.join(', ')}</span>
            <ul className='Card__list'>
                <CheckBox name={'select-all'} value='Select All' onClickHandler={inputClicker} checked={selectAllCheck} />
                <CheckBox name={'kosher'} value='Kosher' onClickHandler={inputClicker} checked={checked[0]} id='0' />
                <CheckBox name={'no-celery'} value='No Celery (inc celeriac)' onClickHandler={inputClicker} checked={checked[1]} id='1' />
                <CheckBox name={'no-egg'} value='No Egg' onClickHandler={inputClicker} checked={checked[2]} id='2' />
            </ul>
            <button className='Card__button' onClick={clearHandler}>Clear All</button>
        </section>
    )
}

export default Card

// const CHECKBOXES = [
//     {

//     }
// ]