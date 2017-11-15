import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextComp from './text';
import LinkComp from './link';
import ImgComp from './img';
import './mid.css';

class Mid extends Component {
  static propTypes = {
    compList: PropTypes.array,
    changeTextVal: PropTypes.func,
    outFocus: PropTypes.func,
    getFocus: PropTypes.func
  }
  render() {
    return (
      <div className="mid">
        { this.props.compList.length !== 0 ? this.props.compList.map((item, index) => {
            if (item.type === 'text') {
              return <TextComp key={ index } order={ index } attr = { item } changeTextVal={ this.props.changeTextVal } outFocus={ this.props.outFocus } getFocus={ this.props.getFocus } />;
            } else if (item.type === 'link') {
              return <LinkComp key={ index } attr = { item }/>;
            } else if (item.type === 'img') {
              return <ImgComp key={ index } attr = { item }/>;
            }
        }) : null }
      </div>
    );
  }
}

export default Mid;
