import propTypes from 'prop-types';
import css from './Button.module.css';
const Button = ({ onLoadMore }) => {
  return (
    <div className={css.buttonWrapper}>
      <button className={css.button} type="button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: propTypes.func.isRequired,
};
export default Button;
