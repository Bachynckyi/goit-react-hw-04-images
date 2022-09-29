import css from './Modal.module.css'
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component  {

    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    };
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    };
    handleKeyDown = event => {
      if (event.code === 'Escape') {
        this.props.onClose();
      }
    };
    handleBackdropClick = event => {
      if (event.target === event.currentTarget) {
        this.props.onClose();
      }
    }
    render() {
      return(
        <div className={css.Overlay} onClick={this.handleBackdropClick}>
            <div className={css.Modal}>
            <img 
              className={css.largeImage}
              src={this.props.largeImage.largeURL} 
              alt={this.props.largeImage.alt} />
            </div>
        </div>
      )};
};

Modal.propTypes = {
  largeImage: PropTypes.shape({
    largeUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};
