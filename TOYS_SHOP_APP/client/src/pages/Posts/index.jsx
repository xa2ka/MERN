import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/posts';
import { Link } from 'react-router-dom';
import './posts.css';

export const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="posts-list">
      {isPostsLoading ? (
        <p>Загрузка новостей...</p>
      ) : (
        posts.items.map((post) => (
          <div key={post._id} className="post-card">

            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <Link to={`/posts/${post._id}`} className="read-more-link">
                Читать далее...
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
