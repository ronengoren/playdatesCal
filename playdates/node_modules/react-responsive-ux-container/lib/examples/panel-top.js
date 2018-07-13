import React from 'react';
import ReactDOM from 'react-dom';

import Container from '../index';
import {PositionEnum, ContainerEnum} from '../constant';
import './example.less';

let visible = false;

const ContainerContent = React.createClass({
  render() {
    return (
      <div className='Content--Top'>
        <div className='Content__Header'>
            Panel header
            <button type="button" onClick={this.props.onClick}>×</button>
        </div>
        <div className='Content__Body'>
          Panel body
        </div>
      </div>
    );
  }
});

let container = React.createElement(Container, { type: ContainerEnum.Panel, position: PositionEnum.Top, visible: visible, children: <ContainerContent onClick={click} /> });

function click() {
    visible = !visible;
    container = React.createElement(Container, { type: ContainerEnum.Panel, position: PositionEnum.Top, visible: visible, children: <ContainerContent onClick={click} /> });
    render();
}

function render() {
    ReactDOM.render(
      <div className='Page'>
        <h2>Panel positioned on the top</h2>
        <button onClick={click}>Show</button>
        <div className='Page__Container'>
          {container}
        </div>
      </div>,
      document.getElementById('panel-top')
    );
}

render();
