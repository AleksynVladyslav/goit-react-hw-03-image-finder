import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImagesWithQuery } from '../../api/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './App.module.css';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    selectedImage: null,
    currentPage: 1,
    totalPages: 0,
    showModal: false,
    showLoader: false,
    showButton: false,
  };

  onFormSubmit = async searchQuery => {
    try {
      this.setState({
        images: [],
        currentPage: 1,
        searchQuery,
        totalPages: 0,
        showModal: false,
        showLoader: true,
        showButton: false,
      });
      const response = await fetchImagesWithQuery(searchQuery, 1);
      const { hits, totalHits } = response;

      if (searchQuery.trim() === '') {
        this.setState({ showLoader: false });
        return toast.warn('You must enter something!');
      }
      if (totalHits === 0) {
        this.setState({ showLoader: false });
        return toast.warn('We did not find anything for your request!');
      }
      toast.success(`We found ${totalHits} images for your request`);

      const totalPages = Math.ceil(totalHits / 12);
      this.setState({
        images: hits,
        totalPages,
        showLoader: false,
        showButton: true,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  onLoadMore = async () => {
    try {
      this.setState({ showLoader: true, showButton: false });

      const response = await fetchImagesWithQuery(
        this.state.searchQuery,
        this.state.currentPage + 1
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        currentPage: prevState.currentPage + 1,
        showLoader: false,
        showButton: true,
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
  };

  render() {
    const {
      images,
      currentPage,
      totalPages,
      showModal,
      selectedImage,
      showLoader,
      showButton,
    } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFormSubmit} />

        <ImageGallery images={images} onImageClick={this.onImageClick} />

        {currentPage < totalPages && showButton && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {showModal && (
          <Modal onClose={this.onCloseModal} selectedImage={selectedImage} />
        )}

        {showLoader && <Loader />}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          closeOnClick
          theme="dark"
        />
      </div>
    );
  }
}

export default App;
