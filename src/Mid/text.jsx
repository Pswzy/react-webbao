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
    }
    getFocus: Function = (order) => {
        this.props.getFocus(order);
    }
    render() {
        let style = {
            'left': this.props.attr.left + '%',
            'top': this.props.attr.top + '%',
            'position': 'absolute',
            'minHeight': this.props.attr.perHeight + '%',
            'width': this.props.attr.perWidth + '%',
            'wordBreak': 'break-all',
            'textAlign': 'left',
            'fontFamily': this.props.attr.fontFamily,
            'fontSize': this.props.attr.fontSize + 'px',
            'fontStyle': this.props.attr.fontStyle,
            'color': this.props.attr.fontColor,
            'zIndex': this.props.attr.zIndex,
            'backgroundColor': 'white'
        };
        if (this.props.attr.fontStyle === 'bold') {
            style.fontWeight = this.props.attr.fontStyle;
        } else {
            style.fontStyle = this.props.attr.fontStyle;
        }
       
        style.border = this.props.attr.active ? '1px dashed red' : '1px solid #ccbfbf';
        return (
            <div ref='myTextInput' onClick={(event) => { event.stopPropagation() }} 
                 draggable={!this.props.attr.active} onDragStart={(event) => { return !this.props.attr.active ? this.dragStart(event) : null }}
                 onDragEnd={(event) => { return !this.props.attr.active ? this.dragEnd(event) : null }} 
            id={'text' + this.props.order} style={style} contentEditable ={this.props.attr.active}
            onDoubleClick={() => { return !this.props.attr.active ? this.getFocus(this.props.order) : null }}
             onChange={(evt) => this.changeVal(evt)}>{this.props.attr.value}</div> 
        );
    }
}

export default TextComp;
