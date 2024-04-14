import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// Internal import 
import Style from "./DropZone.module.css";
import images from "../../img"; // Assuming this imports the images from the img folder

const DropZone = ({ title, heading, subHeading, itemName, description, price, image }) => {
    const [fileUrl, setFileUrl] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            setFileUrl(reader.result);
        };

        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });

    return (
        <div className={Style.DropZone}>
            <div className={Style.DropZone_box} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.DropZone_box_input}>
                    <p>{title}</p>
                    <div className={Style.DropZone_box_input_img}>
                        <Image src={image} alt="upload" width={100} height={100} className={Style.DropZone_box_input_img_img} />
                    </div>
                    <p>{heading}</p>
                    <p>{subHeading}</p>
                </div>
            </div>

            {fileUrl && (
                <aside className={Style.DropZone_box_aside}>
                    <div className={Style.DropZone_box_aside_box}>
                        <img src={fileUrl} alt="uploaded image" width={200} height={200} />
                        <div className={Style.DropZone_box_aside_box_preview}>
                            <div className={Style.DropZone_box_aside_box_preview_one}>
                                <p>
                                    <span>NFT name: </span>
                                    {itemName || ""}
                                </p>
                            </div>

                            <div className={Style.DropZone_box_aside_box_preview_two}>
                                <p>
                                    <span>Description: </span>
                                    {description || ""}
                                </p>
                            </div>

                            <div className={Style.DropZone_box_aside_box_preview_three}>
                                <p>
                                    <span>Price: </span>
                                    {price || ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </div>
    );
};

export default DropZone;
