import Link from 'next/link';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import { logout } from '../lib/auth';

const Nav = () => {
  const { user, setUser } = useContext(AppContext);

  return (
    <div className="container px-2 mx-auto">
      <nav>
        <ul className="flex items-center flex-wrap bg-teal-500 py-6">
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href="/posts/new">NEW BUILD</Link>
              </li>
              <li>
                <Link href="/user/posts">{user.username}</Link>
              </li>
              <li
                onClick={() => {
                  logout();
                  setUser(null);
                }}
              >
                <Link href="/">LOG OUT</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">LOGIN</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
