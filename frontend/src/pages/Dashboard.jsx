import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/authContext';
import ThemeContext from '../context/ThemeContext';
import { Context } from '../context/context';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaArrowRight,
  FaInfoCircle,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import placeholderImg from '../assets/placeholder-img.png';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import toggleOverlay from '../utils/toggleOverlay';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^((?=.*[a-zA-Z])(?=.*[@])(?=.*[.])).{4,50}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { linkClass } = useContext(Context);

  const [username, setUsername] = useState(auth?.username);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState(auth?.email);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState(auth?.password);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const customAxios = useAxiosInterceptor();

  const usernameRef = useRef();
  const emailRef = useRef();
  const errorRef = useRef();

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

  const handleLogout = async () => {
    setAuth({});
    navigate('/');
  };

  const handleUpdate = async (e) => {
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
      await customAxios.put(`/users/update-user/${auth.id}`, {
        username,
        email,
        password,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await customAxios.delete(`/users/delete-user/${auth.id}`);
      setAuth({});
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col sm:flex-row sm:text-center gap-3 p-2 mx-auto relative">
      <div className="overlay z-[1000] absolute top-[-100%] left-0 h-full w-full bg-[#000000ca] flex justify-center items-center transition-all -translate-y-full duration-500 rounded-md">
        <div className="bg-white flex flex-col gap-3 p-2 text-slate-700 rounded-lg">
          <p>are you sure you want delete your account?</p>
          <button
            className="bg-red-600 p-1 rounded-md mt-3 font-bold"
            onClick={handleDeleteUser}
          >
            Yes, I am sure
          </button>
          <button
            className="bg-green-300 p-1 rounded-md font-bold"
            onClick={toggleOverlay}
          >
            Cancel
          </button>
        </div>
      </div>
      <div
        className={`sm:w-1/4 w-full flex flex-col p-2 gap-3 ${
          theme === 'light' ? 'bg-indigo-100' : 'dark:bg-slate-700'
        } rounded-md shadow-sm`}
      >
        <NavLink
          to="/dashboard"
          className={`${linkClass} w-full flex justify-between items-center`}
        >
          <div className="w-7 h-7 rounded-full bg-slate-400 p-1 hidden sm:flex justify-center items-center font-semibold text-slate-700 mr-1">
            <FaUser />
          </div>
          <div className="flex-1 flex gap-1 items-center justify-between">
            <h3 className="font-semibold text-slate-500">Profile</h3>
            <p
              className={`text-[10px] font-semibold bg-slate-400 text-slate-700
              } p-[1px] rounded`}
            >
              USER
            </p>
          </div>
        </NavLink>
        <button
          className="sm:w-full w-1/3 max-w-32 bg-slate-400 p-1 rounded font-semibold shadow-sm hover:opacity-80 duration-300 self-center flex gap-2 justify-between items-center"
          onClick={handleLogout}
        >
          <FaArrowRight />
          Sign out
        </button>
      </div>
      <div
        className={`${
          theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
        } sm:w-3/4 w-full flex-1 flex flex-col justify-center items-center gap-2 p-2 rounded shadow-sm`}
      >
        <h3 className="text-xl sm:text-2xl font-semibold">{auth?.username}</h3>
        <div className="w-24 h-24 rounded-full border-[7px] shadow-black shadow-sm dark:shadow-white">
          <img
            src={placeholderImg}
            alt="placeholder image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <form className="flex-1 w-full sm:max-w-[450px] flex flex-col gap-2 p-2 rounded-md">
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
            className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="text"
            id="username"
            placeholder="Username"
            ref={usernameRef}
            autoComplete="off"
            defaultValue={username}
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
            className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="email"
            id="email"
            placeholder="example@email.com"
            ref={emailRef}
            autoComplete="off"
            defaultValue={email}
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
            className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            type="password"
            id="password"
            placeholder="Password"
            defaultValue={password}
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
            <FaInfoCircle className="block text-red-300 text-base mb-1" />
            Must match the first password input field.
          </p>
          <button
            onClick={handleUpdate}
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
              <div className="w-4 h-4 rounded-full bg-transparent border-2 border-t-transparent border-slate-500 animate-spin"></div>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
        <div className="flex-1 min-w-[300px] max-w-[450px] flex justify-between items-center mt-3 text-red-600 font-medium">
          <button
            className={`hover:opacity-70 duration-300`}
            onClick={toggleOverlay}
          >
            Delete Account
          </button>
          <button
            className={`hover:opacity-70 duration-300`}
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
