'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Spinner from '@/app/components/spinner';
import Nav from '@/app/components/nav';
import Footer from '@/app/components/footer';

export default function ProfileClick({ params }) {
  const [profile, setProfile] = useState();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const profileResponse = await fetch(
        `https://api.realworld.io/api/profiles/${params.username}`
      );
      const profileData = await profileResponse.json();
      setProfile(profileData.profile);

      const articlesResponse = await fetch(
        'https://api.realworld.io/api/articles?offset=0&limit=251'
      );
      const articles_json = await articlesResponse.json();
      const articlesData = articles_json.articles;
      const filteredArticles = articlesData.filter(
        (article) => article.author.username === profileData.profile.username
      );
      setArticles(filteredArticles);

      setLoading(false);
    }
    fetchData();
  }, []);
  function getDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  if (loading) {
    return (
      <p className='profile_spinner'>
        <Spinner />
      </p>
    );
  }

  return (
    <>
      <Nav />
      <div className="bannerProfile">
        <div className="profileContent">
          <img className="profile-image" src={profile.image} alt="" />
          <h1 className="profile-username">{profile.username}</h1>
          <button className="follow_btn1">
            <span className='ion-plus-round'>&nbsp;Unfollow {profile.username}</span>
            </button>
        </div>

      </div>
      <div className='profile_container'>
      <div className="allProfile">
        <div className="feed">
          <div className='article_toogle'>
        <Link className="profile_text" href="profile.html">
          {/* <div className={`feed_toggle ${!showGlobalFeedBorder && 'no-border'}`}>
          <a className={`global_text ${showGlobalFeedBorder ? 'active' : ''}`} href="global.html" onClick={handleGlobalFeedClick}> */}
            My Article
          </Link>
          </div>
          {articles.map((article) => (
            <ul>
              <li className="filtered_articles">
                <div className="small-container">
                  <div className="profiles">
                    <Link
                      href={`/Profile/${article.author.username}`}
                      className="linkDecoration"
                    >
                      <img src={article.author.image} />
                    </Link>
                    <div className="dp-head">
                      <label className="author">
                        <Link
                          className="author-link"
                          href={`/Profile/${article.author.username}`}
                        >
                          {article.author.username}
                        </Link>
                      </label>
                      <br></br>

                      <label className="createdAt">
                        {getDate(article.createdAt)}
                      </label>
                    </div>
                  </div>
                  <div className="like">
                    <button className="btn">
                      <span className='like_btn'>&#10084;{article.favoritesCount}</span>
                        
                    </button>
                  </div>
                </div>

                <Link
                  href={`/article/${article.slug}`}
                  className="linkDecoration"
                >
                  <p className='title'>{article.title}</p>
                </Link>
                <Link
                  href={`/article/${article.slug}`}
                  className="linkDecoration"
                >
                  <p className='desc'>{article.description}</p>
                </Link>
                <div className="footTag">
                  <div className="tags-div">
                    <Link
                      href={`/article/${article.slug}`}
                      className="tag-in-article"
                    >
                      {/* <span className='read-more'>Read more...</span> */}
                    </Link>
                    <span className='read-more'>Read more...</span>
                  </div>
                  <div className="MiniTags">
                    {article.tagList.map((item) => (
                      <button
                        href={`/article/${article.slug}`}
                        className="tag-in-article"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
