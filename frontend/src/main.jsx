import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import '../src/index.css'

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<LoginScreen />} />
        <Route  element={<PublicRoutes />} >
          <Route index={true} path='/' element={<HomeScreen />} />
          <Route path='/services'  element={<ServiceScreen />} />
          <Route path="/service/:id" element={<ServiceDetailed/>} />
          <Route path = "/blog" element = {<BlogScreeen /> } />
          <Route path = "/blog/:id" element = {<BlogDetailed /> } />
          <Route path = '/country/:id' element = { <CountryDetailed />} />
          <Route path = '/province/:id' element ={<ProvinceDetailed />}  />
          <Route path = '/university/:id' element ={<UniversityDetailed />}  />
          <Route path = '/course/:id' element = { <CourseDetailed />} />
          <Route path = '/course/all' element=  {<AllCourseDetailed />} />
          <Route path='/aboutus' element= {<AboutDetailed />} />
        </Route>
     
      {/* <Route path='/register' element={<RegisterScreen />} /> */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path= "/admin/dashboard" element={<AdminDashboard />} />
        <Route path= "/admin/webManager" element={<AdminWebManagement />} />
        <Route path= "/admin/blog" element={<AdminBlogManagement />} />
        <Route path = "/admin/course" element={<AdminCourseManagement />} />
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
