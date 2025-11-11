import React, { useEffect, useState } from 'react';
import Logo from "../../assets/Logo.png";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { CiUser } from "react-icons/ci";
import { toast } from 'react-toastify';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AdminWebManagement from '../../screens/Admin/AdminWebManagement';
import AdminBlogManagement from '../../screens/Admin/AdminBlogManagement';
import AdminCourseManagement from '../../screens/Admin/AdminCourseManagement';
import AdminLeadManagement from '../../screens/Admin/AdminLeadManagement';
import AdminNotificationManagement from '../../screens/Admin/AdminNotificationManagement';
import AdminUserManagement from '../../screens/Admin/AdminUserManagement';
import AdminStudentManagement from '../../screens/Admin/AdminStudentManagement';
import AdminTicketManagement from '../../screens/Admin/AdminTicketManagement';
import AdminAssessmentManagement from '../../screens/Admin/AdminAssessmentManagement';
import AdminUploadManagement from '../../screens/Admin/AdminUploadManagement';
import AdminTransactionLedgerManagement from '../../screens/Admin/AdminTransactionLedgerManagement';
import { useSelector } from "react-redux";
import MbbsAbroad from '../../screens/Admin/MbbsAbroad';


const componentMapping = {
  0: <AdminWebManagement />,
  1: <AdminBlogManagement />,
  2: <AdminCourseManagement />,
  3:<MbbsAbroad/>,
  4: <AdminLeadManagement />,
  5: <AdminNotificationManagement />,
  6: <AdminUserManagement />,
  7: <AdminStudentManagement />,
  8: <AdminTicketManagement />,
  9: <AdminAssessmentManagement />,
  10: <AdminUploadManagement />,
  11: <AdminTransactionLedgerManagement />,

};
function NavBar() {
  const selectedComponent = useSelector((state) => state.component.selectedComponent)
  console.log(selectedComponent );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall, { isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      toast.success('Logged Out Successfully');
    }
  }, [isSuccess])

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
    <>
      <nav className=" shadow-md p-2 h-20 flex flex-row justify-between items-center " >

        <div className="flex flex-row items-center ml-5 cursor-pointer " style={{ border: "0px solid red" }}>
          <div>
            <img src={Logo} alt="Logo" className="h-8" />
          </div>
          <div>
            <span className='text-white font-bold'>AIMPEX</span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4" style={{ border: "0px solid red" }}>
          {/* Dark Mode Toggle Icon */}
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="panel-right-open" class="lucide lucide-panel-right-open size-4"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M15 3v18"></path><path d="m10 15-3-3 3-3"></path></svg>
          </div>

          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z" />
            </svg>
            <input type="text" placeholder="Search..."
              class="pl-10 pr-4 py-2 w-full rounded-lg outline-none focus:ring-0 focus:outline-none border-none" />
          </div>

        </div>

        <div className="flex flex-row items-center ml-5 cursor-pointer " >
          <div>
            {/* <img src={Logo} alt="Logo" className="h-8" /> */}
          </div>
          <div>
            <span className='text-white font-bold'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4">
          {/* Dark Mode Toggle Icon */}
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-moon text-gray-400 hover:text-black transition-colors duration-200"
              viewBox="0 0 16 16"
            >
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
            </svg>
          </div>

          {/* Settings Icon */}
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-moon text-gray-400 hover:text-black transition-colors duration-200" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
            </svg>
          </div>

          {/* Profile Image */}
          <div className="">
            <img src="http://searchmystudy.com/assets/SearchMyStudy-34ae1c65.png" alt="User" class=" sm:h-[40px] w-auto " />
          </div>
        </div>


        {/* <div className="relative text-white">
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
</div> */}
      </nav>

      <div className='border border-red flex' style={{ width: "100vw", height: "100vh" }}>
        <div style={{ width: "20%", border: "0px solid red" }}>
          {/* asdcasdsadcsadc  */}
        </div>
        {/* my components */}
        <div style={{ border: "0px solid green", width: "80%" }}>
         

            {componentMapping[selectedComponent] || <p>Select a component from the menu.</p>}
          </div>


      </div>
    </>
  );
}

export default NavBar;
