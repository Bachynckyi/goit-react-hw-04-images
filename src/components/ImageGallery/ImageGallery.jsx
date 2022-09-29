// import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageItem } from './ImageItem/ImageItem';

export const ImageGallery = ({ dataImages, onLargeImage }) => {
    return(
        <ul className={css.ImageGallery}>
            {dataImages.map( dataImage => {
                return (
                <ImageItem
                onLargeImage={onLargeImage}
                key={dataImage.id}
                smallURL={dataImage.webformatURL}
                largeURL={dataImage.largeImageURL}
                alt={dataImage.tags}
                />
                )
            })}
        </ul>
    );
};

ImageGallery.propTypes = {
    dataImages: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired})
    ).isRequired,
  };