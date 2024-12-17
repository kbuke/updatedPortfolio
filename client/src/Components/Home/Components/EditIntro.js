
import { useState } from "react"

import "./EditIntro.css"

export default function EditIntro({
    setEditInfo,
    specificUserInfo,
    setSpecificUserInfo
}){
    console.log(specificUserInfo)
    const [userPic, setUserPic] = useState(specificUserInfo.image)
    const [userBio, setUserBio] = useState(specificUserInfo.profile_bio)

    const handlePatch = e => {
        e.preventDefault()

        const body = {
            profile_bio: userBio,
            image: userPic
        }

        fetch(`/profiles/${specificUserInfo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update info")
                return null
            }
        })
        .then(newUserInfo => {
            if(newUserInfo){
                setSpecificUserInfo(specificUserInfo.id === newUserInfo.id ? newUserInfo : specificUserInfo)
            }
        })
        setEditInfo(false)
    }

    return(
        <div
            id="popUp"
        >
            <form
                id="updateInfoContainer"
                onSubmit={handlePatch}
            >
                <div
                    id="editInfoContainer"
                >
                    <h1>Edit Your Information</h1>

                    <div
                        className="infoGrid"
                    >
                        <p>Change Picture:</p>

                        <input 
                            type="text"
                            value={userPic}
                            onChange={(e) => setUserPic(e.target.value)}
                            style={{width: "80%"}}
                        />
                    </div>

                    <div
                        className="infoGrid"
                    >
                        <p>Change Your Bio</p>

                        <textarea
                            onChange={(e) => setUserBio(e.target.value)}
                            value={userBio}
                            type="text"
                            className="editInfoText"
                        />
                    </div>

                    <div
                        id="editInfoButtonContainer"
                    >
                        <button
                            className="editInfoButtons"
                            type="submit"
                            style={{backgroundColor: "green"}}
                        >
                            Confirm Changes
                        </button>

                        <button
                            className="editInfoButtons"
                            onClick={() => setEditInfo(false)}
                            style={{backgroundColor: "red"}}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}