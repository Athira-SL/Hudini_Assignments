import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesandTagList, getArticlesByTag } from '@/app/features/articles/articlesSlice';
import Link from 'next/link';
import Spinner from '../spinner';

export default function Feed() {
  const dispatch = useDispatch();

  const articlesStore = useSelector((state) => state.articles.articles);
  const articlesStatus = useSelector((state) => state.articles.status);

  const tagsStore = useSelector((state) => state.articles.tags);
  const tagsStatus = useSelector((state) => state.articles.status);
  const paginationCount = useSelector(
    (state) => state.articles.paginationCount
  );
  const [selectedTag, setSelectedTag] = useState(null);
  // const [showGlobalFeedBorder, setShowGlobalFeedBorder] = useState(true); 

  useEffect(() => {
    dispatch(getArticlesandTagList());
  }, [dispatch]);



  function getDate(dateString) {
    let dateFormat = new Date(dateString);
    return dateFormat.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function getPages(count) {
    const pageInfo = [];
    let item = 1;
    for (let i = 0; i <= count; i += 10) {
      pageInfo.push({ offset: i, item: item });
      item++;
    }

    return pageInfo;
  }

  function handleTagClick(tag) {
    setSelectedTag(tag);
    // setShowGlobalFeedBorder(false);
    dispatch(getArticlesByTag(tag));
  }

  function handleGlobalFeedClick(event) {
    event.preventDefault();
    setSelectedTag(null); 
    // setShowGlobalFeedBorder(true);
    dispatch(getArticlesandTagList());
  }

  return (
    <div className="container">
      <div className="column1">
        <div className="feed_toggle">
          <a className="global_text" href="global.html" onClick={handleGlobalFeedClick}>
          {/* <div className={`feed_toggle ${!showGlobalFeedBorder && 'no-border'}`}>
          <a className={`global_text ${showGlobalFeedBorder ? 'active' : ''}`} href="global.html" onClick={handleGlobalFeedClick}> */}
            Global Feed
          </a>
          {selectedTag && (
            <span className="selected_tag"># {selectedTag}</span>
          )}
        </div>
        {articlesStatus === 'loading' ? (
          <p className='globalfeed_spinner'>
          <Spinner /> </p>
        ) : (
          <ul className="articles">
            {articlesStore.map((article, id) => (
              <li className="article_list" key={id}>
                <div className="article_head">
                  <div className="article_subhead">
                    <img
                      src={article.author.image}
                      alt={article.author.image}
                    />
                    <div className="article_info">
                      <Link className="article_author" href={`/profile/${article.author.username}`}>
                        {article.author.username}
                      </Link>
                      <span className="article_date">
                        {getDate(article.createdAt)}
                      </span>
                    </div>
                  </div>
                  <Link className="count_btn" href="/signin">
                    <span>&#10084;</span>
                    {article.favoritesCount}
                  </Link>
                </div>
                <Link href={`/article/${article.slug}`}>
                  <p className="article_title">{article.title}</p>
                  <p className="article_desc">{article.description}</p>
                  <span className="read_more">Read more...</span>
                </Link>
                <ul className="article_buttons">
                  {article.tagList.map((tag) => (
                    <li key={tag}>
                      <button className="tag_btn">{tag}</button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <div className="pagination">
              {getPages(paginationCount).map(({ offset, item }) => (
                <button
                  className="page_btn"
                  key={item}
                  onClick={() => dispatch(getArticlesandTagList(offset))}
                >
                  {item}
                </button>
              ))}
            </div>
          </ul>
        )}
      </div>

      <div className="column2">
        <div className="sidebar">
          <p className="tag_text">Popular Tags</p>
          {tagsStatus === 'loading' ? (
            <Spinner />
          ) : (
            <ul className="tags">
              {[...new Set(tagsStore)].map((tag) => {
                return (
                  <button className="popular_tags" href="tag.html" onClick={() => handleTagClick(tag)}>
                    {tag}
                  </button>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
