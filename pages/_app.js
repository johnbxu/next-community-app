import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import AppContext from '../context/AppContext';
import Layout from '../components/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps, context }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    // grab token value from cookie
    const token = Cookie.get('jwt');

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove('jwt');
          setUser(null);
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp;
