// import PropTypes from 'prop-types';
import css from './ImageItem.module.css';
import PropTypes from 'prop-types';

export const ImageItem = ({smallURL, largeURL, alt, onLargeImage }) => {
    return(
        <li className={css.ImageGalleryItem} onClick={() =>
            onLargeImage({
              largeURL: largeURL,
              alt: alt,
            })
          }>
            <img src={smallURL} alt={alt} />
        </li>
    );
};

ImageItem.propTypes = {
    smallURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeURL: PropTypes.string.isRequired,
  };