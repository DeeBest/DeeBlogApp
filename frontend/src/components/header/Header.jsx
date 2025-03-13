import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container-div">
        <div className="flex">
          <div id="logo-div">
            <h1>DeeBlogApp</h1>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
            </ul>
            <button>Sign In</button>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
