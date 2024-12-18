import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const ReviewForm = ({ onSubmit, isValid, errors, userData, textColor, gradeColor, buttonColor, handleTextChange, handleFocus, handleGradeChange, handleClickAddReview }) => {
  return (
    <form onSubmit={onSubmit}>
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
  );
};
