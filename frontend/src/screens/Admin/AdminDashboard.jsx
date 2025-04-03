import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png";
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { setSelectedComponent } from '../../slices/componentSlice';

function AdminDashboard({component}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [component, setComponent] = useState(0); // Holds the currently selected component

  const menuItems = [
    { name: 'Website Manager', path: '/admin/webManager', src: 'https://cdn-icons-png.flaticon.com/512/15862/15862329.png' },
    { name: 'Blog Manager', path: '/admin/blog', src: 'https://cdn-icons-png.flaticon.com/512/3573/3573196.png' },
    { name: 'Course Manager', path: '/admin/course', src: 'https://cdn-icons-png.flaticon.com/512/566/566985.png' },
    { name: 'Lead Manager', path: '/admin/leads', src: 'https://cdn-icons-png.flaticon.com/512/3126/3126647.png' },
    { name: 'Notification Manager', path: '/admin/notification', src: 'https://cdn-icons-png.flaticon.com/512/4991/4991422.png' },
    { name: 'User Manager', path: '/admin/user', src: 'https://cdn-icons-png.flaticon.com/512/16797/16797245.png' },
    { name: 'Student Manager', path: '/admin/student', src: 'https://cdn-icons-png.flaticon.com/512/9931/9931487.png' },
    { name: 'Ticket Manager', path: '/admin/ticket', src: 'https://cdn-icons-png.flaticon.com/512/8943/8943507.png' },
    { name: 'Assessment Manager', path: '/admin/assessment', src: 'https://cdn-icons-png.flaticon.com/512/4337/4337557.png' },
    { name: 'Upload Manager', path: '/admin/upload', src: 'https://cdn-icons-png.flaticon.com/512/159/159626.png' },
    { name: 'Transaction Manager', path: '/admin/transaction', src: 'https://cdn-icons-png.flaticon.com/512/879/879890.png' },
  ];

  const [logoutApiCall, { isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      toast.success('Logged Out Successfully');
    }
  }, [isSuccess, navigate]);

  const logoutHandler = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
      } catch (err) {
        toast.error(err.message);
        console.error(err);
      }
    }
  };

  const componentHandler = (id) => {
    dispatch(setSelectedComponent(id)); // Update Redux store
  }


  return (
    <div className="flex">
      {/* Sidebar */}
      <div className='fixed h-[100vh] w-64 bg-gray-800 text-white top-0 left-0'>
        <div className="p-2 flex flex-row items-center ml-5 cursor-pointer">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
          <span className='text-white font-bold text-[25px]'>AIMPEX</span>
        </div>

        <h2 className='px-3 py-2 border-b text-gray-100 mb-5'>Admin Dashboard</h2>

        {/* Menu Items */}
        <div className='flex flex-col space-y-4'>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className='capitalize flex items-center space-x-2 rounded cursor-pointer text-gray-400 px-2 hover:text-white transition duration-300'
            // onClick={() => navigate(item.path)}
            onClick={() => componentHandler(index)}
            >
              <img src={item.src} alt='icon' className='invert brightness-200 w-4 h-4' />
              <span className='text-[15px] capitalize'>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="button-container my-5 p-2 bg-gray-700 hover:bg-gray-600 cursor-pointer" onClick={logoutHandler}>
          <span className='text-[16px] capitalize flex items-center'>
            <LogoutIcon fontSize="medium" className="mr-2" />
            Logout
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='ml-64 p-5 w-full'>
        <div className='border border-red-500 text-black p-4'>
          <h2 className='text-2xl font-bold'>Selected Component:</h2>
          <p className='text-lg'>{component ? component : "No Component Selected"}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
