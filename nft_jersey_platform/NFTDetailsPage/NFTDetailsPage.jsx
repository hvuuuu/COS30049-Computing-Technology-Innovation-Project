import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import { NFTDescription, NFTDetailsImg } from "./NFTDetailsIndex";
import Style from  "./NFTDetailsPage.module.css";

const NFTDetailsPage = () => {
  const router = useRouter();
  const { nft_token_id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (nft_token_id) {
      fetch(`http://localhost:5000/products/${nft_token_id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }
  }, [nft_token_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Style.NFTDetailsPage}>
        <div className={Style.NFTDetailsPage_box}>
            <NFTDetailsImg/>
            <NFTDescription/>
        </div>
    </div>
  )
};

export default NFTDetailsPage;