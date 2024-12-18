import { useState } from "react"

import "./AddInstitute.css"

export default function AddInstitute({
    allInstitutes,
    setAllInstitutes,
    setAddInstitute
}){
    const [instituteLogo, setInstituteLogo] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [instituteLocation, setInstituteLocation] = useState("")

    const handleNewInstitute = (e) => {
        e.preventDefault()
        const jsonData = {
            instituteLogo,
            instituteName,
            instituteLocation
        }
        fetch("/institutes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newInstitute => {
                setAllInstitutes([...allInstitutes, newInstitute])
            })
            .then(setAddInstitute(false))
    }
    return(
        <div
            id="popUp"
        >
            <form
                id="instituteContainer"
                onSubmit={handleNewInstitute}
            >
                <h2
                    style={{color: "black", textDecoration: "underline"}}
                >
                    Add New Institute
                </h2>

                <input
                    placeholder="Enter Institutes Name"
                    className="instituteInput"
                    onChange={(e) => setInstituteName(e.target.value)}
                />

                <input 
                    placeholder="Enter Institutes Logo"
                    className="instituteInput"
                    onChange={(e) => setInstituteLogo(e.target.value)}
                />

                <input 
                    placeholder="Enter Institutes Location"
                    className="instituteInput"
                    onChange={(e) => setInstituteLocation(e.target.value)}
                />

                <div
                    id="newInstituteButtonGrid"
                >
                    <button
                        className="newInstituteButton"
                        type="submit"
                    >
                        Submit New Institute
                    </button>

                    <button
                        className="newInstituteButton"
                        onClick={() => setAddInstitute(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}