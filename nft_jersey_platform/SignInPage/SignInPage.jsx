import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Internal import
import Style from "./SignInPage.module.css"; // Importing CSS module for styles


const SignInPage = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
      });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!form.username || !form.password) {
            alert('All fields are required');
            return;
        }   
        // Check if the user is already logged in
        if (localStorage.getItem('isLoggedIn') === 'true') {
            alert('You are already logged in');
            window.location.href = '/';
            return;
        } else {
            // Submit the form
            try {
                const response = await axios.post('http://localhost:5000/log_in', form);
                alert(response.data.message);
                // Set the flag in the local storage
                localStorage.setItem('isLoggedIn', 'true');

                window.location.href = '/';
                // You can add more code here to handle successful login
            } catch (error) {
                console.error('Error logging in', error);
                // Check if error.response exists before trying to access error.response.data.message
                const errorMessage = error.response ? error.response.data.message : 'Error logging in';
                alert(errorMessage);
            }
        }
    };
      
  return (
    <div className={Style.SignIn}> {/* Main container */}
        <div className={Style.SignIn_box}> {/* Box container */}
            <h2 className={Style.SignIn_box_title}>Sign In</h2> {/* Title */}
            <form onSubmit={handleSubmit}> {/* Form */}
                <div className={Style.SignIn_box_input}> {/* Input field for username */}
                    <label htmlFor="name">Username</label> {/* Label */}
                    <input type="text" name="username" value={form.username} placeholder="Enter your username" className={Style.SignIn_box_input_name} onChange={handleChange}/> {/* Input field */}
                </div>

                <div className={Style.SignIn_box_input}> {/* Input field for password */}
                    <label htmlFor="password">Password</label> {/* Label */}
                    <input type="password" name="password" value={form.password} placeholder="Enter your password" className={Style.SignIn_box_input_password} onChange={handleChange}/> {/* Input field */}
                    <div className={Style.SignIn_box_input_password_forgot}> {/* Link for forgot password */}
                        <a rel="noopener noreferrer" href="#">Forgot Password ?</a> {/* Forgot Password link */}
                    </div>
                </div>

                <div className={Style.SignIn_box_button}> {/* Button container */}
                    {/* <Button 
                        btnName= "Sign in"
                        handleClick={() => {}}
                        classStyle = {Style.button}
                    /> */}
                    <button className={Style.SignIn_box_button_signin}>Sign In</button> {/* Sign In button */}
                </div>

                <div className={Style.SignIn_box_social_message}> {/* Message for social accounts */}
                    <div className={Style.SignIn_box_social_message_line}></div> {/* Line */}
                    <p className={Style.SignIn_box_social_message_msg}>Sign in with social accounts</p> {/* Message */}
                    <div className={Style.SignIn_box_social_message_line}></div> {/* Line */}
                </div>

                <div className={Style.SignIn_box_social_icons}> {/* Container for social icons */}
                    {/* Social login buttons */}
                    <button aria-label="Log in with Google" className={Style.SignIn_box_social_icon}>
                        {/* SVG for Google login */}
                    </button>

                    <button aria-label="Log in with Twitter" className={Style.SignIn_box_social_icon}>
                        {/* SVG for Twitter login */}
                    </button>
            
                    <button aria-label="Log in with GitHub" className={Style.SignIn_box_social_icon}>
                        {/* SVG for GitHub login */}
                    </button>

                    {/* <p className={Style.SignIn_box_link}>Don't have an account?
                        <a rel="noopener noreferrer" href="#">Sign up</a>
                    </p> */}
                </div>

                <div className={Style.SignIn_box_link}> {/* Link for sign up */}
                    <p>
                        Don't have an account?  
                        <a rel="noopener noreferrer" href="signup"> Sign up</a> {/* Sign up link */}
                    </p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default SignInPage;
