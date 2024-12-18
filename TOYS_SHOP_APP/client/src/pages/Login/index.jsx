import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import {useForm} from 'react-hook-form';
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit, 
    setError, 
    formState: {errors, isValid} 
  } = useForm({
    defaultValues : {
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));

    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  };


  if (isAuth) {
    return <Navigate to="/" />
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">Вход в аккаунт</h2>
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
      <button disabled={!isValid} type="submit">Войти</button>
      </form>
    </div>
  );
};
