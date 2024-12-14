import "./VerticalNav.css"

//Import GitHub, Linkdn Insta Icons
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function VerticalNav(){
    return(
        <div
            id="verticalNavBar"
        >
            <FaGithub 
                className="socialImg"
            />

            <FaLinkedin 
                className="socialImg"
            />

            <FaInstagram 
                className="socialImg"
            />
        </div>
    )
}