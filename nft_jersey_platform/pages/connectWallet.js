import React, { useState } from 'react';
import Image from 'next/image';
import Style from '../styles/connectWallet.module.css';
import images from '../img';
import axios from 'axios';

const ConnectWallet = () => {
	axios.defaults.withCredentials = true;
	
	const [activeBtn, setActiveBtn] = useState(1);

	const providerArray = [
		{
			provider: images.provider_1,
			name: 'Metamask',
		},
		{
			provider: images.provider_2,
			name: 'walletConnect',
		},
		{
			provider: images.provider_3,
			name: 'walletlink',
		},
		{
			provider: images.provider_4,
			name: 'Formatic',
		},
	];

	const connectToMetaMask = async () => {
		// Check if the user is logged in
		const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
		if (!isLoggedIn) {
			// If the user is not logged in, display an alert and return early
			alert('You need to be logged in to connect to your wallet');
			return;
		}

		try {
			// Check if MetaMask is installed
			if (window.ethereum) {
				// Fetch the username of the logged-in user
				const usernameResponse = await axios.get('http://localhost:5000/get_username');
				const username = usernameResponse.data.username;
				console.log('Username:', username);

				// Request access to MetaMask accounts
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				const blockchain_id = accounts[0];

				// Check if the blockchainId is already in use
				const blockchainIdResponse = await axios.get(`http://localhost:5000/blockchain_ids/${blockchain_id}`);
				console.log('Blockchain ID response:', blockchainIdResponse.data.username);
				if (blockchain_id === blockchainIdResponse.data.user_blockchain_id && username !== blockchainIdResponse.data.username) {
					alert('This blockchain ID is already in use.');
					await window.ethereum.request({
						method: "wallet_requestPermissions",
						params: [
							{
								eth_accounts: {}
							}
						]
					});
				} else {
					alert('Wallet connected successfully.'); // Display a pop-up notification

					// Switch to Sepolia network
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: '0xaa36a7' }], // Chain ID for Sepolia
					});

					// Request account balance
					const balanceInWeiHex = await window.ethereum.request({ method: 'eth_getBalance', params: [blockchain_id, 'latest'] });
					const balanceInWei = BigInt(balanceInWeiHex); // Convert hexadecimal to decimal

					// Convert Wei to Ether and round to 4 decimal places
					const balanceInEther = (Number(balanceInWei) / 10**18).toFixed(4);
					console.log('Account balance in Ether:', balanceInEther);
					
					// Update the user's information in the database
					updateUserInfo(blockchain_id, balanceInEther);
				}
			} else {
				alert('MetaMask not detected. Please install MetaMask to connect.');
			}
		} catch (error) {
			console.error('Error connecting to MetaMask:', error);
		}
	};

	async function updateUserInfo(blockchainId, balanceInEther) {
		try {
			// Fetch the username of the logged-in user
			const usernameResponse = await axios.get('http://localhost:5000/get_username');
			const username = usernameResponse.data.username;
			console.log('Username:', username);
			
			// Send a request to the server to update the user's information
			const response = await axios.post(`http://localhost:5000/users/${username}/update`, {
				blockchainId,
				balanceInEther,
			});
	
			if (response.status !== 200) {
				throw new Error('Response was not ok');
			}
	
			const data = response.data;
	
			// Handle the response data here
		} catch (error) {
			console.error('Error updating user info:', error);
		}
	}

  return (
    <div className={Style.connectWallet}>
		<div className={Style.connectWallet_box}>
			<h1>Connect your wallet</h1>
			<p className={Style.connectWallet_box_para}>
			Connect with one of our available wallet providers or create a new one
			</p>

			<div className={Style.connectWallet_box_provider}>
				{providerArray.map((el, i) => (
					<div
					className={`${Style.connectWallet_box_provider_item} ${
						activeBtn === i + 1 ? Style.active : ''
					}`}
					key={i + 1}
					onClick={(e) => {
						e.preventDefault(); // Call preventDefault here
						setActiveBtn(i + 1);
						connectToMetaMask(); // Call the connectToMetaMask function when clicked
					}}
					>
						<Image
							src={el.provider}
							alt={el.provider}
							width={50}
							height={50}
							className={Style.connectWallet_box_provider_item_img}
						/>
						<p>{el.name}</p>
					</div>
				))}
			</div>
		</div>
    </div>
  );
};

export default ConnectWallet;
