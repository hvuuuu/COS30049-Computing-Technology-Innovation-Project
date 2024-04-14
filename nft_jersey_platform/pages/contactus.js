import React from 'react';
import {
    TiSocialFacebook, 
    TiSocialLinkedin, 
    TiSocialTwitter, 
    TiSocialYoutube, 
    TiSocialInstagram, 
    TiArrowSortedDown,
    TiArrowSortedUp,
} from 'react-icons/ti';
import { HiOutlineMail } from "react-icons/hi";
import {RiUserFill} from "react-icons/ri";
import Image from "next/image";

// Internal imports
import Style from '../styles/contactus.module.css'; // Importing CSS module for styles
import formStyle from '../AccountPage/Form/Form.module.css'; // Importing CSS module for form styles
import { Button } from '../components/components_index'; // Importing Button component
import images from '../img'; // Importing images

const contactus = () => {
    // Data arrays
    const founderArray = [
        {
            name: "Huy Vu Tran",
            position: "Co-founder and Project Manager",
            images: images.founder1
        },
        {
            name: "Thai Anh Bui",
            position: "Developer",
            images: images.founder5
        },
        {
            name: "Duc Nhan Nguyen",
            position: "Developer",
            images: images.founder2
        },
        {
            name: "Gia Khanh Lai",
            position: "Developer",
            images: images.founder4
        },
        {
            name: "Gia Bao Nguyen",
            position: "Developer",
            images: images.founder3
        },
    ];

    const factsArray = [
        {
            title: "10 million",
            info: "Articles have been public around the world (as of Jan 25, 2024)"
        },
        {
            title: "100,000",
            info: "Registered users account (as of Jan 25, 2024)"
        },
        {
            title: "220+",
            info: "Countries and regions have our presence (as of Jan 25, 2024)"
        },
    ];

    // JSX to render
    return (
        <div className={Style.contactus}> {/* Main container */}
            <div className={Style.contactus_aboutus}> {/* Container for About Us section */}
                <div className={Style.contactus_aboutus_box}> {/* Box for About Us section */}
                    <div className={Style.contactus_aboutus_box_hero}> {/* Hero section */}
                        <div className={Style.contactus_aboutus_box_hero_left}> {/* Left section */}
                            <h1>👋 About Us</h1> {/* Title */}
                            <p>Welcome to VANKBT, where passion meets performance. We specialize in collecting high-quality football jerseys that blend style with the spirit of the game. Join us in elevating your football experience with VANKBT's commitment to quality and style.</p> {/* Description */}
                        </div>
                        <div className={Style.contactus_aboutus_box_hero_right}> {/* Right section */}
                            <Image 
                                src={images.hero} 
                                alt="Logo" 
                                width={700} 
                                height={700} 
                                className={Style.contactus_aboutus_box_hero_right_img} // Styling for image
                            />
                        </div>
                    </div>

                    <div className={Style.contactus_aboutus_box_title}> {/* Title for Founders */}
                        <h2>☔ Founder</h2> {/* Title */}
                        <p>Welcome to VANKBT, where passion meets performance. We specialize in collecting high-quality football jerseys that blend style with the spirit of the game. Join us in elevating your football experience with VANKBT's commitment to quality and style.</p> {/* Description */}
                    </div>

                    <div className={Style.contactus_aboutus_box_founder}> {/* Container for Founders */}
                        <div className={Style.contactus_aboutus_box_founder_box}> {/* Box for Founders */}
                            {/* Mapping over founderArray to render each founder */}
                            {founderArray.map((el, i) => (
                                <div className={Style.contactus_aboutus_box_founder_box_img} key={i}>
                                    <Image 
                                        src={el.images} 
                                        alt={el.name}
                                        width={500}
                                        height={500}
                                        className={Style.contactus_aboutus_box_founder_box_img_img} // Styling for image
                                    />
                                    <h3>{el.name}</h3> {/* Founder name */}
                                    <p>{el.position}</p> {/* Position */}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={Style.contactus_aboutus_box_title}> {/* Title for Fast Facts */}
                        <h2>🚀 Fast Facts</h2> {/* Title */}
                        <p>Welcome to VANKBT, where passion meets performance. We specialize in collecting high-quality football jerseys that blend style with the spirit of the game. Join us in elevating your football experience with VANKBT's commitment to quality and style.</p> {/* Description */}
                    </div>

                    <div className={Style.contactus_aboutus_box_facts}> {/* Container for Fast Facts */}
                        <div className={Style.contactus_aboutus_box_facts_box}> {/* Box for Fast Facts */}
                            {/* Mapping over factsArray to render each fact */}
                            {factsArray.map((el, i) => (
                                <div className={Style.contactus_aboutus_box_facts_box_info} key={i}>
                                    <h3>{el.title}</h3> {/* Fact title */}
                                    <p>{el.info}</p> {/* Fact information */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={Style.contactus_box}> {/* Container for Contact Us section */}
                <h1>✆ Contact Us</h1> {/* Title */}
                <div className={Style.contactus_box_box}> {/* Box for Contact Us section */}
                    <div className={Style.contactus_box_box_left}> {/* Left section */}
                        {/* Contact information */}
                        <div className={Style.contactus_box_box_left_item}>
                            <h3>🗺 ADDRESS</h3>
                            <p>80 Duy Tan, Cau Giay, Ha Noi, Vietnam.</p>
                        </div>
                        <div className={Style.contactus_box_box_left_item}>
                            <h3>📧 EMAIL</h3>
                            <p>104177995@student.swin.edu.au</p>
                        </div>
                        <div className={Style.contactus_box_box_left_item}>
                            <h3>☏ PHONE</h3>
                            <p>012-345-6789-JQKA</p>
                        </div>
                        <div className={Style.contactus_box_box_left_item}>
                            <h3>🌎 SOCIALS</h3>
                            <a href="#"><TiSocialFacebook /></a>
                            <a href="#"><TiSocialLinkedin /></a>
                            <a href="#"><TiSocialYoutube /></a>
                            <a href="#"><TiSocialInstagram /></a>
                            <a href="#"><TiSocialTwitter /></a>
                        </div>
                    </div>
                    <div className={Style.contactus_box_box_right}> {/* Right section */}
                        <form> {/* Contact form */}
                            <div className={formStyle.Form_box_input}> {/* Input field for fullname */}
                                <label htmlFor="name">Fullname</label>
                                <div className={formStyle.Form_box_input_box}>
                                    <div className={formStyle.Form_box_input_box_icon}>
                                        <RiUserFill />
                                    </div>
                                    <input type="text" placeholder="Thai Anh Bui" className={formStyle.Form_box_input_userName} />
                                </div>
                            </div>
                            <div className={formStyle.Form_box_input}> {/* Input field for email */}
                                <label htmlFor="email">Email</label>
                                <div className={formStyle.Form_box_input_box}>
                                    <div className={formStyle.Form_box_input_box_icon}>
                                        <HiOutlineMail />
                                    </div>
                                    <input type="text" placeholder="Email" />
                                </div>
                            </div>
                            <div className={formStyle.Form_box_input}> {/* Input field for message */}
                                <label htmlFor="description">Message</label>
                                <textarea
                                    name=""
                                    id=""
                                    cols=""
                                    rows=""
                                    placeholder="Something about yourself in few words"
                                ></textarea>
                            </div>
                            {/* Send Message button */}
                            <Button 
                                btnName="Send Message" 
                                handleClick={() => {}} 
                                classStyle={Style.button} 
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default contactus;
