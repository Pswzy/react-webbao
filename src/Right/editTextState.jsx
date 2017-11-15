import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './right.css';

class EditTextState extends Component {
    static propTypes = {
        activeElem: PropTypes.object,
        changeFamily: PropTypes.func,
        changeSize: PropTypes.func,
        changeColor: PropTypes.func,
        changeStyle: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            fontFamily: ['微软雅黑', '宋体'],
            fontSize: [],
            fontColor: ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple', 'black', 'white'],
            fontStyle: ['bold', 'normal', 'italic']
        }
    }

    componentWillMount() {
        let fontSize = [];
        let i = 12;
        while (i <= 72) {
            fontSize.push(i);
            i ++;
        }
        this.setState({fontSize: fontSize});
    }

    render() {
        return (
            <div className="edit-text-state">
                <select className="form-control family" value={ this.props.activeElem.fontFamily } onChange={ (evt) => { this.props.changeFamily(evt.target.value) }} >
                    <option value ="微软雅黑">微软雅黑</option>
                    <option value ="宋体">宋体</option>
                </select>
                <Select
                    value={ this.props.activeElem.fontSize }
                    options={ this.state.fontSize.map(item => { return { value: item, label: item }; }) }
                    onChange={ (evt) => {
                        this.props.changeSize(evt.value);
                    }}
                    clearable={ false }
                />
                <select className="form-control" value={ this.props.activeElem.fontColor } style={{backgroundColor: this.props.activeElem.fontColor }} onChange={ (evt) => { this.props.changeColor(evt.target.value) }}>
                    <option value ="red" style={{ backgroundColor: 'red'}}></option>
                    <option value ="orange" style={{ backgroundColor: 'orange'}}></option>
                    <option value="yellow" style={{ backgroundColor: 'yellow'}}></option>
                    <option value="green" style={{ backgroundColor: 'green'}}></option>
                    <option value ="aqua" style={{ backgroundColor: 'aqua'}}></option>
                    <option value ="blue" style={{ backgroundColor: 'blue'}}></option>
                    <option value="purple" style={{ backgroundColor: 'purple'}}></option>
                    <option value="black" style={{ backgroundColor: 'black'}}></option>
                    <option value ="white" style={{ backgroundColor: 'white'}}></option>
                </select>
                <Select
                    value={ this.props.activeElem.fontStyle }
                    options={ this.state.fontStyle.map(item => { return { value: item, label: item }; }) }
                    onChange={ (evt) => {
                        this.props.changeStyle(evt.value);
                    }}
                    clearable={ false }
                />
            </div>
        );
    }
}

export default EditTextState;
