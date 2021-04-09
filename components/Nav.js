import Link from 'next/link';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import { logout } from '../lib/auth';

const Nav = () => {
  const { user, setUser } = useContext(AppContext);

  return (
    <nav>
      <ul className="flex items-center flex-wrap bg-teal-500 py-6">
        <li className="mr-2">
          <Link href="/">Home</Link>
        </li>
        <li className="mr-2">
          <Link href="/about">About</Link>
        </li>

        {user ? (
          <>
            <li className="mr-2">
              <Link href="/posts/new">New</Link>
            </li>
            <li className="mr-2">
              <Link href="/user/posts">{user.username}</Link>
            </li>
            <li
              className="mr-2"
              onClick={() => {
                logout();
                setUser(null);
              }}
            >
              <Link href="/">Log Out</Link>
            </li>
          </>
        ) : (
          <li className="mr-2">
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
