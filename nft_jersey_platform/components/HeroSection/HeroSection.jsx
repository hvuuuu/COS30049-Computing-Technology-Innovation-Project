import React from 'react'
import Image from 'next/image'
import Link from "next/link";

//INTERNAL IMPORT
import Style from './HeroSection.module.css'
import { Button } from '../components_index'
import images from '../../img'
const HeroSection = () => {
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Discover, collect, and sell NFTs ️⚽️</h1>
          <p>Discover the most outstanding NFT jerseys in football.</p>
          <Link href={{pathname: "/searchPage"}}>
            <Button btnName='Start your search' handleClick={() => {}} />
          </Link>
        </div>
        <div className={Style.heroSection_box_right}>
          <Image 
            src={images.hero} 
            alt='Hero section' 
            width={700} 
            height={600} 
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection