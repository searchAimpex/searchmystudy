import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import '../src/index.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/Routes/PrivateRoute.jsx';
import AdminDashboard from './screens/Admin/AdminDashboard.jsx';
import PublicRoutes from './components/Routes/PublicRoutes.jsx';
import AdminWebManagement from './screens/Admin/AdminWebManagement.jsx';
import ServiceScreen from './screens/Public/ServiceScreen.jsx';
import ServiceDetailed from './screens/Public/ServiceDetailed.jsx';
import AdminBlogManagement from './screens/Admin/AdminBlogManagement.jsx';
import BlogScreeen from './screens/Public/BlogScreeen.jsx';
import BlogDetailed from './screens/Public/BlogDetailed.jsx';
import AdminCourseManagement from './screens/Admin/AdminCourseManagement.jsx';
import CountryDetailed from './screens/Public/CountryDetailed.jsx';
import ProvinceDetailed from './screens/Public/ProvinceDetailed.jsx';
import UniversityDetailed from './screens/Public/UniversityDetailed.jsx';
import CourseDetailed from './screens/Public/CourseDetailed.jsx';
import AllCourseDetailed from './screens/Public/AllCourseDetailed.jsx';
import AboutDetailed from './screens/Public/AboutDetailed.jsx';
import AllCountryDetailled from './screens/Public/AllCountryDetailled.jsx';
import ContactUs from './screens/Public/ContactUs.jsx';
import AdminLeadManagement from './screens/Admin/AdminLeadManagement.jsx';
import MbbsIndia from './screens/Public/MbbsIndia.jsx';
import CounsellorAll from './components/Public/CounsellorAll.jsx';
import MdIndia from './screens/Public/MdIndia.jsx';
import BamsIndia from './screens/Public/BamsIndia.jsx';
import BhmsIndia from './screens/Public/BhmsIndia.jsx';
import BdsIndia from './screens/Public/BdsIndia.jsx';
import NursingIndia from './screens/Public/NursingIndia.jsx';
import PharmacyIndia from './screens/Public/PharmacyIndia.jsx';
import BvScIndia from './screens/Public/BvScIndia.jsx';
import AdminUserManagement from './screens/Admin/AdminUserManagement.jsx';
import AdminStudentManagement from './screens/Admin/AdminStudentManagement.jsx';
import StudentUpdate from './screens/Admin/StudentUpdate.jsx';
import AdminTicketManagement from './screens/Admin/AdminTicketManagement.jsx';
import AdminAssessmentManagement from './screens/Admin/AdminAssessmentManagement.jsx';
import AdminUploadManagement from './screens/Admin/AdminUploadManagement.jsx';
import AdminTransactionLedgerManagement from './screens/Admin/AdminTransactionLedgerManagement.jsx';
import AdminNotificationManagement from './screens/Admin/AdminNotificationManagement.jsx';
import Videos from './screens/Public/Videos.jsx';
import CountryAdd from './components/Admin/CountryAdd.jsx';
import ProvinceAdd from './components/Admin/ProvinceAdd.jsx';
import AddUniversity from './components/Admin/AddUniversity.jsx';
import AddUniversitys from './components/Admin/AddUniversity.jsx';
import Signin from './screens/Signin.jsx';
import SignUp from './screens/SignUp.jsx';
import MbbsAbroad from './screens/Admin/MbbsAbroad.jsx';
import MbbsCountryDetailed from './screens/Public/MbbsCountryDetailed.jsx';

// import UserLogin from './screens/Signin.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/Signin' element={< Signin />} />
      <Route element={<PublicRoutes />} >
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/services' element={<ServiceScreen />} />
        <Route path="/service/:id" element={<ServiceDetailed />} />
        <Route path="/blog" element={<BlogScreeen />} />
        <Route path="/blog/:id" element={<BlogDetailed />} />
        <Route path='/country/:id' element={<CountryDetailed />} />
        <Route path='/MbbsCountryDetailed/:id' element={<MbbsCountryDetailed />} />
        <Route path='/country' element={< AllCountryDetailled />} />
        <Route path='/province/:id' element={<ProvinceDetailed />} />
        <Route path='/university/:id' element={<UniversityDetailed />} />
        <Route path='/course/:id' element={<CourseDetailed />} />
        <Route path='/course/all' element={<AllCourseDetailed />} />
        <Route path='/aboutus' element={<AboutDetailed />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/mbbsindia' element={<MbbsIndia />} />
        <Route path='/counseller' element={<CounsellorAll />} />
        <Route path='/mdindia' element={<MdIndia />} />
        <Route path="/bamsindia" element={<BamsIndia />} />
        <Route path="/bhmsindia" element={<BhmsIndia />} />
        <Route path='/bdsindia' element={<BdsIndia />} />
        <Route path='/nursingindia' element={< NursingIndia />} />
        <Route path='/pharmacyindia' element={<PharmacyIndia />} />
        <Route path='/bvScindia' element={< BvScIndia />} />
        <Route path='/videos' element={<Videos />} />



      </Route>
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/webManager" element={<AdminWebManagement />} />
        <Route path="/admin/blog" element={<AdminBlogManagement />} />
        <Route path="/admin/course" element={<AdminCourseManagement />} />
        <Route path="/admin/leads" element={<AdminLeadManagement />} />
        <Route path="/admin/notification" element={<AdminNotificationManagement />} />
        <Route path='/admin/user' element={<AdminUserManagement />} />
        <Route path='/admin/student' element={<AdminStudentManagement />} />
        <Route path='/admin/student/update' element={<StudentUpdate />} />
        <Route path='/admin/ticket' element={<AdminTicketManagement />} />
        <Route path='/admin/assessment' element={< AdminAssessmentManagement />} />
        <Route path='/admin/upload' element={< AdminUploadManagement />} />
        <Route path='/admin/transaction' element={< AdminTransactionLedgerManagement />} />
        <Route path='/admin/addcountry' element={< CountryAdd />} />
        <Route path='/admin/MbbsAbroad' element={< MbbsAbroad />} />
        <Route path='/admin/addprovince' element={< ProvinceAdd />} />
        <Route path='/admin/adduniversity' element={< AddUniversitys />} />

      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
