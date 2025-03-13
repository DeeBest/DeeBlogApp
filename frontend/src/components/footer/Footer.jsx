import './footer.css';
import ContactIcons from '../contact-icons/ContactIcons';

const Footer = () => {
  return (
    <footer>
      <div className="container-div">
        <ContactIcons />
        <p>
          &copy;All rights reserved || Created and Maintained By Simphiwe{' '}
          {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
