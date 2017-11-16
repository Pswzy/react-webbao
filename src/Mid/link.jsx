import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        let elem = document.getElementById('mid');
        let midCompWidth = elem.offsetWidth;
        let midCompHeight = elem.offsetHeight;
        let left = this.props.attr.left + (event.clientX - this.state.clientX) / midCompWidth * 100;
        let top = this.props.attr.top + (event.clientY - this.state.clientY) / midCompHeight * 100;
        this.props.setPosition({ order: this.props.order, left: left, top: top });
    }

    time: Object = null;
    openLink: Function = (event, url) => {
        event.stopPropagation();
        event.preventDefault();
        clearTimeout(this.time);  
        this.time = setTimeout(function(){ 
            window.open(url); 
        },300);
        return false;
    }

    editLink: Function = (event) => {
        clearTimeout(this.time); 
        event.preventDefault();
        this.props.getFocus(this.props.order);
    }
    render() {
        const attr = this.props.attr;
        let style = {
            width: '100%',
            height: '100%',
            backgroundColor: attr.backColor,
            display: 'inline-block',
            textDecoration: 'none',
            lineHeight: attr.height + 'px',
            textAlign: 'center'
        };
        if (this.props.attr.active) {
            style.border = '1px dashed red';
        }
        let positionStyle = {
            width: attr.perWidth ? attr.perWidth + '%' : null,
            height: attr.perHeight ? attr.perHeight + '%' : null,
            left: this.props.attr.left + '%',
            top: this.props.attr.top + '%',
            zIndex: attr.zIndex,            
            position: 'absolute'
        };
        return (
            <div className="link-comp" style={positionStyle} draggable={!this.props.attr.active} onDragStart={(event) => { return !this.props.attr.active ? this.dragStart(event) : null }} onDragEnd={(event) => { return !this.props.attr.active ? this.dragEnd(event) : null }}>
                <a onClick={(event) => { this.openLink(event, attr.url) }} target='_blank' href={attr.url} onDoubleClick={(event) => { this.editLink(event) } } style={style}>{attr.btnName}</a>
            </div>
        );
    }
}

export default LinkComp;
