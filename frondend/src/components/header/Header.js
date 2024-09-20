import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/user/UserContext';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
  }

  return (
    <header className="bg-slate-50 text-slate-800 p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-slate-600" style={{ cursor: "pointer" }}>
          TODO_APP
        </Link>
      </div>

      {/* Auth section */}
      <div className="relative">
        {user ? (
         <>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-slate-800 text-lg font-medium">
                Hi, <span className="font-semibold text-blue-600">{user.username}</span>
              </span>
            )}
            <img
              src="/logo192.png"
              alt="User Avatar"
              className="h-9 cursor-pointer rounded-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          </div>
       
         {dropdownOpen && (
           <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
             <button
               onClick={handleLogout}
               className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
             >
               Logout
             </button>
           </div>
         )}
       </>
       
        ) : (
          <Link to="/login" className="text-slate-800 hover:underline hover:text-slate-600">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
