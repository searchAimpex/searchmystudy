import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import * as yup from 'yup';
import LoginHero from "../assets/LoginHero2.png";
import Women from "../assets/Women.png"

const Schema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
const LoginScreen = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [login, { isLoading }] = useLoginMutation();
  const [login, { isSuccess, error, isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successfull")
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Schema,
    onSubmit: async ({ email, password }) => {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    }
  })
  const { errors, touched, values, handleChange, handleSubmit } = formik
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully")
      navigate('/')
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  return (
    <div className="bg-white flex justify-center min-h-screen w-screen h-screen">
      <div className="flex flex-col lg:flex-row bg-white w-full h-full">

        <div className="relative lg:w-1/2 w-full p-6 lg:p-16 flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div className="w-full lg:w-[434px]">
              <h1 className="text-black text-4xl lg:text-5xl font-normal tracking-normal leading-normal mb-6 lg:mb-8">
                Login
              </h1>
              <p className="text-[#6e6e6e] text-base mb-6">
                Please enter your login credentials to sign in
              </p>
              <div className="mb-6">
                <label className="block text-[#6e6e6e] text-base mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full h-[60px] rounded-[10px] border border-[#d1d1d1] px-4"
                  placeholder="Enter your email"
                  name=""
                  onChange={handleChange}
                  value={values.email}
                  id="email"
                />
                {errors.email && touched.email && (
                  <span className='text-red-500 pt-2 block'>{errors.email}</span>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-[#6e6e6e] text-base mb-2">Password</label>
                <input
                  type="password"
                  className="w-full h-[60px] rounded-[10px] border border-[#d1d1d1] px-4"
                  placeholder="Enter your password"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <span className='text-red-500 pt-2 block'>{errors.password}</span>
                )}
              </div>
              <div className="flex items-center mb-6">
                <input type="checkbox" className="w-4 h-4 text-[#7754f6] rounded mr-2" />
                <label className="text-[#6e6e6e] text-base">Keep me logged in</label>
                <a href="#" className="ml-auto text-gold-main font-bold text-base">Forgot Password?</a>
              </div>
              <button className="w-full h-[60px] bg-blue-main text-white rounded-[10px] mb-6">
                LOGIN
              </button>


            </div>
          </form>
        </div>
        <div className="relative lg:w-1/2 w-full h-1/2 lg:h-full bg-blue-main">
          <img className="w-full h-full object-cover" alt="Login Hero" src={LoginHero} />

          {/* Centered overlapping image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img className="w-[600px] h-[450px] rounded-full" alt="Women" src={Women} />

            {/* Text below the image */}
            {/* <p className="mt-4 text-white text-lg font-bold">Welcome Back!</p>
          <p className="text-white text-sm">We're glad to see you again.</p> */}
          </div>
          <div className="absolute inset-10 flex flex-col mr-20 items-center justify-center">


            {/* Text below the image */}
            {/* <p className="mt-4 text-white text-lg font-bold">Welcome Back!</p>
          <p className="text-white text-sm">We're glad to see you again.</p> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
