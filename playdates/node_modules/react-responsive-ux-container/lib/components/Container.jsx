import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';

import {ContainerEnum} from '../constant';
import '../container';

export default class Container extends React.Component {
    static defaultProps = {
        type: 'modal',
        position: 'center',
        visible: false
    };

    constructor(props) {
        super(props);

        this.state = { visible: this.props.visible };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible && nextProps.type === ContainerEnum.Modal) {
            if (nextProps.visible) {
                const initial = document.body.className;
                document.body.className = initial + (initial ? ' ' : '') + 'modal-open';
            } else {
                document.body.className = document.body.className.replace(/ ?modal-open/, '');
            }
        }
    }

    hide() {
        this.setState({ visible: false });
    }

    renderPanel() {
        const className = classnames('responsive-container__panel', this.props.classname);
        return (
            <div className={bem('responsive-container__panel', [this.props.position])}>
                {this.props.children}
            </div>
        );
    }

    renderModal() {
        const className = classnames('responsive-container__modal', this.props.classname);
        return (
            <div className={className}>
                <div className='responsive-container__modal__dialog'>
                    <div className='responsive-container__modal__dialog__content'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const className = classnames('responsive-container', this.props.classname);
        return (
            <div className={className}>
                {
                    this.props.visible && 
                    this.props.type === ContainerEnum.Panel &&
                    this.renderPanel()
                }
                {
                    this.props.visible && 
                    this.props.type === ContainerEnum.Modal &&
                    this.renderModal()
                }
            </div>
        )
    }
}
