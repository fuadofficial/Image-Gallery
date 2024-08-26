import React from 'react';

const ImageGallery = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img key={index} src={`http://localhost:5000${image}`} alt="gallery" />
      ))}
    </div>
  );
};

export default ImageGallery;
