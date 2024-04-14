import React from "react"

import Style from "./Title.module.css";

const Title = ({heading, paragragh}) => {
    return (
        <div className = {Style.title}>
            <div className = {Style.title_box}>
                <h2>{heading}</h2>
                <p>{paragragh}</p>
            </div>
        </div>
    );
};

export default Title
