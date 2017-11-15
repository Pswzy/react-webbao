import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './mid.css';

class LinkComp extends Component {
  static propTypes = {
    attr: PropTypes.object
  }
  render() {
      console.log('sss');
    return (
      <div className="text-comp">
        {
            this.props.attr.active ? <textarea className="edit-text" /> : <p className="view-text">{ this.props.attr.value }</p>
        }
      </div>
    );
  }
}

export default LinkComp;
