
import { useState } from "react"

export default function AddProjectStack({
    projectId,
    techStack,
    setProjectStack,
    projectStack,
    setNewStack
}){
    console.log(projectStack)
    const [stackId, setStackId] = useState()
    console.log(techStack)

    console.log(`I want to submit project: ${projectId} using ${stackId}`)
    console.log(setProjectStack)

    const handleNewStack = e => {
        e.preventDefault()
        const jsonData = {
            projectId,
            stackId
        }
        fetch("/projecttech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newTech => {
                setProjectStack([...projectStack, newTech])
            })
            .then(setNewStack(false))
    }

    return(
        <div
            id="popUp"
        >
            <form
                id="projectStackContainer"
                onSubmit={handleNewStack}
            >
                <h2
                    className="popUpTitle"
                >
                    Add New Tech to Project
                </h2>

                <select
                    onChange={(e) => setStackId(e.target.value)}
                    className="newProjectInput"
                >
                    {techStack.map((stack, index) => (
                        <option
                            key={index}
                            value={stack.id}
                        >
                            {stack.name}
                        </option>
                    ))}
                </select>

                <div>
                    <button
                        type="submit"
                    >
                        Submit
                    </button>

                    <button
                        onClick={() => setNewStack(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}