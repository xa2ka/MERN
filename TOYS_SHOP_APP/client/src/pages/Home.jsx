import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails } from '../redux/slices/details'; // Измените на ваш срез
import { fetchReviews } from '../redux/slices/reviews';
import { Link } from 'react-router-dom';
import './home.css';

export const Home = () => {
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.details); // Измените на ваш срез
  const isDetailsLoading = details.status === 'loading';

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(fetchDetails());
    dispatch(fetchReviews());
  }, [dispatch]);

  // Filter and sort details
  const filteredDetails = (isDetailsLoading ? [] : details.items)
    .filter((detail) =>
      detail.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  // Пагинация
  const totalPages = Math.ceil(filteredDetails.length / itemsPerPage);
  const currentDetails = filteredDetails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="content">
      {/* Блок приветствия и фото автомобиля */}
      <div className="welcome-block">
        <h1>Добро пожаловать в Spare!</h1>
        <p>Мы предлагаем лучшие автомобили для вашего выбора.</p>
        <img 
          src="https://avatars.mds.yandex.net/i?id=20543d00a2f51bc7269e11d9640bd0231ebf0c5e-10780278-images-thumbs&n=13" 
          alt="Автомобиль" 
          className="welcome-image"
        />
      </div>

      <div className="details-box">
        <div className="controls">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="asc">Цена: по возрастанию</option>
            <option value="desc">Цена: по убыванию</option>
          </select>
        </div>

        <div className="detail-list">
          {currentDetails.map((obj) => (
            <div key={obj._id} className="detail-card">
              <img src={obj.imageUrl || ''} alt={obj.name} className="detail-image" />
              <Link to={`/details/${obj._id}`} className="detail-title-link">
                <h3 className="detail-title">{obj.name}</h3>
              </Link>
              <p className="detail-price">{obj.price}$</p>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
          <span>Страница {currentPage} из {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Вперед</button>
        </div>
      </div>
    </div>
  );
};
