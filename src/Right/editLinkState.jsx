import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import ChooseColor from './chooseColor';
import './right.css';

class EditLinkState extends Component {
    static propTypes = {
        activeElem: PropTypes.object,
        changeCompState: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            selectColorModal: false
        }
    }

    showSelectColor: Function = () => {
        this.setState({ selectColorModal: true });
    }

    hideModal: Function = () => {
        this.setState({ selectColorModal: false });
    }

    render() {
        return (
            <div className="edit-link-state" onClick={(event) => { event.stopPropagation() }}>
                <div className="link-state-label-input">
                    <label>名称:</label>
                    <input type="text" value={this.props.activeElem.btnName} className="form-control" placeholder="请修改按钮名称" onChange={(evt) => { this.props.changeCompState('btnName', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>高度:</label>
                    <input type="number" value={this.props.activeElem.height} className="form-control" onChange={(evt) => { this.props.changeCompState('height', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>宽度:</label>
                    <input type="number" value={this.props.activeElem.width} className="form-control" onChange={(evt) => { this.props.changeCompState('width', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>URL:</label>
                    <input type="text" value={this.props.activeElem.url} className="form-control" onChange={(evt) => { this.props.changeCompState('url', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>颜色:</label>
                    <Button className="form-control" style={{ backgroundColor: this.props.activeElem.backColor }} onClick={this.showSelectColor}></Button>
                </div>
                <Modal className="select-color-modal" show={this.state.selectColorModal} onHide={this.hideModal}>
                    <ChooseColor hideModal={this.hideModal} changeCompState={this.props.changeCompState} colorType="backColor" selectedColor={this.props.activeElem.backColor} />
                </Modal>
            </div>
        );
    }
}

export default EditLinkState;
