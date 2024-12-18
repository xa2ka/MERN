import React from 'react';

const JokeSection = ({ joke, error }) => {
  return (
    <div className="joke">
      <h2>Случайная шутка</h2>
      {joke ? (
        <div>
          <p><strong>Шутка:</strong> {joke.joke}</p>
        </div>
      ) : (
        <p>{error || 'Загрузка шутки...'}</p>
      )}
    </div>
  );
};

export default JokeSection;
