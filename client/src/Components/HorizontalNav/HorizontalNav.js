import { useState } from "react";
import "./HorizontalNav.css"

import { PiReadCvLogo } from "react-icons/pi";

export default function HorizontalNav({
    setViewCv
}){
    

    return(
        <div
            id="horizontalNav"
        >
            <div
                id="cvContainer"
                onClick={() => setViewCv(true)}
            >
                <PiReadCvLogo />
                <p>Resumé</p>
            </div>
        </div>
    )
}