import React, { Component } from 'react'
import CheckBoxClass from '../CheckBoxClass/CheckBoxClass'

export default class CardClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: [],
            checked: [],
            selectAllCheck: false,
        }
    }
    componentDidMount() {
        this.allCheckState(false)
    }
    ifChecked = (inputEl) => inputEl.checked
    allCheckState = (bool) => {
        let arr = []
        for (let i = 0; i < this.props.CHECKBOXES.length; i++) {
            arr.push(bool)
        }
        this.setState({ checked: arr, selectAllCheck: bool })
    }
    clearHandler = () => {
        this.allCheckState(false)
        this.setState({ message: [''] })
    }
    allMessages = () => {
        let arr = []
        this.props.CHECKBOXES.forEach(input => arr.push(input.value))
        this.setState({ message: arr })
    }
    selectAllStateUpdate = (inputEl) => {
        if (this.state.checked.every(item => item === true) && this.state.selectAllCheck) {
            this.clearHandler(false)
            return
        }
        if (inputEl.checked === true) {
            this.allCheckState(true)
            this.allMessages()
        } else {
            this.setState({ selectAllState: false })
        }
    }
    inputStateUpdate = (inputEl, id) => {
        if (this.ifChecked(inputEl)) {
            this.setState({ message: [...this.state.message, inputEl.value] })
        } else {
            this.setState({ message: this.state.message.filter(message => message !== inputEl.value) })
        }
        let items = this.state.checked
        items[id] = inputEl.checked
        items.every(item => item === true) ? this.setState({ selectAllCheck: true }) : this.setState({ selectAllCheck: false })
        this.setState({ checked: items })
    }
    inputClicker = (e) => {
        let inputEl = e.target
        let id = parseInt(inputEl.id)
        if (inputEl.value === 'Select All') {
            this.selectAllStateUpdate(inputEl)
        } else {
            this.inputStateUpdate(inputEl, id)
        }
    }
    render() {
        return (
            <section className='Card'>
                <span className='Card__notification'>Selected Value: {this.state.message.join(', ')}</span>
                <ul className='Card__list'>
                    <CheckBoxClass name={'select-all'} value='Select All' onClickHandler={this.inputClicker} checked={this.state.selectAllCheck} />
                    {
                        this.props.CHECKBOXES.map((input, id) => {
                            return <CheckBoxClass key={`check-${id}`} name={input.name} value={input.value} onClickHandler={this.inputClicker} checked={this.state.checked[id] || false} id={input.id} />
                        })
                    }
                </ul>
                <button className='Card__button' onClick={this.clearHandler}>Clear All</button>
            </section>
        )
    }
}
