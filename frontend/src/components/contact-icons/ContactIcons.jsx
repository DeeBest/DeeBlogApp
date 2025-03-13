import './contact-icons.css';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactIcons = () => {
  return (
    <ul id="nav-icons">
      <li>
        <Link to="mailto:simphiwedladla8@gmail.com">
          <FaEnvelope />
        </Link>
      </li>
      <li>
        <Link to="https://github.com/DeeBest">
          <FaGithub />
        </Link>
      </li>
      <li>
        <Link to="https://www.linkedin.com/in/dladla-simphiwe-89061a20a/">
          <FaLinkedin />
        </Link>
      </li>
    </ul>
  );
};
export default ContactIcons;
