import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Logo from '../components/Logo';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^((?=.*[a-zA-Z])(?=.*[@])(?=.*[.])).{4,50}$/;
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

    //if submit button is enabled with js hack
    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrorMessage('Invalid entry');
      return;
    }
    console.log(`Username: ${username}\n
      Email: ${email}\n
      Password: ${password}`);
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-5 p-1 sm:flex-row">
      <section className="flex-1 flex flex-col justify-center items-center p-2 gap-5 z-0">
        <Logo />
        <p className="text-sm sm:text-xl text-indigo-400 capitalize">
          Join the most productive{' '}
          <span className="text-rose-400 font-bold italic">MERN</span> stack
          blog, and become an{' '}
          <span className="text-rose-400 font-bold italic">EXPERT</span> in
          building full stack applications.
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
            className="outline-none rounded-md bg-slate-200 dark:bg-gray-600 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="text"
            id="username"
            placeholder="Username"
            ref={usernameRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
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
                ? 'bg-gray-600 p-1 rounded-md text-xs font-thin'
                : 'translate-[10000%] opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block text-red-300 text-base mb-1" />
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
            className="outline-none rounded-md bg-slate-200 dark:bg-gray-600 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="email"
            id="email"
            placeholder="example@email.com"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
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
                ? 'bg-gray-600 p-1 rounded-md text-xs font-thin'
                : 'translate-[10000%] opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block text-red-300 text-base mb-1" />
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
            className="outline-none rounded-md bg-slate-200 dark:bg-gray-600 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
                ? 'bg-gray-600 p-1 rounded-md text-xs font-thin'
                : 'translate-[10000%] opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block text-red-300 text-base mb-1" />
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
            className="outline-none rounded-md bg-slate-200 dark:bg-gray-600 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="password"
            id="confirm-password"
            onChange={(e) => setMatchPassword(e.target.value)}
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
                ? 'bg-gray-600 p-1 rounded-md text-xs font-thin'
                : 'translate-[10000%] opacity-0 h-0'
            }
          >
            <FaInfoCircle className="block text-red-300 text-base mb-1" />
            Must match the first password input field.
          </p>
          <button
            className={
              !validUsername || !validPassword || !validMatchPassword
                ? 'bg-slate-500 dark:bg-slate-100 dark:text-slate-500 w-1/2 self-center rounded-lg p-1 border-[1px] border-cyan-500 mb-2 opacity-80 cursor-not-allowed'
                : 'bg-slate-500 dark:bg-slate-100 dark:text-slate-500 w-1/2 self-center rounded-lg p-1 border-[1px] border-cyan-500 hover:opacity-90 duration-300 mb-2 cursor-pointer'
            }
            disabled={
              !validUsername || !validPassword || !validMatchPassword
                ? true
                : false
            }
          >
            Sign up
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
