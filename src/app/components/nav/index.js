import Link from 'next/link';
import useAuth from '@/app/utils/session';

export default function Nav() {
  // localStorage.clear();
  const authentication = useAuth();
  return (
    <>
      <nav className="navigation">
        <a className="text" href="text.html">
          conduit
        </a>
        <div className="container">
          <ul>
            <li>
              <Link className="home" href="/">
                Home
              </Link>
            </li>
            {!authentication ? (
              <>
                <li>
                  <Link className="sign_in" href="/signin">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link className="sign_up" href="/signup">
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <div className="new_nav">
                
                <li>
                  <Link className="newArticles" href="/newArticles">
                    New Article
                  </Link>
                </li>
                <li>
                  <Link className="settings" href="/settings">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="new_profile" href="/profile">
                    Profile
                  </Link>
                </li>
              </div>
            )}
            {/* <li><Link className="sign_in" href="/signin">Sign in</Link></li>
           <li><Link className="sign_up" href="/signup">Sign up</Link></li> */}
          </ul>
        </div>
      </nav>
    </>
  );
}

