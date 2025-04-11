import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import customAxios from '../api/axios';
import useGlobal from '../hooks/useGlobal';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { successToast, errorToast } = useGlobal();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);

    const match = password === matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage('');
  }, [username, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    //if submit button is enabled with js hack
    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrorMessage('Invalid entry');
      return;
    }

    try {
      await customAxios.post('/users/sign-up', {
        username,
        email,
        password,
      });

      successToast('Successfully signed up');
      setUsername('');
      setEmail('');
      setPassword('');
      setMatchPassword('');
      navigate('/dashboard/profile');
    } catch (error) {
      console.error(error);
      errorToast('Failed to sign up');

      if (error.status === 409) {
        setErrorMessage('That email is already registered.');
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-5 p-1 sm:flex-row animate-slideFromLeft">
      <section className="z-0 flex flex-col items-center justify-center flex-1 gap-5 p-2">
        <Link to="/">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center bg-rose-500 rounded-full border-[1px] border-cyan-500"></div>
            <h1 className="z-10 p-1 -ml-12 text-2xl italic font-extrabold text-slate-50 dark:text-slate-700 sm:text-3xl md:text-4xl md:-ml-16 bg-gradient-to-l from-rose-300 via-rose-400 to-rose-500 rounded-xl">
              DeeBlogApp
            </h1>
          </div>
        </Link>
        <p className="text-sm text-indigo-400 capitalize sm:text-xl">
          Join the most productive{' '}
          <span className="italic font-bold text-rose-400">MERN</span> stack
          blog, and become an{' '}
          <span className="italic font-bold text-rose-400">EXPERT</span> in
          building full stack applications.
        </p>
      </section>
      <section className="flex items-center justify-center flex-1 p-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-1 px-2 py-4 text-xs font-semibold rounded-md shadow-md sm:text-sm max-w-96 dark:shadow-slate-700"
        >
          <p
            className="mb-3 text-xs font-medium rounded-sm text-rose-700 dark:text-rose-300"
            ref={errorRef}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <label className="flex items-center gap-1" htmlFor="username">
            Username:
            <span
              className={
                validUsername ? 'inline-block text-sm text-green-300' : 'hidden'
              }
            >
              <FaCheck />
            </span>
            <span
              className={
                validUsername || !username
                  ? 'hidden'
                  : 'inline-block text-sm text-red-300'
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="text"
            id="username"
            placeholder="Username"
            ref={usernameRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value.trim())}
            required
            aria-invalid={validUsername ? 'false' : 'true'}
            aria-describedby="usernameNote"
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />
          <p
            id="usernameNote"
            className={
              usernameFocus && username && !validUsername
                ? 'bg-gray-600 text-slate-200 p-1 rounded-md text-xs font-thin'
                : 'translateX-[10000%] -z-10 opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block mb-1 text-base text-red-300" />
            4 to 24 characters. <br />
            Must begin with a letter. <br />
            Letter, numbers, underscores and hyphens allowed.
          </p>
          <label className="flex items-center gap-1" htmlFor="email">
            Email:
            <span
              className={
                validEmail ? 'inline-block text-sm text-green-300' : 'hidden'
              }
            >
              <FaCheck />
            </span>
            <span
              className={
                validEmail || !email
                  ? 'hidden'
                  : 'inline-block text-sm text-red-300'
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="email"
            id="email"
            placeholder="example@email.com"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value.trim())}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="emailNote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailNote"
            className={
              emailFocus && email && !validEmail
                ? 'bg-gray-600 text-slate-200 p-1 rounded-md text-xs font-thin'
                : 'translateX-[10000%] -z-10 opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block mb-1 text-base text-red-300" />
            5 to 50 characters. <br />
            Must begin with a letter. <br />
            Must contain the following symbol.
            <br />
            <span aria-label="At symbol">@</span> <br /> Letter, numbers,
            underscores and hyphens allowed.
          </p>
          <label className="flex items-center gap-1" htmlFor="password">
            Password:
            <span
              className={
                validPassword ? 'inline-block text-sm text-green-300' : 'hidden'
              }
            >
              <FaCheck />
            </span>
            <span
              className={
                validPassword || !password
                  ? 'hidden'
                  : 'inline-block text-sm text-red-300'
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value.trim())}
            required
            aria-invalid={validPassword ? 'false' : 'true'}
            aria-describedby="passwordNote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="passwordNote"
            className={
              passwordFocus && !validPassword
                ? 'bg-gray-600 text-slate-200 p-1 rounded-md text-xs font-thin'
                : 'translateX-[10000%] -z-10 opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block mb-1 text-base text-red-300" />
            8 to 24 characters. <br />
            Must include lowercase and uppercase letters, a number and a special
            character. <br />
            Allowed special characters:{' '}
            <span aria-label="Exclamation mark">!</span>{' '}
            <span aria-label="At symbol">@</span>{' '}
            <span aria-label="hashtag">#</span>{' '}
            <span aria-label="Dollar sign">$</span>{' '}
            <span aria-label="percent">%</span>
          </p>
          <label className="flex items-center gap-1" htmlFor="confirm-password">
            Confirm Password:
            <span
              className={
                validMatchPassword && matchPassword
                  ? 'inline-block text-sm text-green-300'
                  : 'hidden'
              }
            >
              <FaCheck />
            </span>
            <span
              className={
                validMatchPassword || !matchPassword
                  ? 'hidden'
                  : 'inline-block text-sm text-red-300'
              }
            >
              <FaTimes />
            </span>
          </label>
          <input
            className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="password"
            id="confirm-password"
            onChange={(e) => setMatchPassword(e.target.value.trim())}
            required
            placeholder="Password"
            aria-invalid={validMatchPassword ? 'false' : 'true'}
            aria-describedby="confirmPasswordNote"
            onFocus={() => setMatchPasswordFocus(true)}
            onBlur={() => setMatchPasswordFocus(false)}
          />
          <p
            id="confirmPasswordNote"
            className={
              matchPasswordFocus && !validMatchPassword
                ? 'bg-gray-600 text-slate-200 p-1 rounded-md text-xs font-thin'
                : 'translateX-[10000%] -z-10 opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block mb-1 text-base text-red-300" />
            Must match the first password input field.
          </p>
          <button
            className={
              !validUsername ||
              !validPassword ||
              !validMatchPassword ||
              isLoading
                ? 'flex justify-center items-center bg-slate-500 dark:bg-slate-100 dark:text-slate-500 w-1/2 self-center rounded-lg p-1 border-[1px] border-cyan-500 mb-2 opacity-80 cursor-not-allowed'
                : 'flex justify-center items-center bg-slate-500 dark:bg-slate-100 dark:text-slate-500 w-1/2 self-center rounded-lg p-1 border-[1px] border-cyan-500 hover:opacity-90 duration-300 mb-2 cursor-pointer'
            }
            disabled={
              !validUsername ||
              !validPassword ||
              !validMatchPassword ||
              isLoading
                ? true
                : false
            }
          >
            {isLoading ? (
              <div className="w-4 h-4 bg-transparent border-2 rounded-full border-t-transparent border-slate-500 animate-spin"></div>
            ) : (
              'Sign up'
            )}
          </button>
          <p>
            Already a member?{' '}
            <Link to="/sign-in" className="text-indigo-400">
              Sign In
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};
export default SignUp;
