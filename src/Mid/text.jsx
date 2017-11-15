import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './mid.css';

class TextComp extends Component {
    static propTypes = {
        attr: PropTypes.object,
        order: PropTypes.number,
        changeTextVal: PropTypes.func,
        outFocus: PropTypes.func,
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

    dragStart: Function = (event) => {
        this.setState({
            clientX: event.clientX,
            clientY: event.clientY
        });
    }
    dragEnd: Function = (event) => {
        let left = this.props.attr.left + event.clientX - this.state.clientX;
        let top = this.props.attr.top + event.clientY - this.state.clientY;
        this.props.setPosition({ order: this.props.order, left: left, top: top });
    }
    render() {
        let style = {};
        if (this.props.attr.fontStyle === 'bold') {
            style = {
                fontFamily: this.props.attr.fontFamily,
                fontSize: this.props.attr.fontSize,
                fontWeight: this.props.attr.fontStyle,
                color: this.props.attr.fontColor,
                zIndex: this.props.attr.zIndex
            };
        } else {
            style = {
                fontFamily: this.props.attr.fontFamily,
                fontSize: this.props.attr.fontSize + 'px',
                fontStyle: this.props.attr.fontStyle,
                color: this.props.attr.fontColor,
                zIndex: this.props.attr.zIndex
            };
        }
        let positionStyle = {
            left: this.props.attr.left,
            top: this.props.attr.top,
            position: 'absolute'
        };
        return (
            <div className="text-comp" onClick={(event) => { event.stopPropagation() }} style={positionStyle} draggable={!this.props.attr.active} onDragStart={(event) => { this.dragStart(event) }} onDragEnd={(event) => { this.dragEnd(event) }}>
                {
                    this.props.attr.active ? <textarea className="edit-text form-control" style={style} value={this.props.attr.value}
                        onChange={(evt) => this.props.changeTextVal(evt.target.value, this.props.order)} />
                        : <textarea className="view-text form-control" readOnly style={style} value={this.props.attr.value} onDoubleClick={() => { this.props.getFocus(this.props.order) }} />
                }
            </div>
        );
    }
}

export default TextComp;
