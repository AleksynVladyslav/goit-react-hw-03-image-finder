import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <Oval
      height="50"
      width="50"
      color="#fff"
      wrapperClass={css.loader}
      secondaryColor="#3f51b5"
      strokeWidth={3}
      strokeWidthSecondary={3}
    />
  );
};

export default Loader;
