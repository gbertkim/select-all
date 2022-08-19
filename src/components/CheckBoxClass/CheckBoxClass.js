import React, { Component } from 'react'

export default class CheckBoxClass extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <li className='listItem'>
                <input className='listItem__input' type='checkbox' name={this.props.name} value={this.props.value} onChange={(e) => this.props.onClickHandler(e)} id={this.props.id} checked={this.props.checked} />
                <label className='listItem__label' htmlFor={this.props.name}>{this.props.value}</label>
            </li>
        )
    }
}
