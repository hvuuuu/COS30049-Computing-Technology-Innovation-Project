import React from 'react';

//INTERNAL IMPORT
import Style from '../styles/index.module.css'
import { HeroSection, Service, Subscribe, Title, Filter, NFTCard, Slider } from '../components/components_index';

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <Subscribe />
      {/* <Title 
        heading="Featured NFTs"
        paragragh="Discover, collect, and sell NFTs"/> */}
      <Slider />
      {/* <Title 
        heading="Featured NFTs"
        paragragh="Discover the most oustanding NFT Jerseys."/>
      <Filter />
      <NFTCard /> */}
    </div>
  )
};

export default Home;