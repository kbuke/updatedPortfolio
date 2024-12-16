import { useState } from "react"

import "./NewProjectPoint.css"

export default function NewProjectPoint({
    projectId,
    setAddPoint,
    projectPoints,
    setProjectPoints
}){
    const [newProjectPoint, setNewProjectPoint] = useState("")

    const handleNewPoint = e => {
        e.preventDefault()
        const jsonData = {
            projectId,
            newProjectPoint
        }
        fetch("/points", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newPoint => {
            setProjectPoints([...projectPoints, newPoint])
            setAddPoint(false)
        })
    }

    return(
        <div
            id="popUp"
        >
            <form
                id="newPointContainer"
                onSubmit={handleNewPoint}
            >
                <h2
                    className="popUpTitle"
                >
                    Enter New Point
                </h2>

                <input 
                    placeholder="Enter new point"
                    onChange={(e) => setNewProjectPoint(e.target.value)}
                    type="text"
                    style={{marginBottom: "10px", width: "80%"}}
                />

                <div
                    style={{gap: "20px", display: "grid"}}
                >
                    <button
                        type="submit"
                    >
                        Submit New Point
                    </button>

                    <button
                        onClick={() => setAddPoint(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}