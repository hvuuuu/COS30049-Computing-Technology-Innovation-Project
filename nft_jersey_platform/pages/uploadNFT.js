import React from 'react'; 

//Internal import
import Style from "../styles/upload-nft.module.css";
import {UploadNFT} from "../UploadNFT/uploadNFTIndex"; 
const uploadNFT = () => {
    return (
        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>
                        You can set up and upload your own NFT item to the marketplace.  
                    </p>
                </div>

                <div className={Style.uploadNFT_box_title}>
                    <h2>Image</h2> 
                    <p>File types supported : JPG, PNG, SVG. Max Size: 100MB</p>
                </div>

                <div className={Style.uploadNFT_box_form}>
                    <UploadNFT />
                </div>
            </div>
        </div>
    )
};

export default uploadNFT;  