import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = (username, email, password) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return;
  }
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    }).then((res) => {
      if (!res.ok) {
        reject(res);
      } else {
        const data = res.json();
        Cookie.set('jwt', data.jwt);
        resolve(data);
        Router.push('/');
      }
    });
  });
};

export const login = (identifier, password) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return;
  }

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    }).then((res) => {
      if (!res.ok) {
        reject(res);
      } else {
        return res.json();
      }
    }).then((data) => {
      if (data) {
        Cookie.set('jwt', data.jwt);
        resolve(data);
        Router.push('/');
      }
    });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove('jwt');
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem('logout', Date.now());
  //redirect to the home page
  Router.push('/');
};
