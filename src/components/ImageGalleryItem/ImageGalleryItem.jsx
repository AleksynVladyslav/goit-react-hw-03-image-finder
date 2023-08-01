import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const { id, tags, webformatURL } = image;
  const handleImageClick = () => {
    onImageClick(image);
  };
  return (
    <li key={id} className={css.galleryItem}>
      <img
        className={css.galleryImage}
        src={webformatURL}
        alt={tags}
        onClick={handleImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: propTypes.shape({
    id: propTypes.number.isRequired,
    tags: propTypes.string.isRequired,
    webformatURL: propTypes.string.isRequired,
  }).isRequired,
  onImageClick: propTypes.func.isRequired,
};

export default ImageGalleryItem;
