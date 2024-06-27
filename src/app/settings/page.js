"use client";

import Nav from "../components/nav";
import Footer from "../components/footer";

export default function Settings() {
  return(
    <>
      <Nav />
      <form className="article_entry">
        <div className="article-box">
          <h1>Your Settings</h1>
          <input
            className="article-text1"
            type="text"
            placeholder="url of profile picture"
          />
          <input
            className="article-about"
            type="text"
            placeholder="Your name"
          />
          

          <input
            className="article-markdown"
            type="text"
            placeholder="Short bio about you"
          />
          <input
            className="article-tags"
            type="text"
            placeholder="Email"
          />
          <input
            className="article-about"
            type="text"
            placeholder="New Password"
          />
          <div className="article-button">
            <button className="publish_btn" type="text">
              Update Settings
            </button>
          </div>
        </div>
      </form>
      <button className="logout-btn">Click here to logout</button>
      <Footer />
    </>
  );
}