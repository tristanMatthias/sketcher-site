import './modal.scss';

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import classname from 'classnames';

import { Icon } from '../Icon/Icon';
import { ModalProps } from './modal.types';
import { Button } from '../Button/Button';


export class Modal extends Component<ModalProps> {
  el = document.createElement('div');
  modalRoot?: HTMLElement;

  componentDidMount() {
    this.modalRoot = document.getElementById('modal-root')!;
    this.modalRoot.appendChild(this.el);
    this.el.classList.add('modal');
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el && this.props.onClose) this.props.onClose();
    });
  }

  componentWillUnmount() {
    if (this.modalRoot) this.modalRoot.removeChild(this.el);
  }

  render() {
    const { center, className } = this.props;
    const modal = <aside className={classname(className, { center })}>
      <header>
        <h4>{this.props.title}</h4>
        <div className="close" onClick={this.props.onClose}>
          <Icon type="close" size="medium" />
        </div>
      </header>

      <main> {this.props.children} </main>

      {this.props.footerButtons &&
        <footer>
          {this.props.footerButtons.map(({ text, ...props }, idx) =>
            <Button key={idx} {...props}>{text}</Button>
          )}
        </footer>
      }
    </aside>;

    return createPortal(modal, this.el);
  }
}
