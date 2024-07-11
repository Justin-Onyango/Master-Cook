import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between w-full p-3 md:p-5 border-b bg-white">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <img src="/" alt="logo" className="h-10 sm:hidden" />
        <img src="/" alt="logo" className="hidden sm:block md:w-32" />
      </div>
      <ul className="flex items-center gap-8 w-full justify-center sm:justify-end sm:w-auto">
        <Link to="/" className="flex gap-1 text-orange-500 hover:text-orange-700">
          <span className="font-bold hidden md:block">Home</span>
        </Link>
        <Link to="/favorites" className="flex gap-1 text-orange-500 hover:text-orange-700">
          <Heart size="24" />
          <span className="font-bold hidden md:block">Favorites</span>
        </Link>
        <button
          onClick={onLoginClick}
          className="flex gap-1 text-orange-500 hover:text-orange-700"
        >
          <span className="font-bold hidden md:block">Login</span>
        </button>
        <button
          onClick={onRegisterClick}
          className="flex gap-1 text-orange-500 hover:text-orange-700"
        >
          <span className="font-bold hidden md:block">Register</span>
        </button>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default Navbar;
