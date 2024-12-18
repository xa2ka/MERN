import './App.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './components/Header/index.jsx';
import { Sidebar } from './components/Sidebar/index.jsx';

import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login/index.jsx'
import { Registration } from './pages/Registration/index.jsx';
import { AddDetail } from './pages/AddDetail/index.jsx';
import Detail from './pages/Detail/index.jsx';
import  About  from './pages/About/index.jsx'; 
import { Routes, Route } from 'react-router-dom'
import { Reviews } from './pages/Reviews/index.jsx';
import { Posts } from './pages/Posts/index.jsx';
import PostDetail from './pages/PostDetail/index.jsx';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.js';
import { Administration } from './pages/Administration/index.jsx';
import ImageGallery from './pages/Galery/index.jsx';

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, []);
  return (
    <>
    <Header />
    <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />}/>
        <Route path="/add-detail" element={<AddDetail />}/>
        <Route path="/details/:id" element={<Detail />} /> 
        <Route path="/details/:id/edit" element={<AddDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/administration" element={<Administration />}/>
        <Route path="/galery" element={<ImageGallery />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </>
  )
};

export default App;
