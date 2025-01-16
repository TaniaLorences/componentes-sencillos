import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem'; // Componente hijo para cada noticia

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [savedNews, setSavedNews] = useState([]);

  // Función para obtener las noticias (simulando un servicio)
  const fetchNews = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Función para guardar una noticia
  const saveNewsItem = (newsItem) => {
    setSavedNews([...savedNews, newsItem]);
  };

  return (
    <div>
      <h1>Noticias</h1>
      <div>
        {news.map((item) => (
          <NewsItem key={item.id} newsItem={item} onSave={saveNewsItem} />
        ))}
      </div>
      <h2>Noticias Guardadas</h2>
      <div>
        {savedNews.map((item) => (
          <NewsItem key={item.id} newsItem={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
