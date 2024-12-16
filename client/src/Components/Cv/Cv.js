import { useState } from "react";
import cv from "../../assets/kaanbukecv.png"

import "./Cv.css"

import { ImCross } from "react-icons/im";

export default function CV({
    setViewCv
}){
    console.log("hi there")
    const [hover, setHover] = useState(false)
    return(
        <div
            style={{
                backgroundImage: `url(${cv})`
            }}
            id="cvPopUp"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hover ?
                <ImCross 
                    id="cvExit"
                    onClick={() => setViewCv(false)}
                />
                :
                null
            }
        </div>
    )
}