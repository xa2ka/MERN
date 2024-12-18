import React from 'react';

export const ReviewItem = ({ review }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{review.user.fullName}</strong>
      </div>
      <p className="comment-text">{review.text}</p>
      <p>{review.grade}</p>
    </div>
  );
};
