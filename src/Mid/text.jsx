import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './mid.css';

class TextComp extends Component {
    static propTypes = {
        attr: PropTypes.object,
        order: PropTypes.number,
        changeTextVal: PropTypes.func,
        outFocus: PropTypes.func,
        getFocus: PropTypes.func
    }

    render() {
        console.log(this.props.attr);
        let style = {};
        if (this.props.attr.fontStyle === 'bold') {
            style = {
                fontFamily: this.props.attr.fontFamily,
                fontSize: this.props.attr.fontSize,
                fontWeight: this.props.attr.fontStyle,
                color: this.props.attr.fontColor
            };
        } else {
            style = {
                fontFamily: this.props.attr.fontFamily,
                fontSize: this.props.attr.fontSize + 'px',
                fontStyle: this.props.attr.fontStyle,
                color: this.props.attr.fontColor
            };
        }
        return (
            <div className="text-comp">
                {
                    this.props.attr.active ? <textarea className="edit-text form-control" style={ style } value={ this.props.attr.value } autoFocus 
                    onChange={ (evt) => this.props.changeTextVal(evt.target.value, this.props.order) } onBlur={ () => { this.props.outFocus(this.props.order) } } />
                     : <p className="view-text" style={ style } onDoubleClick={ () => { this.props.getFocus(this.props.order) } }>{this.props.attr.value}</p>
                }
            </div>
        );
    }
}

export default TextComp;
