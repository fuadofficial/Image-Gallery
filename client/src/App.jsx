import React, { useState } from 'react';
import AddImageIcon from './components/AddImageIcon';
import ImageGallery from './components/ImageGallery';
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (imageUrl) => {
    setImages((prevImages) => [...prevImages, imageUrl]);
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <AddImageIcon onImageUpload={handleImageUpload} />
      <ImageGallery images={images} />
    </div>
  );
};

export default App;
