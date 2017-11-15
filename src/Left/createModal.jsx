import React, { Component } from 'react';
import { Button, Radio } from 'react-bootstrap';
import { Header, Body } from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import './left.css';

class CreateModal extends Component {
    static propTypes = {
        hideModal: PropTypes.func,
        createComponent: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'text',
            type: [
                {
                    tag: '文本',
                    value: 'text',
                },
                {
                    tag: '链接',
                    value: 'link',
                },
                {
                    tag: '图片',
                    value: 'img',
                }
            ],
            text: '',
            compName: '',
            link: {
                name: '',
                width: '',
                height: '',
                backColor: 'blue',
                url: 'http://'
            },
            img: {
                height: '',
                width: '',
                src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510752625202&di=f46603a05a0185ab3ca6970591332ab1&imgtype=0&src=http%3A%2F%2Fcdn2.freepik.com%2Fimage%2Fth%2F318-26623.jpg'
            }
        }
    }

    updateItem: Function = (evt, item) => {
        if (evt.target.checked) {
            this.setState({ selectedType: item.value });
        }
    }

    changeValue: Function = (type, value) => {
        if (type === 'text') {
            this.setState({ text: value, inputLink: '' });
        } else {
            this.setState({ text: '', inputLink: value });
        }
    }

    createComponent: Function = (event) => {
        event.stopPropagation();
        this.props.createComponent(this.state.selectedType, this.state[this.state.selectedType], this.state.compName);
        this.props.hideModal();
    }

    changeName: Function = (name) => {
        this.setState({ compName: name });
    }

    changeLink: Function = (type, value) => {
        let link = this.state.link;
        link[type] = value;
        this.setState({ link: link });
    }

    changeImg: Function = (type, value) => {
        let img = this.state.img;
        img[type] = value;
        if (type === 'src') {
            let fileObj = document.getElementById("file");
            img[type] = window.URL.createObjectURL(fileObj.files[0]);
        }
        this.setState({ img: img });
    }

    render() {
        return (
            <div className="create-page">
                <Header>
                    <h3>创建组件</h3>
                    <div className="pull-right">
                        <Button onClick={(event) => { this.createComponent(event) }}>创建</Button>
                        <Button onClick={this.props.hideModal}>取消</Button>
                    </div>
                </Header>
                <Body>
                    <div className="input-name">
                        <label>组件名称:</label>
                        <input className="form-control" value={this.state.compName} placeholder="请输入组件名称" onChange={(evt) => this.changeName(evt.target.value)} />
                    </div>
                    <div className="select-type">
                        <label>选择组件类型:</label>
                        {this.state.type.map((item, index) => {
                            return <Radio key={index} inline={true} onChange={evt => this.updateItem(evt, item)} checked={this.state.selectedType === item.value}>{item.tag}</Radio>
                        })}
                    </div>
                    {this.state.selectedType === 'text' ? <div className="text-input">
                        <textarea className="form-control" rows="3" value={this.state.text} placeholder="请输入文本内容" onChange={(evt) => { this.changeValue('text', evt.target.value) }} />
                    </div> : null}
                    {this.state.selectedType === 'link' ? <div className="link-input">
                        <div style={{ margin: '5px 0' }}>
                            <label>按钮名称:</label>
                            <input type="text" value={this.state.link.name} className="form-control" placeholder="请输入按钮名称" onChange={(evt) => { this.changeLink('name', evt.target.value) }} />
                        </div>
                        <div style={{ margin: '5px 0' }}>
                            <label>高度:</label>
                            <input type="number" value={this.state.link.height} className="form-control" placeholder="请输入按钮高度" onChange={(evt) => { this.changeLink('height', evt.target.value) }} />
                            <label>px</label>
                        </div>
                        <div style={{ margin: '5px 0' }}>
                            <label>宽度:</label>
                            <input type="number" value={this.state.link.width} className="form-control" placeholder="请输入按钮宽度" onChange={(evt) => { this.changeLink('width', evt.target.value) }} />
                            <label>px</label>
                        </div>
                        <div style={{ margin: '5px 0' }}>
                            <label>URL:</label>
                            <input type="text" value={this.state.link.url} className="form-control" placeholder="请输入跳转URL" onChange={(evt) => { this.changeLink('url', evt.target.value) }} />
                        </div>
                        <div style={{ margin: '5px 0' }}>
                            <label>背景颜色:</label>
                            <select className="form-control" value={this.state.link.backColor} style={{ backgroundColor: this.state.link.backColor }} onChange={(evt) => { this.changeLink('backColor', evt.target.value) }}>
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
                    </div> : null}
                    {this.state.selectedType === 'img' ? <div className="img-input">
                        <div style={{ margin: '5px 0' }}>
                            <label>高度:</label>
                            <input type="number" value={this.state.img.height} className="form-control" placeholder="请输入图片高度" onChange={(evt) => { this.changeImg('height', evt.target.value) }} />
                            <label>px</label>
                        </div>
                        <div style={{ margin: '5px 0' }}>
                            <label>宽度:</label>
                            <input type="number" value={this.state.img.width} className="form-control" placeholder="请输入图片宽度" onChange={(evt) => { this.changeImg('width', evt.target.value) }} />
                            <label>px</label>
                        </div>
                        <div style={{ margin: '5px 0' }} className="upload-img">
                            <label>选择图片:</label>
                            <img src={this.state.img.src} alt="上传图片"/>
                            {/* {this.state.img.src ? <img src={this.state.img.src} /> : <div className="uploadBackGround"></div>} */}
                            <input type="file" id="file" onChange={(evt) => { this.changeImg('src', evt.target.value) }} />
                        </div>
                    </div> : null}
                </Body>
            </div>
        );
    }
}

export default CreateModal;
