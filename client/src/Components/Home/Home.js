
import { useOutletContext } from "react-router-dom"
import "./Home.css"
import { useEffect, useState } from "react"

import TechStack from "../TechStack/TechStack"
import ProjectPortfolio from "../ProjectPortfolio/ProjectPortfolio"
import Email from "../Email/Email"
import CV from "../Cv/Cv"

export default function Home(){
    const appData = useOutletContext()
    console.log(appData)

    const userDetails = appData.userProfile[0]

    const viewCv = appData.viewCv
    const setViewCv = appData.setViewCv

    const techStack = appData.techStack
    const setTechStack = appData.setTechStack

    const [profileDetails, setProfileDetails] = useState([])

    useEffect(() => (
        setProfileDetails(userDetails)
    ), [userDetails])

    console.log(profileDetails)

    return(
        <div
            id="infoContainer"
        >
            {viewCv ?
                <CV 
                setViewCv={setViewCv}
                />
                :
                null
            }

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
            </div>

            <div 
                id="strip"
            />

            <TechStack 
                appData={appData}
                techStack={techStack}
                setTechStack={setTechStack}
            />

            <ProjectPortfolio 
                appData={appData}
            />

            <Email 
                appData={appData}
            />
        </div>
    )
}