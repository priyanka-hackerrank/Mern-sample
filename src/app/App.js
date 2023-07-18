import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [posts, setPosts] = useState([]);
  const currentHost = window?.location?.host || 'localhost:8000';
  const currentProtocol = window?.location?.protocol || 'http:';
  const postsUrl = `${currentProtocol}//${currentHost.replace('8000', '8080')}/api/posts`;

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(postsUrl, { method: 'GET' });
      const data = await response.json();
      setPosts(data);
    }

    fetchPost();
  }, [postsUrl]);

  const onSubmit = (event) => {
    event.preventDefault();

    fetch(postsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts((posts) => [...posts, data]);
        setNewPost({ title: '', content: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='content' role='main'>
      {/* <div className='card highlight-card'>
        <div className='card highlight-card card-small'>
          <img src={logo} id='react' alt='react' />
          <h2>HackerRank app is running!</h2>
        </div>

        <form className='card card-small' onSubmit={onSubmit}>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            name='title'
            value={newPost.title}
            onChange={handleInputChange}
          />
          <label htmlFor='content'>Content:</label>
          <textarea
            id='content'
            name='content'
            value={newPost.content}
            onChange={handleInputChange}
          />
          <button type='submit'>Create Post</button>
        </form>

        {posts.map((post) => (
          <div className='card highlight-card card-post' key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default App;
