'use client';

import React, { useState } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AddArticle() {
  const createArticleApi = 'https://api.realworld.io/api/articles';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState(['']);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log('innnnn');
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token, 'token');
    try {
      const articleDetails = { title, description, body, tags };
      const articleData = await axios.post(
        'https://api.realworld.io/api/articles',
        { article: { ...articleDetails } },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(articleData, 'ari');
      setTitle('');
      setDescription('');
      setBody('');
      setTags('');

      //   setTimeout(() => {
      //     router.push("/");
      //   }, 1000);
      router.replace('/');
      console.log(articleData);
    } catch (error) {
      setError(error, 'Failed to add article details');
    }
  };
  return (
    <>
      <Nav />
      <form className="article_entry" onSubmit={handleSubmit}>
        <div className="article-box">
          <input
            className="article-text1"
            type="text"
            name="title"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="article-about"
            type="text"
            name="about"
            placeholder="What's this article about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="article-markdown"
            type="text"
            name="markdown"
            placeholder="Write your article (in markdown)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            className="article-tags"
            type="text"
            name="tags"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="article-button">
            <button className="publish_btn" type="submit">
              Publish Article
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}
