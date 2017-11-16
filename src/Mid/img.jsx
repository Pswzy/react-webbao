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
        let elem = document.getElementById('mid');
        let midCompWidth = elem.offsetWidth;
        let midCompHeight = elem.offsetHeight;
        let left = this.props.attr.left + (event.clientX - this.state.clientX) / midCompWidth * 100;
        let top = this.props.attr.top + (event.clientY - this.state.clientY) / midCompHeight * 100;
        this.props.setPosition({ order: this.props.order, left: left, top: top });
    }

    render() {
        const attr = this.props.attr;
        let scale = attr.scale/100;
        let style = {
            width: '100%',
            height: '100%',
            transform: 'scale(' + scale + ')',
            transformOrigin: '0 0',
            zIndex: attr.zIndex
        };
        if (attr.active) {
            style.border = '1px dashed red';
        }
        let positionStyle = {
            width: attr.perWidth ? attr.perWidth + '%' : null,
            height: attr.perHeight ? attr.perHeight + '%' : null,
            left: attr.left + '%',
            top: attr.top + '%',
            position: 'absolute'
        };
        return (
            <div className="img-comp" style={positionStyle} draggable={!this.props.attr.active} onDragStart={(event) => { return !this.props.attr.active ? this.dragStart(event) : null }} onDragEnd={(event) => { return !this.props.attr.active ? this.dragEnd(event) : null }}>
                <img style={style} src={attr.src} alt="图片组件" onClick={(event) => { event.stopPropagation() }} onDoubleClick={() => { this.props.getFocus(this.props.order) }} />
            </div>
        );
    }
}

export default ImgComp;
