import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

export const Sidebar = () => {
  const isAuth = useSelector(selectIsAuth);

  const [isOpen, setIsOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        {isOpen ? "CLOSE" : "MENU"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul className="links">
          <li>
            <Link to="/" className="link">Главная</Link>
          </li>
          <li>
            <Link to="/reviews" className="link">Отзывы</Link>
          </li>
          <li>
            <Link to="/posts" className="link">Новости</Link>
          </li>
          <li>
          { isAuth ? (
            <Link to="/galery" className="link">Что нового?</Link>
          ): (
            <></>
          )}
          </li>
          <li>
            <Link to="/about" className="link">Информация</Link>
          </li>
          { isAuth ? (
            <li>
              <Link to="/administration" className="link">Панель администратора</Link>
            </li>
          ): (
            <></>
          )
          }
        </ul>
      </div>
    </>
  );
};
