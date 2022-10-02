import css from './Modal.module.css'
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({onClose, largeImageAndTags}) => {

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);


    const handleBackdropClick = event => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    return(
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
            <img 
              className={css.largeImage}
              src={largeImageAndTags.largeURL} 
              alt={largeImageAndTags.tags} />
            </div>
        </div>
    )
};

Modal.propTypes = {
  largeImageAndTags: PropTypes.shape({
    largeURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};