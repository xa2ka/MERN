import React, { useState, useEffect } from "react";
import "./About.css";

// API для получения данных о местоположении
const locationAPIUrl = "https://ipapi.co/json/";

// Декларативная функция: Вывод изображения профиля
function ProfileImage({ imageUrl }) {
  return <img src={imageUrl} alt="Profile" className="profile-image" />;
}

// Стрелочная функция: Вывод данных о местоположении и времени
const ProfileDetails = ({ locationData, timeData }) => {
  return (
    <div className="profile-details">
      <p>
        <strong>Ваш часовой пояс:</strong>{" "}
        {locationData ? locationData.timezone : "Загрузка..."}
      </p>
      <p>
        <strong>Текущее системное время:</strong> {timeData || "Загрузка..."}
      </p>
      <p>
        <strong>Город:</strong> {locationData ? locationData.city : "Загрузка..."}
      </p>
      <p>
        <strong>Страна:</strong> {locationData ? locationData.country_name : "Загрузка..."}
      </p>
    </div>
  );
};

// Компонент с использованием хуков
const About = () => {
  const [timeData, setTimeData] = useState(null); // Состояние для времени
  const [locationData, setLocationData] = useState(null); // Состояние для местоположения
  const [error, setError] = useState(null); // Состояние для ошибки

  // Хук для получения данных о местоположении
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(locationAPIUrl);
        const data = await response.json();
        setLocationData(data);
      } catch (err) {
        setError("Ошибка при получении данных о местоположении");
      }
    };

    fetchLocationData();
  }, []); // [] - пустой массив зависимостей, чтобы выполнить только один раз при монтировании компонента

  // Хук для обновления времени каждую секунду
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeData(date.toLocaleString("ru-RU", options));
    };

    updateTime(); // Устанавливаем начальное время
    const timeInterval = setInterval(updateTime, 1000); // Обновляем время каждую секунду

    return () => clearInterval(timeInterval); // Очищаем интервал при размонтировании компонента
  }, []); // [] - пустой массив зависимостей, чтобы выполнить только один раз при монтировании компонента

  // Если есть ошибка, выводим сообщение об ошибке
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="about">
      <h1>О себе</h1>

      <div className="profile">
        {/* Используем компонент ProfileImage с пропсом imageUrl */}
        <ProfileImage imageUrl="https://www.shareicon.net/download/2015/08/07/81317_man_512x512.png" />

        {/* Используем компонент ProfileDetails с пропсами locationData и timeData */}
        <ProfileDetails locationData={locationData} timeData={timeData} />
      </div>
    </div>
  );
};

export default About;
