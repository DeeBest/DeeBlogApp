import './footer.css';
import ContactIcons from '../contact-icons/ContactIcons';

const Footer = () => {
  return (
    <footer>
      <ContactIcons />
      <p>
        &copy;All rights reserved || Created and Maintained By Simphiwe{' '}
        {new Date().getFullYear()}.
      </p>
    </footer>
  );
};
export default Footer;
