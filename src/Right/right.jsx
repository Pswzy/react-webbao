import React, { Component } from 'react';
import EditTextState from './editTextState';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './right.css';

class Right extends Component {
  static propTypes = {
    activeElem: PropTypes.object,
    changeFamily: PropTypes.func,
    changeSize: PropTypes.func,
    changeColor: PropTypes.func,
    changeStyle: PropTypes.func
  }
  render() {
    return (
      <div className="right">
        { this.props.activeElem ? <h3>{ this.props.activeElem.name }</h3> : null }
        { this.props.activeElem && this.props.activeElem.type === 'text' ? 
          <EditTextState activeElem={ this.props.activeElem } 
            changeFamily={ this.props.changeFamily }
            changeSize={ this.props.changeSize }
            changeColor={ this.props.changeColor }
            changeStyle={ this.props.changeStyle }
            /> : null }
        <div className="export-btn"><Button>导出</Button></div>
      </div>
    );
  }
}

export default Right;
