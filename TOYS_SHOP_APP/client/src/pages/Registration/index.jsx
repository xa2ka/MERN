import React from 'react';
import './registration.css';
import {useForm} from 'react-hook-form';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,  
    formState: {errors, isValid} 
  } = useForm({
    defaultValues : {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!');
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  };


  if (isAuth) {
    return <Navigate to="/" />
  };

  return (
    <div className="registration">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">Создание аккаунта</h2>
      <div className="field">
        <label htmlFor="fullName">Полное имя</label>
        <input
          id="fullName"
          type="text"
          placeholder="Введите ваше полное имя"
          className="input"
          {...register('fullName', {required: 'Укажите имя'})}
        />
        <span className="errorText">{errors.fullName?.message}</span>
      </div>
      <div className="field">
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          type="email"
          placeholder="Введите ваш E-Mail"
          className="input"
          {...register('email', {required: 'Укажите почту'})}
        />
        <span className="errorText">{errors.email?.message}</span>
      </div>
      <div className="field">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          placeholder="Введите пароль"
          className="input"
          {...register('password', {required: 'Укажите пароль'})}
        />
        <span className="errorText">{errors.password?.message}</span>
      </div>
      <button disabled={!isValid} type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};
