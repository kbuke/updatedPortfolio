import "./VerticalNav.css"

//Import GitHub, Linkdn Insta Icons
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function VerticalNav({ 
    userProfile,
    loggedUser
}) {
    console.log(userProfile);

    const userInfo = userProfile ? userProfile[0] : null;

    const userLinkden = userInfo?.linkdn_link;
    const userInsta = userInfo?.insta_link;
    const userGit = userInfo?.git_hub_link;

    return (
        <div id="verticalNavBar">
            <a href={userGit} className="socialLinks">
                <FaGithub className="socialImg" />
            </a>

            <a href={userLinkden} className="socialLinks">
                <FaLinkedin className="socialImg" />
            </a>

            <a href={userInsta} className="socialLinks">
                <FaInstagram className="socialImg" />
            </a>

            {loggedUser ?
                <RiLogoutBoxLine />
                :
                null
            }
        </div>
    );
}
