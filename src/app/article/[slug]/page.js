'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '@/app/components/spinner';
import Nav from '@/app/components/nav';
import Footer from '@/app/components/footer';

export default function Routing({ params }) {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(params.slug);

  const blogs_url = `https://api.realworld.io/api/articles/${params.slug}`;

  const fetchBlogs = async () => {
    const blogsResponse = await fetch(blogs_url);
    const blogsList = await blogsResponse.json();
    const blogsArray = blogsList.article;
    setBlog(blogsArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  function getDate(dateString) {
    let dateFormat = new Date(dateString);
    return dateFormat.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      <Nav />
      {loading ? (
        <p className='slug_spinner'>
        <Spinner /> </p>
      ) : (
        <div className="blog_style">
          <div className="blog_details">
            <p className="blog_title">{blog.title}</p>
            <div className="blog_head">
              <div className="blog_subhead">
                <img src={blog.author.image}></img>
                <div className="blog_info">
                  <p className="blog_author">{blog.author.username}</p>
                  <span className="blog_date">
                    {getDate(blog.createdAt)}
                  </span>
                </div>
              </div>
            <div className='filter_btns'>
            <button className="follow_btn">
              Follow {blog.author.username}
            </button>
            <button className="post_btn">
            <span>&#10084;</span>
              Favourite Post({blog.favoritesCount})
            </button>
            </div>
          </div>
          </div>
          <div className="blog_container">
            <p className="blog_description">{blog.body}</p>
            <ul className="article_btn">
              {blog.tagList.map((tag) => (
                <li key={tag}>
                  <button className="tag_btn">{tag}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
