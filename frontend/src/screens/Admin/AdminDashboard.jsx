import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebManagement from '../../assets/WebManagement.png';
import Logo from "../../assets/Logo.png";
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
    { name: 'Website Managemer', path: '/admin/webManager' },
    { name: 'Blog Managemer', path: '/admin/blog' },
    { name: 'Course Managemer', path: '/admin/course' },
    { name: 'Lead Managemer', path: '/admin/leads' },
    { name: 'Notification Managemer', path: '/admin/notification' },
    { name: 'User Managemer', path: '/admin/user' },
    { name: 'Student Managemer', path: '/admin/student' },
    { name: 'Ticket Managemer', path: '/admin/ticket' },
    { name: 'Assessment Managemer', path: '/admin/assessment' },
    { name: 'Upload Managemer', path: '/admin/upload' },
    { name: 'Transation Managemer', path: '/admin/transaction' },
  ];
  const [logoutApiCall, { isSuccess }] = useLogoutMutation();


  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      toast.success('Logged Out Successfully');
    }
  }, [isSuccess])

  const logoutHandler = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
      } catch (err) {
        toast.error(err.message);
        console.error(err);
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className='fixed h-[100vh]  w-64 bg-gray-800 text-white top-0 left-0'>
        <div className="p-2 flex flex-row items-center ml-5 cursor-pointer">
          <div>
            <img src={Logo} alt="Logo"  className=" w-12 h-12" />
          </div>
          <div>
            <span className='text-white font-bold  text-[25px]'>AIMPEX</span>
          </div>
        </div>

        <h2 className='px-3 py-2 border-b text-gray-100 mb-5'>Admin Dashboard</h2>
        <div className='flex flex-col space-y-4'>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className='capitalize flex items-center space-x-2 rounded cursor-pointer  text-gray-400 hover:text-white transition duration-300'
              onClick={() => navigate(item.path)}
            >
              <img src={WebManagement} alt='icon' className='invert brightness-200 w-6 h-6' />
              <span className='text-[15px]  capitalize'>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="button-container my-5 p-2 bg-gray-700 hover:bg-gray-600 cursor-pointer" onClick={logoutHandler}>
      
        <span className='text-[16px]  capitalize '>
          <LogoutIcon fontSize="medium" className="transition-transform duration-300 group-hover:translate-x-1" />
          Logout
          </span>
        </div>



      </div>
    </>
  );
}

export default AdminDashboard;
