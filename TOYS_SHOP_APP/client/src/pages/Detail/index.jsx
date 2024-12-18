import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './Detail.css'; 

const Detail = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();  

  React.useEffect(() => {
    axios
      .get(`/details/${id}`)
      .then((res) => {
        setData(res.data); 
        setLoading(false);   
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных детали');
      });
  }, [id]);  

  if (isLoading) {
    return <div>Загрузка...</div>;  
  }

  if (!data) {
    return <div>Нет данных о детали</div>; 
  }

  return (
    <div className="detail">
      <h1>{data.name}</h1>
      <img src={data.imageUrl || '/default-detail-image.jpg'} alt={data.name} className="detail-image" />
      <div className="description">{data.description}</div>
      <div className="price">Цена: {data.price} $</div>
    </div>
  );
};

export default Detail;