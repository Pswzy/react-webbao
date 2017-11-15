import React, { Component } from 'react';
import EditTextState from './editTextState';
import EditLinkState from './editLinkState';
import EditImgState from './editImgState';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './right.css';

class Right extends Component {
    static propTypes = {
        activeElem: PropTypes.object,
        changeTextState: PropTypes.func,
        exportHtml: PropTypes.func
    }

    render() {
        return (
            <div className="right">
                {this.props.activeElem ? <h3>{this.props.activeElem.name}</h3> : null}
                {this.props.activeElem && this.props.activeElem.type === 'text' ?
                    <EditTextState activeElem={this.props.activeElem}
                        changeTextState={this.props.changeTextState}
                    /> : null}
                {this.props.activeElem && this.props.activeElem.type === 'link' ?
                    <EditLinkState activeElem={this.props.activeElem}
                        changeLinkState={this.props.changeLinkState}
                    /> : null}
                {this.props.activeElem && this.props.activeElem.type === 'img' ?
                    <EditImgState activeElem={this.props.activeElem}
                        changeImgState={this.props.changeImgState}
                    /> : null}
                <div className="export-btn"><Button onClick={ this.props.exportHtml }>导出</Button></div>
            </div>
        );
    }
}

export default Right;
