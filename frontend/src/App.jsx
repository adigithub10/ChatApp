import React, { useState } from 'react';
import confetti from "canvas-confetti";
import axios from 'axios'; // Import axios for making API requests
import { Button } from "./components/ui/button"; 
import { SuccessMessage } from "./components/ui/successmessage"; 
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import 'react-toastify/dist/ReactToastify.css';
 // Import CSS for toast notifications

export function ConfettiSideCannons() {
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = async () => {
    try {
        // Make a POST request to your backend API
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password
        });

        // Handle success
        if (response.data.success) {
            // Trigger confetti animation
            const end = Date.now() + 3 * 1000; // 3 seconds
            const colors = ["#6a4cff", "#fc5c7d", "#fbc7d4", "#34e89e"];

            const frame = () => {
                if (Date.now() > end) return;

                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 0, y: 0.5 },
                    colors: colors,
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 1, y: 0.5 },
                    colors: colors,
                });

                requestAnimationFrame(frame);
            };

            frame();

            setIsSuccessVisible(true);
            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 3000);

            localStorage.setItem('token', response.data.token);
           
            const userData = response.data.user;

            // Navigate to another page after login, e.g., dashboard
           // navigate('/dashboard'); // Change '/dashboard' to your desired path

        } else {
            // Handle login errors based on the error message from the server
            if (response.data.message === 'Invalid email') {
                toast.error('Invalid email!');
            } else if (response.data.message === 'User not found') {
                toast.error('User not found!');
            } else if (response.data.message === 'Incorrect password') {
                toast.error('Incorrect password!');
            } else {
                toast.error('Login failed!');
            }
            console.error('Login failed:', response.data.message);
        }
    } catch (error) {
        // Handle request error
        if (error.response && error.response.status === 400) {
            // Handle 400 errors specifically
            toast.error(error.response.data.message || 'Invalid request');
        } else {
            // Handle other errors (network issues, server errors, etc.)
            toast.error('Error connecting to backend!');
        }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          <span>C</span><span>h</span><span>a</span><span>t</span><span> </span><span>X</span>
        </h2>
        <p className="login-subtitle">Login</p>
        <div className="form-group">
          <input 
            type="text" 
            className="form-input" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            className="form-input" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <Button onClick={handleClick}>Login</Button>
        <SuccessMessage isVisible={isSuccessVisible} />
        <ToastContainer /> {/* Add ToastContainer to render toast messages */}
        <div className="form-footer text-white-50">
          <p>Don’t have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default {ConfettiSideCannons};
