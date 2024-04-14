import React, { useContext, useState, useEffect } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { RiCopperCoinFill, RiUserFill, RiLock2Fill } from "react-icons/ri";
import { TransactionContext } from "../../context/TransactionContext";
import axios from 'axios';
import Link from "next/link";

import Style from "./Form.module.css";
import { Button } from "../../components/components_index";
import { shortenAddress } from "./shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, amount, timestamp, message }) => {
    return (
        <div>
            <div>
                <p>{message}</p>
            </div>
            <div>
                <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: "#4c5773" }}>
                    <p>{shortenAddress(addressFrom)}</p>
                </a>
            </div>
            <div>
                <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: "#4c5773" }}>
                    <p>{shortenAddress(addressTo)}</p>
                </a>
            </div>
            
            <div>
                <p>{timestamp}</p>
            </div>
            <div>
                <p>{amount}</p>
            </div>
        </div>
    );
};

const Transactions = ({ transactions }) => {
    return (
        <table className={`${Style.transactionTable} w-full`}>
            <thead>
                <tr>
                    <th>NFT ID</th>
                    <th>Transaction From</th>
                    <th>Transaction To</th>
                    <th className="w-20">Time Stamp</th> 
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td><TransactionsCard message={transaction.message} /></td>
                        <td><TransactionsCard addressFrom={transaction.addressFrom} /></td>
                        <td><TransactionsCard addressTo={transaction.addressTo} /></td>
                        <td><TransactionsCard timestamp={transaction.timestamp} /></td> 
                        <td><TransactionsCard amount={`${transaction.amount} ETH`}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Form = () => {
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetch the username of the logged-in user
                const usernameResponse = await axios.get('http://localhost:5000/get_username');
                const username = usernameResponse.data.username;
    
                // Fetch the user data
                const userResponse = await axios.get(`http://localhost:5000/users/${username}`);
                if (userResponse.status === 200) {
                    setUser(userResponse.data);
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('An error occurred while fetching the user', error);
            }
        };
    
        fetchUser();
    }, []);

    const { transactions, error } = useContext(TransactionContext);

    return (
        <div className={Style.Form}>
            <div className={Style.Form_box}>
                <form>
                    {/* Username Input */}
                    <div className={Style.Form_box_input}>
                        <label htmlFor="name">Username</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <RiUserFill />
                            </div>
                            <input type="text" placeholder={user ? user.username : 'Not logged in'} className={Style.Form_box_input_userName} />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className={Style.Form_box_input}>
                        <label htmlFor="password">Password</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <RiLock2Fill />
                            </div>
                            <input type="text" placeholder={user ? user.password : 'Not logged in'} />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className={Style.Form_box_input}>
                        <label htmlFor="email">Email</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <HiOutlineMail />
                            </div>
                            <input type="text" placeholder={user ? user.email : 'Not logged in'} />
                        </div>
                    </div>

                    {/* Account Balance Input */}
                    <div className={Style.Form_box_input}>
                        <label htmlFor="balance">Account Balance</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <RiCopperCoinFill />
                            </div>
                            <input type="text" placeholder={user ? user.balance : 'Not logged in'} />
                        </div>
                    </div>
                    
                    {/* Transaction History Table */}
                    <div className={Style.Form_box_input}>
                        <label htmlFor="history">Transaction History</label>
                        <div>
                            <Transactions transactions={transactions} />
                        </div>
                    </div>

                    {/* Error Handling */}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Upload Button */}
                    <div className={Style.Form_box_btn}>
                        <Link href="/connectWallet">
                            <Button
                                btnName="Connect Wallet"
                                handleClick={() => {}}
                                classStyle={Style.button}
                            />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;