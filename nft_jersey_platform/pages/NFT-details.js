import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Slider, Button } from '@/components/components_index';
import NFTDetailsPage from '@/NFTDetailsPage/NFTDetailsPage';

async function fetchNFTData(nft_token_id) {
  const response = await fetch(`http://127.0.0.1:5000/products/${nft_token_id}`); // replace with your API endpoint
  const data = await response.json();
  return data;
}

const NFTDetails = () => {
  const router = useRouter();
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const nft_token_id = router.query.nft_token_id;

    if (nft_token_id) {
      fetchNFTData(nft_token_id).then(data => setNftData(data));
    }
  }, [router.query.nft_token_id]);

  return (
    <div>
      <NFTDetailsPage />
      <Slider />
    </div>
  )
};

export default NFTDetails;