import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import PostList from './pages/PostList';

const App = () => {
  return (
    <div style={{ padding: '50px', overflowY: 'auto' }}>
      <h1>Heading</h1>
      <Routes>
        <Route path='/' element={<PostList />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/post/:id/edit' element={<EditPost />} />
      </Routes>
    </div>
  )
}

export default App