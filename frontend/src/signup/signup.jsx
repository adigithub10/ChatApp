import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "../components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
    }

    const formdata = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        gender: formData.gender
    };

    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', formdata);

        if (response.data.success) {
            toast.success('Signup successful!Redirecting To Login Page');
            // Add a delay before navigating to the login page
            setTimeout(() => {
                navigate('/login');
            }, 5000); // 1.5 seconds delay
        } else {
            toast.error('Signup failed: ' + response.data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error('Error during signup: ' + (error.response?.data?.message || 'Unknown error'));
    }
};



   // Log the data being sent



  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">
          <span>C</span><span>h</span><span>a</span><span>t</span><span> </span><span>X</span>
        </h2>
        <h3 className="signup-ti">CREATE AN ACCOUNT</h3>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-group gender-group">
          <label>Gender:</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <ToastContainer   position="top-right"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    toastClassName="custom-toast"
    bodyClassName="custom-toast-body"
    progressClassName="custom-toast-progress" />
        <div className="form-footer text-white-50">
          <p>Already have an account? <Link to="/login" className="login-link">Login Here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
