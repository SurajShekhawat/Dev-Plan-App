// // src/components/Navbar.jsx

// import React, { useState } from 'react';
// import '../Styles/Navbar.scss';
// import { FaBars, FaUserCircle } from 'react-icons/fa';

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="dev-navbar">
//       <div className="navbar-left">
//         <FaBars className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
//         <h3>DevBoard</h3>
//       </div>

//       <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
//         <span className="welcome-text">👋 Welcome, Developer!</span>
//         <FaUserCircle className="profile-icon" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx

import React, { useState } from 'react';
import '../Styles/Navbar.scss';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/profile-settings');
  };

  return (
    <nav className="dev-navbar">
      <div className="navbar-left">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <h3>DevBoard</h3>
      </div>

      <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        <span className="welcome-text">👋 Welcome, Developer!</span>
        <FaUserCircle className="profile-icon" onClick={handleAvatarClick} />
      </div>
    </nav>
  );
};

export default Navbar;