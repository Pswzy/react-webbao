import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextComp from './text';
import LinkComp from './link';
import ImgComp from './img';
import './mid.css';

class Mid extends Component {
    static propTypes = {
        compList: PropTypes.array,
        getFocus: PropTypes.func,
        setPosition: PropTypes.func,
        changeCompState: PropTypes.func,
        costomizeState: PropTypes.bool,
        activeOrder: PropTypes.number,
        endCostomize: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            clientX: 0,
            clientY: 0,
            start: false
        }
    }

    mouseDown: Function = (event) => {
        let elem = document.getElementById('mid');
        let midCompWidth = elem.offsetWidth;
        let midCompHeight = elem.offsetHeight;
        let left = (event.clientX - elem.offsetLeft + 0.5 * elem.offsetWidth) / midCompWidth * 100;
        let top = (event.clientY - elem.offsetTop + 0.5 * elem.offsetHeight) / midCompHeight * 100;
        this.props.setPosition({ order: this.props.activeOrder, left: left, top: top });
        this.setState({ clientX: event.clientX, clientY: event.clientY, start: true });
    }

    mouseMove: Function = (event) => {
        // 划区超出画布暂时没有考虑
        let width = event.clientX - this.state.clientX;
        let height = event.clientY - this.state.clientY;
        this.props.changeCompState('width', width);
        this.props.changeCompState('height', height);
    }

    mouseUp: Function = (event) => {
        let width = event.clientX - this.state.clientX;
        let height = event.clientY - this.state.clientY;
        this.props.endCostomize(width, height);
        this.setState({start: false});
    }

    render() {
        return (
            <div className="mid" id="mid" onDragOver={(event) => { event.preventDefault(); }} onMouseDown={(event) => { return this.props.costomizeState ? this.mouseDown(event) : null }} onMouseMove={(event) => { return this.props.costomizeState && this.state.start ? this.mouseMove(event) : null }} onMouseUp={(event) => { return this.props.costomizeState ? this.mouseUp(event) : null }}>
                <div className="content">
                    {this.props.compList.length !== 0 ? this.props.compList.map((item, index) => {
                        if (item.type === 'text') {
                            return <TextComp key={index} order={index} attr={item} setPosition={this.props.setPosition} changeCompState={this.props.changeCompState} getFocus={this.props.getFocus} />;
                        } else if (item.type === 'link') {
                            return <LinkComp key={index} order={index} attr={item} setPosition={this.props.setPosition} getFocus={this.props.getFocus} />;
                        } else if (item.type === 'img') {
                            return <ImgComp key={index} order={index} attr={item} setPosition={this.props.setPosition} getFocus={this.props.getFocus} />;
                        }
                    }) : null}
                </div>
            </div>
        );
    }
}

export default Mid;
