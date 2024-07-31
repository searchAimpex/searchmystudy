import React, { useEffect, useState } from 'react';
import Logo from "../../assets/Logo.png";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { CiUser } from "react-icons/ci";
import { toast } from 'react-toastify';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall,{isSuccess}] = useLogoutMutation();

  useEffect(()=>{
    if(isSuccess){
      navigate('/login');
      toast.success('Logged Out Successfully');
    }

  },[isSuccess])

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
  
    } catch (err) {
      toast.error(err.message)
      console.error(err);
    }
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-custom-primary shadow-md p-2 h-20 flex flex-row   justify-between items-center">
      <div className="flex flex-row items-center ml-5 cursor-pointer">
        <div>
            <img src={Logo} alt="Logo" className="h-8" />
        </div>
        <div>
            <span className='text-white font-bold'>AIMPEX</span>
        </div>
      </div>
      <div className="relative text-white">
        <CiUser
          onClick={toggleDropdown}
          className="profile-button cursor-pointer  flex mr-5 items-center focus:outline-none"
        >
        
        </CiUser>
        {dropdownOpen && (
          <div className="dropdown-menu absolute right-0 mt-8 w-48 bg-white border bg-custom-primary rounded-md shadow-lg z-20">
            <a href="/profile" className="block px-4 py-2 text-white">
              VIEW PROFILE
            </a>
            <a href="/settings" className="block px-4 py-2 text-white">
              SETTINGS
            </a>
            <button onClick={logoutHandler} className="block px-4 py-2 text-white">
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
