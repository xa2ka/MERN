import React from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { selectIsAuth } from '../../redux/slices/auth';
import './addDetail.css';

export const AddDetail = () => {
  const { id } = useParams();  // Используем `useParams` для получения параметров URL (например, id детали)
  const navigate = useNavigate();  // Хук для навигации по приложениям
  const isAuth = useSelector(selectIsAuth);  // Используем `useSelector` для получения состояния авторизации из Redux

  const [isLoading, setLoading] = React.useState(false);  // Состояние для отслеживания загрузки
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });  // Состояние для хранения данных формы

  const isEditing = Boolean(id);  // Проверка, редактируем ли мы существующую деталь (есть ли id)

  React.useEffect(() => {
    if (id) {
      // Если это редактирование (есть id), загружаем данные
      axios
        .get(`/details/${id}`)
        .then(({ data }) => {
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
          });
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении данных детали!');
        });
    }
  }, [id]);  // Запуск эффекта при изменении id

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));  // Обновление данных формы
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Предотвращение стандартного поведения формы
    try {
      setLoading(true);

      const { data } = isEditing
        ? await axios.patch(`/details/${id}`, formData)  // Если редактирование, делаем PATCH запрос
        : await axios.post('/details', formData);  // Если создание, делаем POST запрос

      const _id = isEditing ? id : data._id;  // Если редактирование, используем старый id, если создание — новый id
      navigate(`/details/${_id}`);  // Переходим на страницу детали
    } catch (err) {
      console.warn(err);
      alert('Ошибка при сохранении данных детали!');
    } finally {
      setLoading(false);
    }
  };

  // Если пользователь не авторизован, перенаправляем на главную страницу
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Название</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}  // `onChange` — обработчик события, который обновляет данные в состоянии
          placeholder="Введите название детали"
          required
        />
      </div>
      <div className="field">
        <label>Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}  // `onChange` — обработчик события, который обновляет данные в состоянии
          placeholder="Введите описание"
          required
        />
      </div>
      <div className="field">
        <label>Цена</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}  // `onChange` — обработчик события, который обновляет данные в состоянии
          placeholder="Введите цену"
          required
        />
      </div>
      <div className="field">
        <label>Ссылка на изображение</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}  // `onChange` — обработчик события, который обновляет данные в состоянии
          placeholder="Введите URL изображения"
        />
      </div>
      <div>
        <button type="submit" disabled={isLoading}>  {/*// Кнопка для отправки формы, отключена, если идет загрузка*/}
          Сохранить
        </button>
        <button type="button" onClick={() => navigate('/')}>  {/*// Кнопка "Отмена", которая перенаправляет на главную страницу*/}
          Отмена
        </button>
      </div>
    </form>
  );
};
