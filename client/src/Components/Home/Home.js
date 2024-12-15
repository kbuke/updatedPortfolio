
import { useOutletContext } from "react-router-dom"
import "./Home.css"
import { useEffect, useState } from "react"

import TechStack from "../TechStack/TechStack"
import ProjectPortfolio from "../ProjectPortfolio/ProjectPortfolio"

export default function Home(){
    const appData = useOutletContext()
    console.log(appData)

    const userDetails = appData.userProfile[0]

    const [profileDetails, setProfileDetails] = useState([])

    useEffect(() => (
        setProfileDetails(userDetails)
    ), [userDetails])

    console.log(profileDetails)

    return(
        <div
            id="infoContainer"
        >
            <div
                id="userIntroContainer"
            >
                <div
                    id="userInfoBox"
                >
                    <h1
                        className="profileName"
                    >
                        {profileDetails?.first_name}
                    </h1>

                    <h1
                        className="profileSurname"  
                    >
                        {profileDetails?.last_name}
                    </h1>

                    <h3>Software Engineer</h3>

                    <p>
                        {profileDetails?.profile_bio}
                    </p>

                    <div
                        id="emailOptionContainer"
                    >
                        <div
                            className="outerContact"
                        >
                            <div
                                className="innerContact"
                            >
                                <h2
                                    style={{color: "white"}}
                                >
                                    Let's Talk
                                </h2>
                        </div>
                    </div>
                    </div>
                </div>

                <img 
                    alt="profilePicture"
                    src={profileDetails?.image}
                    id="kaanPicture"
                />

                <div 
                    id="strip"
                />
            </div>

            <TechStack 
                appData={appData}
            />

            <ProjectPortfolio />
        </div>
    )
}