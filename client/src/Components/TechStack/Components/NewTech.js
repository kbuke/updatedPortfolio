
import "./NewTech.css"

import { useState } from "react"

export default function NewTech({
    techStack,
    setTechStack,
    setAddTech
}){

    const [stackName, setStackName] = useState("")
    const [stackLogo, setStackLogo] = useState("")
    const [stackExperience, setStackExperience] = useState("")

    const handleNewStack = e => {
        e.preventDefault()
        const jsonData = {
            stackName,
            stackLogo,
            stackExperience: parseInt(stackExperience, 10)
        }
        fetch("/technologies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newStack => {
                setTechStack([...techStack, newStack])
            })
            .then(setAddTech(false))
    }
    return(
        <div
            id="popUp"
        >
            <form
                id="newTechContainer"
                onSubmit={(e) => handleNewStack(e)}
            >
                <h2>Add New Tech Stack</h2>

                <input 
                    className="stackInput"
                    onChange={(e) => setStackName(e.target.value)}
                    placeholder="Enter Stack Name"
                />

                <input 
                    className="stackInput"
                    onChange={(e) => setStackLogo(e.target.value)}
                    placeholder="Enter Stack Logo"
                />

                <input 
                    className="stackInput"
                    onChange={(e) => setStackExperience(e.target.value)}
                    placeholder="Enter Stack Experience"
                />

                <div
                    id="stackButtonGrid"
                >
                    <button
                        className="addStackButton"
                        type="submit"
                    >
                        Create New Stack
                    </button>

                    <button
                        onClick={() => setAddTech(false)}
                        className="addStackButton"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}