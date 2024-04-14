import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../components/components_index.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";
import Style from "./Upload.module.css";
import images from "../img";
import axios from "axios";

const UploadNFT = () => {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const router = useRouter();

    const [form, setForm] = useState({
        title: '',
        price: '',
        description: '',
        image: null
    });

    const Button = ({ btnName, onClick, classStyle }) => (
        <button onClick={onClick} className={classStyle}>
            {btnName}
        </button>
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        if (e.target.name === 'image') {
            // Update the image file when a new one is selected
            setForm({
                ...form,
                [e.target.name]: e.target.files[0]
            });
        } else {
            // Update other form fields
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('price', form.price);
        formData.append('description', form.description);
        formData.append('image', form.image); // Append the image file to the formData

        try {
            const response = await axios.post('http://localhost:5000/product_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            setForm({ title: '', price: '', description: '', image: null });
        } catch (error) {
            console.error('Error upload product', error);
            const errorMessage = error.response ? error.response.data.message : 'Error upload product';
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className={Style.upload}>
            <DropZone
                title="JPG, PNG, Max 100MB"
                heading="Drag & drop file"
                subHeading="or Browse media on your device"
                // itemName={itemName}
                // description={description}
                // price={price}
                // image={images.upload}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
            />
            {/* <div className={Style.Form_box_input}>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
            </div> */}

            <div className={Style.upload_box}>
                <div className={Style.Form_box_input}>
                    <label htmlFor="title">Item Name:</label>
                    <input
                        type="text"
                        className={Style.Form_box_input_userName}
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>
                <div className={Style.Form_box_input}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id=""
                        cols="30"
                        rows="6"
                        placeholder="Something about your item in few words"
                        value={form.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className={Style.Form_box_input}>
                    <label htmlFor="price">Price(ETH):</label>
                    <input
                        type="text"
                        className={Style.Form_box_input_userName}
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                    />
                </div>
                <div className={Style.upload_box_btn}>
                <Button
                    btnName="Upload"
                    onClick={handleSubmit} 
                    classStyle={Style.upload_box_btn_style}
                />
                    {/* <button className={Style.Form_box_btn_upload}>Upload</button> */}
                </div>
            </div>
            {successMessage && (
                <div className={Style.success_message}>
                    <p>Create NFT successfully !!!!!!</p>
                </div>
            )}
        </div>
        </form>
    );
};

export default UploadNFT;