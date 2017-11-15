import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './right.css';

class EditLinkState extends Component {
    static propTypes = {
        activeElem: PropTypes.object,
        changeLinkState: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="edit-link-state" onClick={(event) => { event.stopPropagation() }}>
                <div className="link-state-label-input">
                    <label>名称:</label>
                    <input type="text" value={this.props.activeElem.btnName} className="form-control" placeholder="请修改按钮名称" onChange={(evt) => { this.props.changeLinkState('btnName', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>高度:</label>
                    <input type="number" value={this.props.activeElem.height} className="form-control" onChange={(evt) => { this.props.changeLinkState('height', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>宽度:</label>
                    <input type="number" value={this.props.activeElem.width} className="form-control" onChange={(evt) => { this.props.changeLinkState('width', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>URL:</label>
                    <input type="text" value={this.props.activeElem.url} className="form-control" onChange={(evt) => { this.props.changeLinkState('url', evt.target.value) }} />
                </div>
                <div className="link-state-label-input">
                    <label>颜色:</label>
                    <select className="form-control" value={this.props.activeElem.backColor} style={{ backgroundColor: this.props.activeElem.backColor }} onChange={(evt) => { this.props.changeLinkState('backColor', evt.target.value) }}>
                        <option value="red" style={{ backgroundColor: 'red' }}></option>
                        <option value="orange" style={{ backgroundColor: 'orange' }}></option>
                        <option value="yellow" style={{ backgroundColor: 'yellow' }}></option>
                        <option value="green" style={{ backgroundColor: 'green' }}></option>
                        <option value="aqua" style={{ backgroundColor: 'aqua' }}></option>
                        <option value="blue" style={{ backgroundColor: 'blue' }}></option>
                        <option value="purple" style={{ backgroundColor: 'purple' }}></option>
                        <option value="black" style={{ backgroundColor: 'black' }}></option>
                        <option value="white" style={{ backgroundColor: 'white' }}></option>
                    </select>
                </div>
            </div>
        );
    }
}

export default EditLinkState;
