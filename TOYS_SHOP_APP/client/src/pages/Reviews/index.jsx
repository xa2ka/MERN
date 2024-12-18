import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, fetchPostReviews } from '../../redux/slices/reviews';
import { selectIsAuth } from "../../redux/slices/auth";
import { useForm } from 'react-hook-form';

import './reviews.css';

export const Reviews = () => {

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  // Локальные состояния для отслеживания изменений в полях
  const [textColor, setTextColor] = useState(''); // Для текста
  const [gradeColor, setGradeColor] = useState(''); // Для оценки
  const [buttonColor, setButtonColor] = useState(''); // Для кнопки

  const {
    register,
    handleSubmit,  
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      grade: '',
      text: '',
      userId: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchPostReviews(values));

    if (!data.payload) {
      return alert('Не удалось добавить отзыв!');
    }
  };

  const { reviews } = useSelector((state) => state.reviews);
  const isReviewsLoading = reviews.status === 'loading'; 

  React.useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // Обработчик изменения текста отзыва
  const handleTextChange = (e) => {
    console.log("Текст отзыва изменен:", e.target.value);
    setTextColor(e.target.value.length > 0 ? 'lightgreen' : ''); // Изменяем цвет поля на зеленый, если есть текст
  };

  // Обработчик изменения оценки
  const handleGradeChange = (e) => {
    console.log("Оценка изменена:", e.target.value);
    const grade = e.target.value;
    // Устанавливаем цвет поля в зависимости от оценки
    if (grade >= 1 && grade <= 3) {
      setGradeColor('lightcoral'); // Красный цвет для низкой оценки
    } else if (grade >= 4 && grade <= 5) {
      setGradeColor('lightgreen'); // Зеленый цвет для высокой оценки
    } else {
      setGradeColor('');
    }
  };

  // Обработчик фокуса на поле ввода отзыва
  const handleFocus = () => {
    console.log('Поле ввода отзыва получило фокус');
    setTextColor('lightyellow'); // Цвет желтого фона при фокусе
  };

  // Обработчик отправки формы
  const handleFormSubmit = (e) => {
    console.log('Форма отправлена');
  };

  // Обработчик клика по кнопке "Добавить"
  const handleClickAddReview = () => {
    console.log('Кнопка "Добавить" была нажата');
    setButtonColor(isValid ? 'lightblue' : 'lightgray'); // Изменение цвета кнопки в зависимости от валидности формы
  };

  return (
    <div className="container-comments">
      <div className="comments-block">
        <h3>Отзывы</h3>
        {(isReviewsLoading ? [] : reviews.items).map((obj, index) => (
          <div key={index} className="comment">
            <div className="comment-header">
              <strong>{obj.user.fullName}</strong>
            </div>
            <p className="comment-text">{obj.text}</p>
            <p>{obj.grade}</p>
          </div>
        ))}
      </div>

      {isAuth ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)} onClick={handleFormSubmit}>
            <h2 className="title">Добавить отзыв</h2>
            <div className="field">
              <label htmlFor="text">Напишите текст:</label>
              <input
                id="text"
                type="text"
                placeholder="Напишите отзыв"
                className="input"
                {...register('text', { required: 'Напишите отзыв!' })}
                onChange={handleTextChange} // Обработчик изменения текста
                onFocus={handleFocus} // Обработчик фокуса
                style={{ backgroundColor: textColor }} // Применение динамического цвета фона
              />
              <span className="errorText">{errors.text?.message}</span>
            </div>
            <div className="field">
              <label htmlFor="grade">Оценка (1-5):</label>
              <input
                id="grade"
                type="number"
                placeholder="Введите оценку от 1 до 5"
                className="input"
                {...register('grade', {
                  required: 'Укажите оценку!',
                  min: { value: 1, message: 'Оценка не может быть меньше 1' },
                  max: { value: 5, message: 'Оценка не может быть больше 5' },
                })}
                onChange={handleGradeChange} // Обработчик изменения оценки
                style={{ backgroundColor: gradeColor }} // Применение динамического цвета фона
              />
              <span className="errorText">{errors.grade?.message}</span>
            </div>
            <input type="hidden" value={userData?._id} {...register('userId')} />
            <button
              disabled={!isValid}
              type="submit"
              onClick={handleClickAddReview} // Обработчик клика по кнопке "Добавить"
              style={{ backgroundColor: buttonColor }} // Применение динамического цвета кнопки
            >
              Добавить
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
