import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './right.css';

class EditImgState extends Component {
    static propTypes = {
        activeElem: PropTypes.object,
        changeCompState: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="edit-img-state" onClick={(event) => { event.stopPropagation() }}>
                <div className="img-state-label-input">
                    <label>高度:</label>
                    <input type="number" value={this.props.activeElem.height} className="form-control" onChange={(evt) => { this.props.changeCompState('height', evt.target.value) }} />
                </div>
                <div className="img-state-label-input">
                    <label>宽度:</label>
                    <input type="number" value={this.props.activeElem.width} className="form-control" onChange={(evt) => { this.props.changeCompState('width', evt.target.value) }} />
                </div>
                <div className="img-state-label-input">
                    <label>缩放:</label>
                    <input type="number" className="img-state-scale form-control" value={this.props.activeElem.scale} onChange={(evt) => { this.props.changeCompState('scale', evt.target.value) }} />
                    <label>%</label>
                </div>
            </div>
        );
    }
}

export default EditImgState;
