import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import Style from "./SliderCard.module.css";
// import images from "../../img";
// import LikeProfile from "../../LikeProfile/LikeProfile";

const SliderCard = ({ imageSrc, title, currentBid}) => {
    return (
        <motion.div className={Style.sliderCard}>
            <div className={Style.sliderCard_box}>
                <motion.div className={Style.sliderCard_box_img}>
                    <Image 
                    src={imageSrc} 
                    alt="slider profile" 
                    width={400}
 
                    height={350} 
                    className={Style.sliderCard_box_img_img} 
                    objectFit="cover"/>
                </motion.div>
                <div className={Style.sliderCard_box_title}>
                <p>{title}</p>
                    <p className={Style.sliderCard_box_title_like}>
                        {/* <LikeProfile/> */}
                        {/* <small>1 of 100</small> */}
                    </p>
                </div>

                <div className={Style.sliderCard_box_price}>
                    <div className={Style.sliderCard_box_price_box}>
                        <small>Buy Now</small>
                        <p>{currentBid} ETH</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
};

export default SliderCard;