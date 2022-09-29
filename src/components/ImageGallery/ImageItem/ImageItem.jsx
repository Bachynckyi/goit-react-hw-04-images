// import PropTypes from 'prop-types';
import css from './ImageItem.module.css';
import PropTypes from 'prop-types';

export const ImageItem = ({smallURL, largeURL, tags, onLargeImage }) => {
    return(
        <li className={css.ImageGalleryItem} onClick={() =>
            onLargeImage({
              largeURL: largeURL,
              alt: tags,
            })
          }>
            <img src={smallURL} alt={tags} />
        </li>
    );
};

ImageItem.propTypes = {
    smallURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeURL: PropTypes.string.isRequired,
  };