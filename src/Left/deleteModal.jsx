// 删除确认组件
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Header, Body } from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import './left.css';

class DeleteModal extends Component {
    static propTypes = {
        hideModal: PropTypes.func,
        deleteComp: PropTypes.func
    }
    render() {
        return (
            <div className="select-color-page">
                <Header>
                    <h5>确定删除组件？</h5>
                </Header>
                <Body>
                    <Button onClick={(event) => { this.props.deleteComp(event) } }>确定</Button>
                    <Button onClick={(event) => { this.props.hideModal(event) }}>取消</Button>
                </Body>
            </div>
        );
    }
}

export default DeleteModal;
