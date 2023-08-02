import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import propTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  onSearchResultChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.warn('You must enter something!');
    }
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.button}>
            <IconContext.Provider value={{ size: '25' }}>
              <FcSearch />
            </IconContext.Provider>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onSearchResultChange}
          />
        </form>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          closeOnClick
          theme="dark"
        />
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;
