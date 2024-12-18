import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails, fetchRemoveDetail } from '../../redux/slices/details';

import './administration.css';
import { Link } from 'react-router-dom';

export const Administration = () => {
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.details);

  const isDetailsLoading = details.status === 'loading';

  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  const onClickRemove = (id) => {
    if (window.confirm('Вы действительно хотите удалить объект?')) {
      dispatch(fetchRemoveDetail(id))
        .then(() => {
          // После удаления удаляем объект из списка локально
          dispatch(removeDetailFromList(id));
        })
        .catch((error) => {
          console.error('Ошибка удаления:', error);
        });
    }
  };

  return (
    <div className="content-admin">
      <div className="controls">
        <Link to="/add-detail">
          <button className="add-detail-button">Добавить деталь</button>
        </Link>
      </div>

      <div className="details-list-admin">
        {(isDetailsLoading ? [] : details.items).map((obj) => (
          <div key={obj._id} className="detail-row">
            {/* Блок с изображением */}
            <div className="detail-image-container">
              <img
                src={obj.imageUrl || '/default-detail-image.jpg'} // Если картинки нет, загружаем заглушку
                alt={obj.name}
                className="detail-image"
              />
            </div>

            {/* Информация о детали */}
            <div className="detail-info">
              <span className="detail-name">{obj.name}</span>
              <span className="detail-price">{obj.price}$</span>
            </div>

            {/* Блок действий */}
            <div className="detail-actions">
              <button onClick={() => onClickRemove(obj._id)} className="delete-button">
                Удалить
              </button>
              <Link to={`/details/${obj._id}/edit`}>
                <button className="edit-button">Изменить</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
