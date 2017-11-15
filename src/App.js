import React, { Component } from 'react';
import './App.css';
import Left from './Left/left';
import Mid from './Mid/mid';
import Right from './Right/right';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compList: [],
      activeElem: 0
    }
  }
  createComponent: Function = (type, value, name) => {
    let compList = [...this.state.compList];
    switch (type) {
      case 'text':
        let comp = {
          type: type,
          value: value,
          name: name,
          active: true,
          fontFamily: '微软雅黑',
          fontColor: 'black',
          fontSize: 16,
          fontStyle: 'normal'
        }
        compList.push(comp);
        this.setState({ compList: compList, activeElem: compList.length - 1 });
        break;
      default:
        break;
    }
  }

  changeTextVal: Function = (value, order) => {
    let compList = [...this.state.compList];
    compList[order].value = value;
    this.setState({ compList: compList });
  }

  outFocus: Function = (order) => {
    console.log('out');
    let compList = [...this.state.compList];
    compList[order].active = false;
    this.setState({ compList: compList });
  }

  getFocus: Function = (order) => {
    console.log(order);    
    let compList = [...this.state.compList];
    compList.forEach((item) => {
      item.active = false;
    });
    compList[order].active = true;
    this.setState({ compList: compList, activeElem: order });
  }

  removeComp: Function = (order) => {
    let compList = [...this.state.compList];
    compList.splice(order, 1);
    this.setState({ compList: compList });
  }

  changeFamily: Function = (value) => {
    let compList = [...this.state.compList];
    compList[this.state.activeElem].fontFamily = value;
    this.setState({ compList: compList });
  }

  changeSize: Function = (value) => {
    let compList = [...this.state.compList];
    compList[this.state.activeElem].fontSize = value;
    this.setState({ compList: compList });
  }

  changeColor: Function = (value) => {
    let compList = [...this.state.compList];
    compList[this.state.activeElem].fontColor = value;
    this.setState({ compList: compList });
  }

  changeStyle: Function = (value) => {
    let compList = [...this.state.compList];
    compList[this.state.activeElem].fontStyle = value;
    this.setState({ compList: compList });
  }

  render() {
    return (
      <div className="App">
        <Left compList={ this.state.compList } createComponent={ this.createComponent } removeComp={ this.removeComp } getFocus={ this.getFocus }/>
        <Mid compList={ this.state.compList } changeTextVal={ this.changeTextVal } outFocus={ this.outFocus } getFocus={ this.getFocus }/>
        <Right activeElem={ this.state.compList[this.state.activeElem] }
          changeFamily={ this.changeFamily }
          changeSize={ this.changeSize }
          changeColor={ this.changeColor }
          changeStyle={ this.changeStyle } />
      </div>
    );
  }
}

export default App;
