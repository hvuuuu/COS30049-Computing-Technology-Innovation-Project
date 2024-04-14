import React, {useState, useEffect, useContext} from "react";
import { useRouter } from 'next/router'; // Import useRouter hook
import Image from "next/image";
import { MdVerified, MdCloudUpload, MdTimer, MdReportProblem, MdOutlineDeleteSweep } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet} from "react-icons/fa";
import {
    TiSocialFacebook, 
    TiSocialLinkedin, 
    TiSocialTwitter, 
    TiSocialYoutube, 
    TiSocialInstagram, 
} from 'react-icons/ti';
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import { TransactionContext } from "../../context/TransactionContext";

// Internal imports
import Style from './NFTDescription.module.css'; // Importing CSS module for styles
import images from '../../img'; // Importing images
import { Button } from "../../components/components_index"; // Importing Button component

async function fetchNFTData(nft_token_id) {
    const response = await fetch(`http://localhost:5000/products/${nft_token_id}`); // replace with your API endpoint
    const data = await response.json();
    return data;
}

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );

const NFTDescription = () => {
    // State variables
    const [social, setSocial] = useState(false); // State for social share menu visibility
    const [NFTMenu, setNFTMenu] = useState(false); // State for NFT menu visibility
    const [nftData, setNftData] = useState(null); // State for NFT data
    const [showPopup] = useState(false);

    const router = useRouter(); // Initialize useRouter hook
    const { nft_token_id } = router.query; // Get nft_token_id from URL
    const {
        formData,
        setformData,
        handleChange,
        sendTransaction,
      } = useContext(TransactionContext);    

    useEffect(() => {
        if (nft_token_id) { // Check if nft_token_id is available
            fetchNFTData(nft_token_id).then(data => setNftData(data));
        }
    }, [nft_token_id]); // Add nft_token_id to dependency array

    useEffect(() => {
        if (nftData) {
            setformData({
                addressTo: nftData.owner_blockchain_id,
                amount: nftData.price,
                message: nft_token_id
            });
        }
    }, [nftData]);

    // Function to toggle social share menu visibility
    const openSocial = () => {
        if (!social){
            setSocial(true);
            setNFTMenu(false);
        } else {
            setSocial(false);
        }
    };

    // Function to toggle NFT menu visibility
    const openNFTMenu = () => {
        if (!NFTMenu){
            setNFTMenu(true);
            setSocial(false);
        } else {
            setNFTMenu(false);
        }
    };

    if (!nftData) {
        return <div>Loading...</div>;
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    const handleBuyNowClick = () => {
        if (isLoggedIn) {
            const { addressTo, amount, message } = formData;

            if (!addressTo || !amount || !message) return;
            
            sendTransaction(nft_token_id);
        } else {
            alert('You need to be logged in to buy this NFT')
            router.push('/signin'); // replace '/signin' with your actual SignIn page route
        }
    };

    return (
        <div className={Style.NFTDescription}> {/* Container for NFT description */}
            <div className={Style.NFTDescription_box}> {/* Box for NFT description */}
                {/* Part One: Social share and NFT menu */}
                <div className={Style.NFTDescription_box_share}> {/* Share section */}
                    <p></p>
                    <div className={Style.NFTDescription_box_share_box}> {/* Share menu */}
                        <MdCloudUpload 
                            className={Style.NFTDescription_box_share_box_icon} 
                            onClick={() => openSocial()} 
                        />

                        {/* Social share options */}
                        {social && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#"><TiSocialFacebook/> Facebook</a>
                                <a href="#"><TiSocialInstagram/> Instagram</a>
                                <a href="#"><TiSocialLinkedin/> LinkedIn</a>
                                <a href="#"><TiSocialTwitter/> Twitter</a>
                                <a href="#"><TiSocialYoutube/> Youtube</a>
                            </div>
                        )}

                        {/* NFT menu */}
                        <BsThreeDots 
                            className={Style.NFTDescription_box_share_box_icon} 
                            onClick={() => openNFTMenu()}
                        />

                        {/* NFT menu options */}
                        {NFTMenu && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#"><BiDollar/> Change price</a>
                                <a href="#"><BiTransferAlt/> Transfer</a>
                                <a href="#"><MdReportProblem/> Report Abuse</a>
                                <a href="#"><MdOutlineDeleteSweep/> Delete Item</a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Part Two: NFT profile and bidding details */}
                <div className={Style.NFTDescription_box_profile}> {/* Profile section */}
                    <h1>{nftData.title}</h1>
                    <div className={Style.NFTDescription_box_profile_box}> {/* Profile boxes */}
                        {/* Owner profile */}
                        <div className={Style.NFTDescription_box_profile_box_left}>
                            <Image 
                                src={images.user1} 
                                alt="profile" 
                                width={40} 
                                height={40}
                                className={Style.NFTDescription_box_profile_box_left_img}
                            />
                            <div className={Style.NFTDescription_box_profile_box_left_info}>
                                <small>Owner ID</small> <br />
                                <span>{nftData.owner_blockchain_id} <MdVerified/></span>
                            </div>
                        </div>

                    </div>

                    {/* Bidding details */}
                    <div className={Style.NFTDescription_box_profile_biding}>
                        

                        {/* Current bid price */}
                        <div className={Style.NFTDescription_box_profile_biding_box_price}>
                            <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                                <small>Current Price</small>
                                <p>{nftData.price} ETH <span>(~ ${nftData.price * 3932})</span></p>
                            </div>

                        </div>

                        {/* Bid and offer buttons */}
                        <div className={Style.NFTDescription_box_profile_biding_box_button}>
                            <Button 
                                icon=<FaWallet/> 
                                btnName="Buy Now"
                                handleClick={handleBuyNowClick}
                                classStyle={Style.button}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDescription;
