import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTasks, FaProjectDiagram, FaClock, FaSignOutAlt, FaBars } from 'react-icons/fa';
import '../Styles/Sidebar.scss'

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
    { name: 'Projects', icon: <FaProjectDiagram />, path: '/projects' },
    { name: 'Tasks', icon: <FaTasks />, path: '/tasks' },
    { name: 'Focus Time', icon: <FaClock />, path: '/focus-time' },
    { name: 'Logout', icon: <FaSignOutAlt />, path: '/logout' },
  ];

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar} className="text-2xl text-violet-600">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:w-64 w-64`}
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-violet-700">DevBoard 🚀</h2>
        </div>
        <ul className="mt-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-lg hover:bg-violet-100 transition ${
                  location.pathname === item.path ? 'bg-violet-200 font-semibold' : ''
                }`}
              >
                <span className="mr-3 text-violet-700">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
