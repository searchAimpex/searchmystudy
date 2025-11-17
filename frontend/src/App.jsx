import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import ScrollToTop from './components/Public/ScrollToTop';

const App = () => {
  return (
    <>
    {/* <Header /> */}
      <ScrollToTop />
      <ToastContainer />
      <div>
        <Outlet />   
      </div>
    </>
  );
};

export default App;
