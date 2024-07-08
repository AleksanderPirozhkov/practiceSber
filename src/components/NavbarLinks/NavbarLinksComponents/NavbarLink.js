import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../css/NavbarLinks/NavbarLinksComponents/NavbarLink.css';

export default function NavbarLink({ link, text, svg }) {
  return (
    <div
      className="navbar-link"
    >
      {svg}
      <Link
        to={link}
      >
        {text}
      </Link>
    </div>
  );
}

NavbarLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  svg: PropTypes.element.isRequired,
};
