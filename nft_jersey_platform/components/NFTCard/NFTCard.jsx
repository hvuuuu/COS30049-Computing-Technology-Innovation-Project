import React, { useEffect, useState } from 'react';
import Style from "./NFTCard.module.css";
import Image from 'next/image';
import Link from 'next/link';

const NFTCard = ({ category, searchTerm, sortOrder }) => {
    console.log(`Category prop: ${category}`);
    console.log(`Search term prop: ${searchTerm}`);
    console.log(`Sort order prop: ${sortOrder}`); 

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Include the category, search term, and sort order in the fetch URL as query parameters
        let url = 'http://localhost:5000/products';
        if (category || searchTerm || sortOrder) {
            url += '?';
            if (category) {
                url += `category=${encodeURIComponent(category)}`;
            }
            if (searchTerm) {
                if (category) {
                    url += '&';
                }
                url += `search=${encodeURIComponent(searchTerm)}`;
            }
            if (sortOrder) {
                if (category || searchTerm) {
                    url += '&';
                }
                url += `sort=${encodeURIComponent(sortOrder)}`;
            }
        }

        fetch(url)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }, [category, searchTerm, sortOrder]); // Add searchTerm to the dependency array so the effect runs again if the search term changes

    return (
        <div className={Style.NFTCard}>
            {products.map((product, i) => (
                <Link href={`/NFT-details?nft_token_id=${product.nft_token_id}`} key={i} className={Style.NFTCard_link}>
                    <div className={Style.NFTCard_box} key={i}>
                        <div className={Style.NFTCard_box_img}>
                            <Image 
                                src={product.image} 
                                alt="NFT images" 
                                width={400} 
                                height={400}
                                className={Style.NFTCard_box_img_img}
                            />
                        </div>

                        <div className={Style.NFTCard_box_update_details}>
                            <div className={Style.NFTCard_box_update_details_price}>
                                <div className={Style.NFTCard_box_update_details_price_box}>
                                    <h4>{product.title}</h4>

                                    <div className={Style.NFTCard_box_update_details_price_box_box}>
                                        <div className={Style.NFTCard_box_update_details_price_box_bid}>
                                            <small>Buy Now</small>
                                            <p>{product.price} ETH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default NFTCard;