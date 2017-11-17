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
            activeElem: 0,
            zIndex: 1,
            costomizeState: false
        }
    }
    createComponent: Function = (type, value, name) => {
        let compList = [...this.state.compList];
        let zIndex = this.state.zIndex + 1;
        let elem = document.getElementById('mid');
        let comp = {};
        switch (type) {
            case 'text':
                comp = {
                    type: type,
                    value: value,
                    name: name,
                    active: true,
                    fontFamily: '微软雅黑',
                    fontColor: 'black',
                    fontSize: 16,
                    fontStyle: 'normal',
                    left: 0,
                    top: 0,
                    width: 200,
                    perWidth: (200 / elem.offsetWidth) * 100,
                    height: 20,
                    perHeight: (20 / elem.offsetHeight) * 100,
                    minHeight: 20,
                    zIndex: zIndex,
                    costomize: false
                }
                compList.push(comp);
                this.setState({ compList: compList, activeElem: compList.length - 1, zIndex: zIndex });
                break;
            case 'link':
                comp = {
                    btnName: value.name,
                    type: type,
                    name: name,
                    active: true,
                    width: value.width,
                    perWidth: (value.width / elem.offsetWidth) * 100,
                    height: value.height,
                    perHeight: (value.height / elem.offsetHeight) * 100,
                    backColor: value.backColor,
                    url: value.url,
                    left: 0,
                    top: 0,
                    zIndex: zIndex
                }
                compList.push(comp);
                this.setState({ compList: compList, activeElem: compList.length - 1, zIndex: zIndex });
                break;
            case 'img':
                comp = {
                    type: type,
                    name: name,
                    active: true,
                    width: value.width,
                    perWidth: (value.width / elem.offsetWidth) * 100,
                    height: value.height,
                    perHeight: (value.height / elem.offsetHeight) * 100,
                    src: value.src,
                    scale: 100,
                    left: 0,
                    top: 0,
                    zIndex: zIndex
                }
                compList.push(comp);
                this.setState({ compList: compList, activeElem: compList.length - 1, zIndex: zIndex });
                break;
            default:
                break;
        }
    }

    outFocusAll: Function = () => {
        if (this.state.compList.length !== 0 && !this.state.costomizeState) {
            let compList = [...this.state.compList];
            if (compList[this.state.activeElem]) {
                compList[this.state.activeElem].active = false;
                this.setState({ compList: compList, activeElem: -1 });
            }
        }
    }

    getFocus: Function = (order) => {
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

    changeCompState: Function = (type, value) => {
        if (this.state.activeElem !== -1) {
            let compList = [...this.state.compList];
            let elem = document.getElementById('mid');
            if (type === 'width') {
                compList[this.state.activeElem].perWidth = (value / elem.offsetWidth) * 100;
            } else if (type === 'height') {
                compList[this.state.activeElem].perHeight = (value / elem.offsetHeight) * 100;
            }
            compList[this.state.activeElem][type] = value;
            this.setState({ compList: compList });
        }
    }

    setPosition: Function = (obj) => {
        let compList = [...this.state.compList];
        compList[obj.order].left = obj.left;
        compList[obj.order].top = obj.top;
        this.setState({ compList: compList });
    }

    setListOrder: Function = (start, end) => {
        let compList = [...this.state.compList];
        compList[start].zIndex = compList[end].zIndex;
        if (start < end) {
            for (let i = start + 1; i <= end; i++) {
                compList[i].zIndex--;
            }
        } else {
            for (let i = end; i < start; i++) {
                compList[i].zIndex++;
            }
        }
        let startElem = compList.splice(start, 1);
        compList.splice(end, 0, startElem[0]);
        this.setState({ compList: compList });
    }

    fake_click: Function = (obj) => {
        let ev = document.createEvent("MouseEvents");
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
        );
        obj.dispatchEvent(ev);
    }

    pageToHtml: Function = () => {
        let html = "<!DOCTYPE html><html lang='en' style='height:100%;width:100%'><head><meta charset='utf-8'><meta name='viewport' \
        content='width=device-width,initial-scale=1,shrink-to-fit=no'>\
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'><title>网页宝</title></head>\
        <body style='height:100%;width:100%'><noscript>You need to enable JavaScript to run this app.</noscript><div id='root' style='height:100%;width:100%;'";
        html += document.getElementById('mid').innerHTML;
        html += "</div></body></html>";
        return html;
    }

    exportHtml: Function = () => {
        let data = this.pageToHtml();
        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([data]);
        let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = 'test.html';
        this.fake_click(save_link);
    }

    costomizeComponent: Function = (name) => {
        let compList = [...this.state.compList];
        let zIndex = this.state.zIndex + 1;
        let elem = document.getElementById('mid');
        let comp = {
            type: 'text',
            value: '',
            name: name,
            active: true,
            fontFamily: '微软雅黑',
            fontColor: 'black',
            fontSize: 16,
            fontStyle: 'normal',
            left: 0,
            top: 0,
            width: 0,
            perWidth: 0,
            height: 0,
            perHeight: 0,
            minHeight: 0,
            zIndex: zIndex,
            costomize: true
        }
        compList.push(comp);
        this.setState({ compList: compList, activeElem: compList.length - 1, zIndex: zIndex, costomizeState: true });
    }

    endCostomize: Function = (width, height) => {
        let compList = [...this.state.compList];
        let elem = document.getElementById('mid');
        compList[this.state.activeElem].perWidth = (width / elem.offsetWidth) * 100;
        compList[this.state.activeElem].perHeight = (height / elem.offsetHeight) * 100;
        compList[this.state.activeElem].width = width;
        compList[this.state.activeElem].height = height;
        compList[this.state.activeElem].costomize = false;
        setTimeout(() => {
            this.setState({ compList: compList, costomizeState: false });
        }, 300)
    }

    render() {
        return (
            <div className="App" onClick={this.outFocusAll}>
                <Left compList={this.state.compList} outFocusAll={this.outFocusAll} createComponent={this.createComponent}
                    removeComp={this.removeComp} getFocus={this.getFocus} setListOrder={this.setListOrder} costomizeComponent={this.costomizeComponent} />
                <Mid activeOrder={this.state.activeElem} endCostomize={this.endCostomize} compList={this.state.compList} costomizeState={this.state.costomizeState} changeCompState={this.changeCompState} getFocus={this.getFocus} setPosition={this.setPosition} />
                <Right activeElem={this.state.compList[this.state.activeElem]}
                    changeCompState={this.changeCompState}
                    exportHtml={this.exportHtml} />
            </div>
        );
    }
}

export default App;
