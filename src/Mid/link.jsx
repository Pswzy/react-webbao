import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './mid.css';

class LinkComp extends Component {
    static propTypes = {
        attr: PropTypes.object,
        order: PropTypes.number,
        getFocus: PropTypes.func,
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

    time: Object = null;
    openLink: Function = (event, url) => {
        event.stopPropagation();
        clearTimeout(this.time);  
        this.time = setTimeout(function(){  
            window.open(url); 
        },300);
    }

    editLink: Function = () => {
        clearTimeout(this.time); 
        this.props.getFocus(this.props.order);
    }
    render() {
        const attr = this.props.attr;
        let style = {
            width: attr.width + 'px',
            height: attr.height + 'px',
            backgroundColor: attr.backColor,
            zIndex: attr.zIndex
        };
        if (this.props.attr.active) {
            style.border = '1px dashed red';
        }
        let positionStyle = {
            left: this.props.attr.left,
            top: this.props.attr.top,
            position: 'absolute'
        };
        return (
            <div className="link-comp" style={positionStyle} draggable="true" onDragStart={(event) => { this.dragStart(event) }} onDragEnd={(event) => { this.dragEnd(event) }}>
                <Button style={style} onClick={(event) => { this.openLink(event, attr.url) }} onDoubleClick={ this.editLink }>{attr.btnName}</Button>
            </div>
        );
    }
}

export default LinkComp;
