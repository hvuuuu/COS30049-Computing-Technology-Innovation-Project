import React, { useState } from 'react';
import axios from 'axios';

// Internal import
import Style from "./SignUpPage.module.css"; // Importing CSS module for styles


const SignUpPage = () => {

    const [form, setForm] = useState({
        username: '',
        password: '',
        email: ''
    });
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
            
        // Trim form fields
        const trimmedForm = {
            username: form.username.trim(),
            password: form.password.trim(),
            email: form.email.trim(),
        };

        // Form validation
        if (!trimmedForm.username || !trimmedForm.password || !trimmedForm.email) {
            alert('All fields are required');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedForm.email)) {
            alert('Please enter a valid email');
            return;
        }
    
        // Submit the form
        try {
          const response = await axios.post('http://localhost:5000/sign_up', form);
          alert(response.data.message);
          // Reset form fields after successful submission
          setForm({ username: '', password: '', email: '' });
          window.location.href = '/signin';
        } catch (error) {
            console.error('Error signing up', error);
            // Check if error.response exists before trying to access error.response.data.message
            const errorMessage = error.response ? error.response.data.message : 'Error signing up';
            alert(errorMessage);
        }
    };
    
  return (
    <div className={Style.SignUp}> {/* Main container */}
        <div className={Style.SignUp_box}> {/* Box container */}
            <h2 className={Style.SignUp_box_title}>Sign Up</h2> {/* Title */}
            <form onSubmit={handleSubmit}> {/* Form */}
                <div className={Style.SignUp_box_input}> {/* Input field for username */}
                    <label htmlFor="name">Username</label> {/* Label */}
                    <input type="text" placeholder="Enter your username" className={Style.SignUp_box_input_name} name="username" value={form.username} onChange={handleChange}/> {/* Input field */}
                </div>

                <div className={Style.SignUp_box_input}> {/* Input field for password */}
                    <label htmlFor="password">Password</label> {/* Label */}
                    <input type="password" placeholder="Enter your password" className={Style.SignUp_box_input_password} name="password" value={form.password} onChange={handleChange}/> {/* Input field */}
                </div>

                <div className={Style.SignUp_box_input}> {/* Input field for email */}
                    <label htmlFor="email">Email</label> {/* Label */}
                    <input type="text" placeholder="Enter your email" className={Style.SignUp_box_input_email} name="email" value={form.email} onChange={handleChange} /> {/* Input field */}
                </div>

                <div className={Style.SignUp_box_button}> {/* Button container */}
                    {/* <Button 
                        btnName= "Sign in"
                        handleClick={() => {}}
                        classStyle = {Style.button}
                    /> */}
                    <button className={Style.SignUp_box_button_signup}>Sign Up</button> {/* Sign Up button */}
                </div>

                <div className={Style.SignUp_box_social_message}> {/* Message for social accounts */}
                    <div className={Style.SignUp_box_social_message_line}></div> {/* Line */}
                    <p className={Style.SignUp_box_social_message_msg}>Sign up with social accounts</p> {/* Message */}
                    <div className={Style.SignUp_box_social_message_line}></div> {/* Line */}
                </div>

                <div className={Style.SignUp_box_social_icons}> {/* Container for social icons */}
                    {/* Social login buttons */}
                    <button aria-label="Log in with Google" className={Style.SignUp_box_social_icon}>
                        {/* SVG for Google login */}
                    </button>

                    <button aria-label="Log in with Twitter" className={Style.SignUp_box_social_icon}>
                        {/* SVG for Twitter login */}
                    </button>
            
                    <button aria-label="Log in with GitHub" className={Style.SignUp_box_social_icon}>
                        {/* SVG for GitHub login */}
                    </button>
                </div>

                <div className={Style.SignUp_box_link}> {/* Link for sign in */}
                    <p>
                        Already have an account?  
                        <a rel="noopener noreferrer" href="signin"> Sign in</a> {/* Sign in link */}
                    </p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default SignUpPage;
