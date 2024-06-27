"use client";

import Link from "next/link";

export default function Header() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return(
    <header className="header">
      <Link className="header_link" href="..">
      <h1 className="header1">conduit</h1>
      </Link>
      <div className="nav_buttons">
        <Link className="nav_link" href="..">Home</Link>
        {token ? (
          ""
        ) : (
          <>
            <Link className="signin_link" href="/signin">Sign in</Link>
          </>
        )}
      </div>
    </header>
  )
}