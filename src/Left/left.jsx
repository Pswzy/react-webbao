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
    compList: PropTypes.array
  }
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  createComp: Function = () => {
    this.setState({ showModal: true });
  }

  hideModal: Function = () => {
    this.setState({ showModal: false });
  }

  // createComponent: Function = (type, value, name) => {
  //   let compList= [ ...this.state.compList ];
  //   compList.push({
  //     name: name,
  //     value: value,
  //     type: type
  //   });
  //   this.setState({ compList: compList });
  //   this.props.createComponent(type, value, name);
  // }

  render() {
    return (
      <div className="left">
        <h3>组件列表</h3>
        <div className="comp-list">
            { this.props.compList.length !== 0 ? this.props.compList.map((item, index) => {
              return <div className="comp" key={ index }>
                <span onClick={ () => { this.props.getFocus(index) }}>{ item.name }</span>
                <span onClick={ () => { this.props.removeComp(index) }}>X</span>
              </div>
            }) : null }
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
