import React from "react";
import { Link } from "react-router-dom"; 
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {

    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <div className="root">
      <div className="container">
        <div className="inner">
          <Link className="logo" to="/">
            <div>АВТОЗАПЧАСТИ SPARE</div>
          </Link>
          <div className="buttons">
            {isAuth ? (
              <>
                <button onClick={onClickLogout}>Выйти</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button>Войти</button>
                </Link>
                <Link to="/register">
                  <button>Зарегистрироваться</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
