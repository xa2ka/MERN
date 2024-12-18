import React from "react";
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './postDetail.css'; 

const PostDetail = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const { id } = useParams();  

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data); 
        setLoading(false);   
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных о статье');
      });
  }, []); 

  if (isLoading) {
    return <div>Загрузка...</div>;  
  }

  if (!data) {
    return <div>Нет данных о детали </div>; 
  }

  return (
    <div className="post-detail">
      <h1>{data.title}</h1>
      <p>{data.text}</p>
    </div>
  );
};

export default PostDetail;