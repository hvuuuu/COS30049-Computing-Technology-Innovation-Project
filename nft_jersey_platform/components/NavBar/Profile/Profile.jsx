import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { MdSupportAgent } from "react-icons/md";
import { TbUser, TbUserEdit, TbShirt, TbLogout } from "react-icons/tb";
import Link from 'next/link'
import axios from 'axios'

//INTERNAL IMPORT
import Style from './Profile.module.css'
import images from '../../../img'

const Profile = () => {
    axios.defaults.withCredentials = true;

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetch the username of the logged-in user
                const usernameResponse = await axios.get('http://localhost:5000/get_username');
                const username = usernameResponse.data.username;
                console.log('Username:', username);
    
                // Fetch the user data
                const userResponse = await axios.get(`http://localhost:5000/users/${username}`);
                if (userResponse.status === 200) {
                    setUser(userResponse.data);
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('An error occurred while fetching the user', error);
            }
        };
    
        fetchUser();
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
    
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            // If the user is not logged in, display an alert and return early
            alert('You need to be logged in to log out');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/log_out');
            if (response.status === 200) {
                // Set isLoggedIn to false in local storage
                localStorage.setItem('isLoggedIn', 'false');
    
                // Redirect to the login page after successful logout
                window.location.href = '/signin';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred while logging out', error);
        }
    };

    return (
        <div className={Style.profile}>
            <div className={Style.profile_account}>
                <Image 
                src={images.user10} 
                alt="user profile" 
                width={50} 
                height={50}
                className={Style.profile_account_img}
                />

                <div className={Style.profile_account_info}>
                <p>{user ? user.username : 'Not logged in'}</p>
                <small>{user ? user.user_blockchain_id : 'No blockchain ID'}</small>
                </div>
            </div>

            <div className={Style.profile_menu}>
                <div className={Style.profile_menu_one}>
                    <div className={Style.profile_menu_one_item}>
                        <TbUser/>
                        <p>
                        <Link href={{pathname: "/account"}}>My Profile</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <TbShirt/>
                        <p>
                        <Link href={{pathname: "/account"}}>My Items</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <TbUserEdit/>
                        <p>
                        <Link href={{pathname: "/account"}}>Edit Profile</Link>
                        </p>
                    </div>
                </div>
                <div className={Style.profile_menu_two}>
                    <div className={Style.profile_menu_one_item}>
                        <MdSupportAgent />
                        <p>
                        <Link href={{pathname:"/contactus"}}>Help</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <TbLogout />
                        <p>
                        <Link href={{pathname:"/signin"}} onClick={handleLogout}>Disconnect</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;