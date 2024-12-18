import React from 'react';

const ImageGallery = ({ images, error }) => {
  return (
    <div className="image-gallery">
      <h2>Случайные картинки собак</h2>
      {images.length > 0 ? (
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-card">
              <img src={image} alt="Random Dog" />
            </div>
          ))}
        </div>
      ) : (
        <p>{error || 'Загрузка картинок...'}</p>
      )}
    </div>
  );
};

export default ImageGallery;
