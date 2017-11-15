import React, { Component } from 'react';
import { Button, Radio } from 'react-bootstrap';
import { Header, Body } from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import Select from 'react-select';
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
            inputText: '',
            compName: '',
            link: {
                width: '',
                height: '',
                backColor: 'blue',
                url: ''
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
            this.setState({ inputText: value, inputLink: '' });
        } else {
            this.setState({ inputText: '', inputLink: value });
        }
    }

    createComponent: Function = () => {
        switch (this.state.selectedType) {
            case 'text':
                this.props.createComponent(this.state.selectedType, this.state.inputText, this.state.compName);
                break;
            case 'link':
                this.props.createComponent(this.state.selectedType, this.state.inputLink, this.state.compName );
                break;
            case 'img':
                this.props.createComponent(this.props.selectedType, this.state.compName )
                break;
            default:
                break;
        }
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

    render() {
        return (
            <div className="create-page">
                <Header>
                    <h3>创建组件</h3>
                    <div className="pull-right">
                        <Button onClick={this.createComponent}>创建</Button>
                        <Button onClick={this.props.hideModal}>取消</Button>
                    </div>
                </Header>
                <Body>
                    <div className="input-name">
                        <label>组件名称:</label>
                        <input className="form-control" value={ this.state.compName } placeholder="请输入组件名称" onChange={(evt) => this.changeName(evt.target.value)}/>
                    </div>
                    <div className="select-type">
                        <label>选择组件类型:</label>
                        {this.state.type.map((item, index) => {
                            return <Radio key={index} inline={true} onChange={evt => this.updateItem(evt, item)} checked={this.state.selectedType === item.value}>{item.tag}</Radio>
                        })}
                    </div>
                    { this.state.selectedType === 'text' ? <div className="text-input">
                        <textarea className="form-control" rows="3" value={this.state.inputText} placeholder="请输入文本内容" onChange={(evt) => { this.changeValue('text', evt.target.value)}} />
                    </div> : null }
                    { this.state.selectedType === 'link' ? <div className="link-input">
                        <div style={{margin: '5px 0'}}>
                            <label>高度:</label>
                            <input type="number" value={ this.state.link.height} class="form-control" placeholder="请输入按钮高度" onChange={ (evt) => {this.changeLink('height', evt.target.value)} } />
                            <label>px</label>
                        </div>
                        <div style={{margin: '5px 0'}}>
                            <label>宽度:</label>
                            <input type="number" value={ this.state.link.width } class="form-control" placeholder="请输入按钮宽度" onChange={ (evt) => {this.changeLink('width', evt.target.value)}} />
                            <label>px</label>
                        </div>
                        <div style={{margin: '5px 0'}}>
                            <label>URL:</label>
                            <input type="text" value={ this.state.link.url } class="form-control" placeholder="请输入跳转URL" onChange={ (evt) => {this.changeLink('url', evt.target.value)}} />
                        </div>
                        <div style={{margin: '5px 0'}}>
                            <label>背景颜色:</label>
                            <select className="form-control" value={ this.state.link.backColor } style={{ backgroundColor: this.state.link.backColor}} onChange={ (evt) => { this.changeLink('backColor', evt.target.value) }}>
                                <option value ="red" style={{ backgroundColor: 'red'}}></option>
                                <option value ="orange" style={{ backgroundColor: 'orange'}}></option>
                                <option value="yellow" style={{ backgroundColor: 'yellow'}}></option>
                                <option value="green" style={{ backgroundColor: 'green'}}></option>
                                <option value ="aqua" style={{ backgroundColor: 'aqua'}}></option>
                                <option value ="blue" style={{ backgroundColor: 'blue'}}></option>
                                <option value="purple" style={{ backgroundColor: 'purple'}}></option>
                                <option value="black" style={{ backgroundColor: 'black'}}></option>
                                <option value ="white" style={{ backgroundColor: 'white'}}></option>
                            </select>
                        </div>
                    </div> : null }
                    { this.state.selectedType === 'img' ? <div className="text-input">
                        <h5>请上传图片</h5>
                    </div> : null }
                </Body>
            </div>
        );
    }
}

export default CreateModal;