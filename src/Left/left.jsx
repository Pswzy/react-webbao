import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateModal from './createModal';
import PropTypes from 'prop-types';
import './left.css';

class Left extends Component {
    static propTypes = {
        createComponent: PropTypes.func,
        removeComp: PropTypes.func,
        getFocus: PropTypes.func,
        compList: PropTypes.array,
        setListOrder: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            clientY: 0
        }
    }
    createComp: Function = () => {
        this.setState({ showModal: true });
    }

    hideModal: Function = () => {
        this.setState({ showModal: false });
    }

    dragStart: Function = (event, index) => {
        this.setState({
            clientY: event.clientY
        });
    }
    dragEnd: Function = (event, index) => {
        let moveHeight = event.clientY - this.state.clientY;
        let end = 0;
        let number = Math.abs(Math.round(moveHeight / 40));
        console.log(moveHeight, number);
        if (moveHeight > 0) {
            if (number + index < this.props.compList.length) {
                end = number + index;
            } else {
                end = this.props.compList.length - 1;
            }
        } else {
            moveHeight = -1 * moveHeight;
            if (number >= index) {
                end = 0;
            } else {
                end = index - number;
            }
        }
        if (index !== end) {
            this.props.setListOrder(index, end);
        }
    }

    clickComp: Function = (event, index) => {
        event.stopPropagation();
        this.props.getFocus(index)
    }

    deleteComp: Function = (event, index) => {
        event.stopPropagation();
        this.props.removeComp(index);
    }

    render() {
        return (
            <div className="left" onDragOver={(event) => { event.preventDefault(); }}>
                <h3>组件列表</h3>
                <div className="comp-list">
                    {this.props.compList.length !== 0 ? this.props.compList.map((item, index) => {
                        return <div className="comp" key={index} style={{'backgroundColor': item.active ? '#157ed8': null}} draggable="true" onDragStart={(event) => { this.dragStart(event, index) }} onDragEnd={(event) => { this.dragEnd(event, index) }}>
                            <span onClick={(event) => { this.clickComp(event, index) }}>{item.name}</span>
                            <span onClick={(event) => { this.deleteComp(event, index) }}>X</span>
                        </div>
                    }) : null}
                </div>
                <div className="create-btn"><Button onClick={this.createComp}>新增组件</Button></div>
                <Modal className="create-modal" show={this.state.showModal} onHide={this.hideModal}>
                    <CreateModal hideModal={this.hideModal} createComponent={this.props.createComponent} />
                </Modal>
            </div>
        );
    }
}

export default Left;
