import React from 'react'
import Image from 'next/image'
import {
  TiSocialFacebook, 
  TiSocialLinkedin, 
  TiSocialTwitter, 
  TiSocialYoutube, 
  TiSocialInstagram, 
  TiArrowSortedDown,
  TiArrowSortedUp,
} from 'react-icons/ti'
import {RiSendPlaneFill} from 'react-icons/ri'

// INTERNAL IMPORT
import images from '../../img'
import Style from "./Footer.module.css";
import { Discover, HelpCenter } from '../NavBar/index'

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="Footer Logo" width={150} height={50} />
          <p>Explore the world of exclusive football jersey NFTs – where passion meets blockchain. Own a piece of sports history digitally and showcase your team spirit like never before. Your gateway to unique, limited-edition jerseys awaits.</p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          
            <div className={Style.subscribe_box}>
              <input type='email' placeholder='Enter your email *' />
              <RiSendPlaneFill className={Style.subscribe_box_send} />
            </div>
            <div className={Style.subscribe_box_info}>
              <p>Join the future of sports memorabilia with our secure NFT marketplace.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer