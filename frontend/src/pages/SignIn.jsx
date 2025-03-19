import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import customAxios from '../api/axios';
import AuthContext from '../context/authContext';

const SignIn = () => {
  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await customAxios.post('/users/auth/login', {
        email,
        password,
      });

      const accessToken = await res?.data?.accessToken;
      const username = await res?.data?.username;
      const id = await res?.data?.id;
      setAuth({ email, password, username, accessToken, id });

      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);

      if (error.status === 403) {
        setErrorMessage("You're forbidden to make this request.");
      } else if (error.status === 401) {
        setErrorMessage("You're unauthorized to make this request.");
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-5 p-1 sm:flex-row">
      <section className="flex-1 flex flex-col justify-center items-center p-2 gap-5 z-0">
        <Link to="/">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center bg-rose-500 rounded-full border-[1px] border-cyan-500"></div>
            <h1 className="text-slate-50 dark:text-slate-700 text-2xl sm:text-3xl md:text-4xl -ml-12 md:-ml-16 font-extrabold italic z-10 p-1 bg-gradient-to-l from-rose-300 via-rose-400 to-rose-500 rounded-xl">
              DeeBlogApp
            </h1>
          </div>
        </Link>
        <p className="text-sm sm:text-xl text-indigo-400 capitalize">
          Welcome back, sign in to broaden your mern stack knowledge
        </p>
      </section>
      <section className="flex-1 flex justify-center items-center p-2">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-1 text-xs sm:text-sm font-semibold max-w-96 shadow-md dark:shadow-slate-700 px-2 py-4 rounded-md"
        >
          <p
            className="text-rose-700 dark:text-rose-300 text-xs font-medium rounded-sm mb-3"
            ref={errorRef}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <label className="flex items-center gap-1" htmlFor="email">
            Email:
          </label>
          <input
            className="outline-none rounded-md bg-slate-200 dark:bg-gray-600 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="email"
            id="email"
            placeholder="example@email.com"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
            aria-invalid={email ? 'false' : 'true'}
          />
          <label className="flex items-center gap-1" htmlFor="password">
            Password:
          </label>
          <input
            className="outline-none rounded-md bg-slate-200 dark:bg-gray-600 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value.trim())}
            required
            aria-invalid={password ? 'false' : 'true'}
          />
          <button
            className={
              !email || !password || isLoading
                ? 'flex justify-center items-center bg-slate-500 dark:bg-slate-100 dark:text-slate-500 w-1/2 self-center rounded-lg p-1 border-[1px] border-cyan-500 mb-2 opacity-80 cursor-not-allowed'
                : 'flex justify-center items-center bg-slate-500 dark:bg-slate-100 dark:text-slate-500 w-1/2 self-center rounded-lg p-1 border-[1px] border-cyan-500 hover:opacity-90 duration-300 mb-2 cursor-pointer'
            }
            disabled={!email || !password || isLoading ? true : false}
          >
            {isLoading ? (
              <div className="w-4 h-4 rounded-full bg-transparent border-2 border-t-transparent border-slate-500 animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
          <p>
            Not a member?{' '}
            <Link to="/sign-up" className="text-indigo-400">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};
export default SignIn;
