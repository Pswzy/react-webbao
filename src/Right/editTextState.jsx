import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './right.css';
import { Button, Modal } from 'react-bootstrap';
import ChooseColor from './chooseColor';

class EditTextState extends Component {
    static propTypes = {
        activeElem: PropTypes.object,
        changeCompState: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            fontFamily: ['微软雅黑', '宋体'],
            fontSize: [],
            fontColor: ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple', 'black', 'white'],
            fontStyle: ['bold', 'normal', 'italic'],
            selectColorModal: false
        }
    }

    componentWillMount() {
        let fontSize = [];
        let i = 12;
        while (i <= 72) {
            fontSize.push(i);
            i++;
        }
        this.setState({ fontSize: fontSize });
    }

    showSelectColor: Function = () => {
        this.setState({ selectColorModal: true });
    }

    hideModal: Function = () => {
        this.setState({ selectColorModal: false });
    }

    render() {
        return (
            <div className="edit-text-state" onClick={(event) => { event.stopPropagation() }}>
                <select className="form-control family" value={this.props.activeElem.fontFamily} onChange={(evt) => { this.props.changeCompState('fontFamily', evt.target.value) }} >
                    <option value="微软雅黑">微软雅黑</option>
                    <option value="宋体">宋体</option>
                </select>
                <Select
                    value={this.props.activeElem.fontSize}
                    options={this.state.fontSize.map(item => { return { value: item, label: item }; })}
                    onChange={(evt) => {
                        this.props.changeCompState('fontSize', evt.value);
                    }}
                    clearable={false}
                />
                <Button className="select-color form-control" style={{ backgroundColor: this.props.activeElem.fontColor }} onClick={this.showSelectColor}></Button>
                <Select
                    value={this.props.activeElem.fontStyle}
                    options={this.state.fontStyle.map(item => { return { value: item, label: item }; })}
                    onChange={(evt) => {
                        this.props.changeCompState('fontStyle', evt.value);
                    }}
                    clearable={false}
                />
                <Modal className="select-color-modal" show={this.state.selectColorModal} onHide={this.hideModal}>
                    <ChooseColor hideModal={this.hideModal} changeCompState={this.props.changeCompState} colorType="fontColor" selectedColor={this.props.activeElem.fontColor} />
                </Modal>
            </div>
        );
    }
}

export default EditTextState;
