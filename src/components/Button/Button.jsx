import propTypes from 'prop-types';
const Button = ({ onLoadMore }) => {
  return (
    <button type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: propTypes.func.isRequired,
};
export default Button;
