import ContactIcons from './contact-icons/ContactIcons';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center gap-3 w-full max-w-4xl mx-auto p-4">
      <div className="w-full flex justify-between gap-4">
        <Logo />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-3">
          <div className="flex flex-col justify-start items-start gap-1 text-xs sm:text-[12px] p-1">
            <h1 className="text-sm sm:text-base font-semibold text-slate-400 mb-1">
              About
            </h1>
            <Link
              className="hover:opacity-90 duration-300"
              to="https://deebest.github.io/personal-webpage"
            >
              Portfolio
            </Link>
            <Link
              className="hover:opacity-90 duration-300"
              to="https://github.com/DeeBest"
            >
              Github
            </Link>
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-[12px] p-1">
            <h1 className="text-sm sm:text-base font-semibold text-slate-400 mb-1">
              Follow
            </h1>
            <Link
              className="hover:opacity-90 duration-300"
              to="https://www.linkedin.com/in/dladla-simphiwe-89061a20a/"
            >
              LinkedIn
            </Link>
            <Link className="hover:opacity-90 duration-300" to="#">
              Facebook
            </Link>
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-[12px] p-1">
            <h1 className="text-sm sm:text-base font-semibold text-slate-400 mb-1">
              Legal
            </h1>
            <Link className="hover:opacity-90 duration-300" to="#">
              Privacy Policy
            </Link>
            <Link className="hover:opacity-90 duration-300" to="#">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-4/5 h-[1px] mt-2 bg-slate-500 rounded-md shadow-sm" />
      <div className="w-full flex flex-col justify-between items-center gap-3 sm:flex-row">
        <p className="text-[9.5px] sm:text-xs font-thin">
          &copy;All rights reserved || Created and Maintained By Simphiwe{' '}
          {new Date().getFullYear()}.
        </p>
        <ContactIcons />
      </div>
    </footer>
  );
};
export default Footer;
