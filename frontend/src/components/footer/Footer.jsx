import './footer.css';
import ContactIcons from '../contact-icons/ContactIcons';

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto p-4">
      <ContactIcons />
      <p className="text-xs">
        &copy;All rights reserved || Created and Maintained By Simphiwe{' '}
        {new Date().getFullYear()}.
      </p>
    </footer>
  );
};
export default Footer;
