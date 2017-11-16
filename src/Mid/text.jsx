import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './mid.css';

class TextComp extends Component {
    static propTypes = {
        attr: PropTypes.object,
        order: PropTypes.number,
        changeCompState: PropTypes.func,
        getFocus: PropTypes.func,
        setPosition: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            clientX: 0,
            clientY: 0
        }
    }

    componentDidMount() {
        let reg = /^[0-9]+/g;
        let result = reg.exec(document.getElementById('text' + this.props.order).scrollHeight);
        let height = result ? result[0] : null;
        if (height !== parseInt(this.props.attr.height, 10) - 2) {
            this.props.changeCompState('height', parseInt(height, 10) + 2);
        }
        setTimeout(() => {
            this.refs.myTextInput.focus();
        }, 300);
    }

    dragStart: Function = (event) => {
        this.setState({
            clientX: event.clientX,
            clientY: event.clientY
        });
    }
    dragEnd: Function = (event) => {
        let elem = document.getElementById('mid');
        let midCompWidth = elem.offsetWidth;
        let midCompHeight = elem.offsetHeight;
        let left = this.props.attr.left + (event.clientX - this.state.clientX) / midCompWidth * 100;
        let top = this.props.attr.top + (event.clientY - this.state.clientY) / midCompHeight * 100;
        this.props.setPosition({ order: this.props.order, left: left, top: top });
    }

    changeVal: Function = (event) => {
        this.props.changeCompState('value', event.target.value);
        let reg = /^[0-9]+/g;
        let result = reg.exec(document.getElementById('text' + this.props.order).scrollHeight);
        let height = result ? result[0] : null;
        if (height !== parseInt(this.props.attr.height, 10) - 2) {
            this.props.changeCompState('height', parseInt(height, 10) + 2);
        }
    }
    getFocus: Function = (order) => {
        this.props.getFocus(order);
    }
    render() {
        let style = {
            'width': '100%',
            'height': '100%',
            'wordBreak': 'break-all',
            'padding': '6px 12px',
            'textAlign': 'left',
            'fontFamily': this.props.attr.fontFamily,
            'fontSize': this.props.attr.fontSize + 'px',
            'fontStyle': this.props.attr.fontStyle,
            'color': this.props.attr.fontColor,
            'zIndex': this.props.attr.zIndex
        };
        if (this.props.attr.fontStyle === 'bold') {
            style.fontWeight = this.props.attr.fontStyle;
        } else {
            style.fontStyle = this.props.attr.fontStyle;
        }
        let positionStyle = {
            left: this.props.attr.left + '%',
            top: this.props.attr.top + '%',
            position: 'absolute',
            width: this.props.attr.perWidth + '%',
            height: this.props.attr.perHeight + '%'
        };
        style.border = this.props.attr.active ? '1px dashed red' : '1px solid #ccbfbf';
        return (
            <div className="text-comp" id={'div' + this.props.order} onClick={(event) => { event.stopPropagation() }} style={positionStyle} draggable={!this.props.attr.active} onDragStart={(event) => { this.dragStart(event) }} onDragEnd={(event) => { this.dragEnd(event) }}>
                {/* {
                    this.props.attr.active ? <textarea autoFocus="true"  className="edit-text form-control" style={style} value={this.props.attr.value}
                        onChange={(evt) => this.props.changeTextVal(evt.target.value, this.props.order)} />
                        : <textarea className="view-text form-control" readOnly style={style} value={this.props.attr.value} onDoubleClick={() => { this.props.getFocus(this.props.order) }} />
                } */}
                <textarea ref='myTextInput' id={'text' + this.props.order} style={style} value={this.props.attr.value} readOnly={!this.props.attr.active} onDoubleClick={() => { return !this.props.attr.active ? this.getFocus(this.props.order) : null }} onChange={(evt) => this.changeVal(evt)} />
                {/* <div autoFocus="true" className="edit-div" style={style} contentEditable ={this.props.attr.active} onDoubleClick={() => { this.props.getFocus(this.props.order) }}>this.props.attr.value</div> */}
            </div>
        );
    }
}

export default TextComp;
