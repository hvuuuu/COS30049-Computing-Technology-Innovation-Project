import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'; // Import useRouter hook
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import Style from "./NFTDetailsImg.module.css"; // Importing CSS module for styles

async function fetchNFTData(nft_token_id) {
    const response = await fetch(`http://localhost:5000/products/${nft_token_id}`); // replace with your API endpoint
    const data = await response.json();
    return data;
}

const NFTDetailsImg = () => {
    // State variables
    const [description, setDescription] = useState(true); // State for description section visibility
    const [details, setDetails] = useState(true); // State for details section visibility
    const [nftData, setNftData] = useState(null); // State for NFT data

    const router = useRouter(); // Initialize useRouter hook
    const { nft_token_id } = router.query; // Get nft_token_id from URL

    useEffect(() => {
        if (nft_token_id) { // Check if nft_token_id is available
        fetchNFTData(nft_token_id).then(data => setNftData(data));
        }
    }, [nft_token_id]); // Add nft_token_id to dependency array


    // Function to toggle description section visibility
    const openDescription = () => {
        setDescription(!description);
    };

    // Function to toggle details section visibility
    const openDetails = () => {
        setDetails(!details);
    };

    if (!nftData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={Style.NFTDetailsImg}> {/* Container for NFT details */}
            <div className={Style.NFTDetailsImg_box}> {/* Box for NFT details */}
                <div className={Style.NFTDetailsImg_box_NFT}> {/* NFT section */}
                

                    <div className={Style.NFTDetailsImg_box_NFT_img}> {/* NFT image */}
                        <Image
                        src={nftData.image}
                        className={Style.NFTDetailsImg_box_NFT_img_img}
                        alt="NFT image"
                        width={700}
                        height={700}
                        objectFit="cover"
                        />
                    </div>
                </div>

                <div className={Style.NFTDetailsImg_box_description} 
                    onClick={() => openDescription()}> {/* Description section */}
                    <p>Description</p> {/* Description label */}
                    {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />} 
                    {/* Icon for toggle */}
                </div>

                {/* Description content */}
                {description && (
                    <div className={Style.NFTDetailsImg_box_description_box}>
                        <p>{nftData.description}</p> {/* Placeholder text */}
                    </div>
                )}

                <div className={Style.NFTDetailsImg_box_details} 
                    onClick={() => openDetails()}> {/* Details section */}
                    <p>Details</p> {/* Details label */}
                    {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />} {/* Icon for toggle */}
                </div>

                {/* Details content */}
                {details && (
                    <div className={Style.NFTDetailsImg_box_details_box}>
                        <small>700 x 700 px. IMAGE (685KB)</small> {/* Image details */}
                        <p>
                            <small>Token ID</small> {/* Token ID label */}
                            {nftData.nft_token_id} {/* Token ID value */}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTDetailsImg;
