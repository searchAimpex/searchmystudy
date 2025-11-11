import React, { useEffect } from 'react';
import PublicNavBar from '../components/Public/PublicNavBar';
import Footer from '../components/Public/Footer';
import image from '../assets/login-image.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
     const navigate = useNavigate();
    return (
       <div className="flex flex-col min-h-screen">
                <PublicNavBar />
                <div className="flex flex-col-reverse md:flex-row items-center justify-center flex-1 px-4 py-10 md:px-20">
                    <div className="w-full md:w-3/4 lg:w-[70%]">
                        <StyledWrapper>
                            <form className="form shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* <div className="flex-column">
                                        <label>First Name</label>
                                        <div className="inputForm">
                                            <input placeholder="Enter First Name" className="input" type="text" />
                                        </div>
                                    </div>
    
                                    <div className="flex-column">
                                        <label>Last Name</label>
                                        <div className="inputForm">
                                            <input placeholder="Enter Last Name" className="input" type="text" />
                                        </div>
                                    </div>
    
                                    <div className="flex-column">
                                        <label>Qualification</label>
                                        <div className="inputForm">
                                            <input placeholder="Enter Qualification" className="input" type="text" />
                                        </div>
                                    </div>
    
                                    <div className="flex-column">
                                        <label>Phone Number</label>
                                        <div className="inputForm">
                                            <input placeholder="Enter Phone Number" className="input" type="tel" />
                                        </div>
                                    </div>
     */}                               <div className="flex-column md:col-span-2">
                                        <label>Email</label>
                                        <div className="inputForm">
                                            <input placeholder="Enter Email" className="input" type="email" />
                                        </div>
                                    </div>
                                    <div className="flex-column md:col-span-2">
                                        <label>Email</label>
                                        <div className="inputForm">
                                            <input placeholder="Enter Email" className="input" type="email" />
                                        </div>
                                    </div>
                                </div>
    
                                <button className="w-full mt-6 bg-gold-main py-3 rounded text-white font-semibold hover:bg-yellow-600 transition">
                                    Sign Up
                                </button>
    
                                <p className="p">
                                    Already have an account?
                                    <span onClick={() => navigate('/SignUp')} className="span"> Sign In</span>
                                </p>
                            </form>
                        </StyledWrapper>
                    </div>
                    

                         {/* Image */}
                <div className="w-full md:w-1/2">
                    <img src={image} alt="Login" className="w-full h-auto object-cover" />
                </div>
            
                </div>
                <Footer />
            </div>
    );
};



const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 20px;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    font-family: inherit;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 5px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin-top: 10px;
  }
`;

export default Signin;
