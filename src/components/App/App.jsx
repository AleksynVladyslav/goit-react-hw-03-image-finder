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
    showModal: false,
    showLoader: false,
    showButton: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { currentPage, searchQuery } = this.state;
    try {
      this.setState({ showLoader: true });
      const response = await fetchImagesWithQuery(searchQuery, currentPage);
      const { hits, totalHits } = response;

      if (totalHits === 0) {
        this.setState({ showLoader: false });
        return toast.warn('We did not find anything for your request!');
      }
      if (hits.length !== 0 && currentPage === 1) {
        toast.success(`We found ${totalHits} images for your request`);
      }

      const totalPages = Math.ceil(totalHits / 12);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        showLoader: false,
        showButton: prevState.currentPage < totalPages,
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  onFormSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      toast.error('This is your current search');
      return;
    }
    this.setState({
      searchQuery,
      images: [],
      currentPage: 1,
      showButton: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      showButton: false,
    }));
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
  };

  render() {
    const { images, showModal, selectedImage, showLoader, showButton } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFormSubmit} />

        <ImageGallery images={images} onImageClick={this.onImageClick} />

        {showButton && <Button onLoadMore={this.onLoadMore} />}

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
