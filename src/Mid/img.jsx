import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './mid.css';

class ImgComp extends Component {
    static propTypes = {
        attr: PropTypes.object,
        order: PropTypes.number,
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
        const attr = this.props.attr;
        let style = {
            width: attr.width + 'px',
            height: attr.height + 'px',
            zIndex: attr.zIndex
        };
        if (attr.active) {
            style.border = '1px dashed red';
        }
        let positionStyle = {
            left: attr.left,
            top: attr.top,
            position: 'absolute'
        };
        return (
            <div className="img-comp" style={positionStyle} draggable="true" onDragStart={(event) => { this.dragStart(event) }} onDragEnd={(event) => { this.dragEnd(event) }}>
                <img style={style} src={attr.src} onClick={(event) => { event.stopPropagation() }} onDoubleClick={() => { this.props.getFocus(this.props.order) }} />
            </div>
        );
    }
}

export default ImgComp;
