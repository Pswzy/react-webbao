// 选择颜色组件
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Header, Body } from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import './right.css';

class ChooseColor extends Component {
    static propTypes = {
        hideModal: PropTypes.func,
        changeCompState: PropTypes.func,
        colorType: PropTypes.string,
        selectedColor: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: '',
            color: ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple', 'black', 'white'],
            definColor: ''
        }
    }

    componentWillMount() {
        if (this.state.color.indexOf(this.props.selectedColor) === -1) {
            this.setState({ definColor: this.props.selectedColor });
        } else {
            this.setState({ selectedColor: this.props.selectedColor });
        }
    }

    saveColor: Function = () => {
        let color = this.state.selectedColor ? this.state.selectedColor : this.state.definColor;
        this.props.changeCompState(this.props.colorType, color);
        this.props.hideModal();
    }

    changeVal: Function = (value) => {
        this.setState({ definColor: value, selectedColor: '' });
    }

    clickColor: Function = (color) => {
        this.setState({ selectedColor: color, definColor: '' })
    }

    render() {
        return (
            <div className="select-color-page">
                <Header>
                    <h5>选择颜色</h5>
                    <div className="pull-right">
                        {this.state.selectedColor || this.state.definColor ? <Button onClick={this.saveColor}>确定</Button> : <Button disabled onClick={this.saveColor}>确定</Button>}
                        <Button onClick={this.props.hideModal}>取消</Button>
                    </div>
                </Header>
                <Body>
                    <div>{
                        this.state.color.map((item, index) => {
                            return this.state.selectedColor === item ?
                                <span key={index} className="color-span" style={{ backgroundColor: item, border: '3px solid red' }} ></span>
                                : <span key={index} className="color-span" style={{ backgroundColor: item, border: '1px solid grey' }} onClick={() => { this.clickColor(item) }}></span>
                        })}
                        <label>自定义颜色：<input className="form-control" onChange={(evt) => { this.changeVal(evt.target.value) }} /></label>
                    </div>
                </Body>
            </div>
        );
    }
}

export default ChooseColor;
