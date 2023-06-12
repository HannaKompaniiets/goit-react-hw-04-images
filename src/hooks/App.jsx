import React, { useEffect, useState,useRef } from 'react';
import SearchBar from './Search_bar/Search_bar';
import { SearchImages } from './Api/ApiPixabay';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import css from './App';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

 const isFirstRender = useRef(true);

  useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
     if (query === '') {
       return;
     }
    getImages(query,page);
  }, [query, page]);

  const getImages = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await SearchImages(query, page);

      if (data.totalHits === 0) {
        return alert('Enter something');
      }
      setImages(prevState => [...prevState, ...data.hits]);
      setTotal(data.totalHits);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const totalPage = total / images.length;

  return (
    <main className={css.App}>
      <SearchBar onSubmit={onHandleSubmit} />
      {isLoading && <Loader />}
      {images.length === 0 && <p>Enter something, please</p>}
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={onOpenModal} />
      )}
      {totalPage > 1 && !isLoading && images.length !== 0 && (
        <Button onClick={onLoadMore} />
      )}
      {showModal && (
        <Modal
          tags={tags}
          largeImage={largeImage}
          onCloseModal={onCloseModal}
        />
      )}
    </main>
  );
};

export default App;
