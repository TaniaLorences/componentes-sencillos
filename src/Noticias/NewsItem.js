import React from 'react';

const NewsItem = ({ newsItem, onSave }) => {
  return (
    <div>
      <h3>{newsItem.title}</h3>
      <p>{newsItem.description}</p>
      <button onClick={() => onSave(newsItem)}>Guardar</button>
    </div>
  );
};

export default NewsItem;
