import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';  // Импортируем компонент галереи
import JokeSection from './JokeSection';   // Импортируем компонент шутки
import './galery.css';

// API для случайных картинок собак
const imageAPIUrl = 'https://dog.ceo/api/breeds/image/random/5'; // API для случайных картинок собак

// API для случайных шуток
const jokeAPIUrl = 'https://v2.jokeapi.dev/joke/Any?type=single';

const InfoPage = () => {
  const [images, setImages] = useState([]);
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState(null);

  // Получаем случайные картинки собак
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(imageAPIUrl);
        setImages(response.data.message); // Массив ссылок на изображения
      } catch (error) {
        setError('Ошибка при получении картинок');
      }
    };

    fetchImages();
  }, []);

  // Получаем случайную шутку
  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get(jokeAPIUrl);
        setJoke(response.data);
      } catch (error) {
        setError('Ошибка при получении шутки');
      }
    };

    fetchJoke();
  }, []);

  return (
    <div className="info-page">
      {/* Используем компонент ImageGallery */}
      <ImageGallery images={images} error={error} />

      {/* Используем компонент JokeSection */}
      <JokeSection joke={joke} error={error} />
    </div>
  );
};

export default InfoPage;
