import React, { useState, useEffect } from 'react'
import CheckBoxFn from '../CheckBoxFn/CheckBoxFn'
import '../Card.css'

const CardFn = (props) => {
    const [message, setMessage] = useState([])
    const [checked, setChecked] = useState([])
    const [selectAllCheck, setSelectAllCheck] = useState(false)
    const ifChecked = (inputEl) => inputEl.checked

    const allCheckState = (bool) => {
        let arr = []
        for (let i = 0; i < props.CHECKBOXES.length; i++) {
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
        props.CHECKBOXES.forEach(input => arr.push(input.value))
        setMessage(arr)
    }
    const selectAllStateUpdate = (inputEl) => {
        if (checked.every(item => item === true) && selectAllCheck) {
            clearHandler(false)
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
                <CheckBoxFn name={'select-all'} value='Select All' onClickHandler={inputClicker} checked={selectAllCheck} />
                {
                    props.CHECKBOXES.map((input, id) => {
                        return <CheckBoxFn key={`check-${id}`} name={input.name} value={input.value} onClickHandler={inputClicker} checked={checked[id] || false} id={input.id} />
                    })
                }
            </ul>
            <button className='Card__button' onClick={clearHandler}>Clear All</button>
        </section>
    )
}

export default CardFn

