import React, { useState, useEffect } from 'react'
import CheckBox from '../CheckBox/CheckBox'
import './Card.css'


const CHECKBOXES = [
    {
        id: '0',
        name: 'kosher',
        value: 'Kosher',
    },
    {
        id: '1',
        name: 'no-celery',
        value: 'No Celery (inc celeriac)',
    },
    {
        id: '2',
        name: 'no-egg',
        value: 'No Egg',
    }
]

const Card = () => {
    const [message, setMessage] = useState([])
    const [checked, setChecked] = useState([])
    const [selectAllCheck, setSelectAllCheck] = useState(false)
    const ifChecked = (inputEl) => inputEl.checked

    const allCheckState = (bool) => {
        let arr = []
        for (let i = 0; i < CHECKBOXES.length; i++) {
            arr.push(bool)
        }
        setChecked(arr)
        setSelectAllCheck(bool)
    }

    useEffect(() => {
        allCheckState(false)
    }, [])

    const clearHandler = () => {
        allCheckState(false)
        setMessage([''])
    }
    const allMessages = () => {
        let arr = []
        CHECKBOXES.forEach(input => arr.push(input.value))
        setMessage(arr)
    }
    const selectAllStateUpdate = (inputEl) => {
        if (checked.every(item => item === true) && selectAllCheck) {
            allCheckState(false)
            return
        }
        if (inputEl.checked === true) {
            allCheckState(true)
            allMessages()
        } else {
            setSelectAllCheck(false)
        }
    }
    const inputStateUpdate = (inputEl, id) => {
        if (ifChecked(inputEl)) {
            setMessage(prevState => [...prevState, inputEl.value])
        } else {
            setMessage(prevState => prevState.filter(message => message !== inputEl.value))
        }
        setChecked(prevState => {
            let items = [...prevState]
            items[id] = inputEl.checked
            items.every(item => item === true) ? setSelectAllCheck(true) : setSelectAllCheck(false)
            return items
        })
    }

    const inputClicker = (e) => {
        let inputEl = e.target
        let id = parseInt(inputEl.id)
        if (inputEl.value === 'Select All') {
            selectAllStateUpdate(inputEl)
        } else {
            inputStateUpdate(inputEl, id)
        }

    }
    return (
        <section className='Card'>
            <span className='Card__notification'>Selected Value: {message.join(', ')}</span>
            <ul className='Card__list'>
                <CheckBox name={'select-all'} value='Select All' onClickHandler={inputClicker} checked={selectAllCheck} />
                {
                    CHECKBOXES.map((input, id) => {
                        return <CheckBox key={`check-${id}`} name={input.name} value={input.value} onClickHandler={inputClicker} checked={checked[id]} id={input.id} />
                    })
                }
            </ul>
            <button className='Card__button' onClick={clearHandler}>Clear All</button>
        </section>
    )
}

export default Card

