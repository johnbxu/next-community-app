import { useState, useEffect } from 'react';
import { login, registerUser } from '../lib/auth';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import router from 'next/router';

const Login = () => {
  const [data, updateData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState(false);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push('/'); // redirect if you're already logged in
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  function handleLogin(identifier, password) {
    login(identifier, password)
      .then((res) => {
        console.log(res)
        appContext.setUser(res.user);
      })
      .catch((error) => error.json())
      .then((handleError));
  }

  function handleRegistration(username, email, password) {
    registerUser(username, email, password)
      .then((res) => {
        appContext.setUser(res.user);
      })
      .catch((error) => error.json())
      .then((handleError));
  }

  function handleError(error) {
    if (error) {
      const errorId = error.message[0].messages[0].id
      setError(errorId)
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-md">
        <div className="p-10 border-2 border-black mb-5">
          <h1>Log in here</h1>
          <form>
            <input
              type="email"
              onChange={(event) => onChange(event)}
              name="identifier"
            />
            <br />
            <input
              onChange={(event) => onChange(event)}
              type="password"
              name="password"
            />
            <br />
            <button
              type="button"
              onClick={() => {
                handleLogin(data.identifier, data.password);
              }}
            >
              Login
            </button>
          </form>
        </div>

        <div className="p-10 border-2 border-black mb-5">
          <h1>Register here</h1>
          <form>
            <input
              type="text"
              onChange={(event) => onChange(event)}
              name="registrationUsername"
            />
            <input
              type="email"
              onChange={(event) => onChange(event)}
              name="registrationEmail"
            />
            <br />
            <input
              onChange={(event) => onChange(event)}
              type="password"
              name="registrationPassword"
            />
            <br />
            <button
              type="button"
              onClick={() => {
                handleRegistration(
                  data.registrationUsername,
                  data.registrationEmail,
                  data.registrationPassword
                );
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
