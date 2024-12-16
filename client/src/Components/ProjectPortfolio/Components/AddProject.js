import "./AddProject.css"

import { useState, useEffect } from "react"

export default function AddProject({
    setNewProject,
    projectPortfolio,
    setProjectPortfolio,
    allInstitutes,
    setAllInstitutes
}){

    const[newImg, setNewImg] = useState("")
    const[newName, setNewName] = useState("")
    const[gitLink, setGitLink] = useState("")
    const[webLink, setWebLink] = useState("")
    const[blogLink, setBlogLink] = useState("")
    const[startDate, setStartDate] = useState("")
    const[endDate, setEndDate] = useState("")
    const[instituteId, setInstituteId] = useState("")

    const[availableInstitutes, setAvailableInstitutes] = useState([])

    console.log(`i have chosen institute ${instituteId}`)

    useEffect(() => {
        setAvailableInstitutes(allInstitutes)
    }, [allInstitutes])

    const handleNewProject = e => {
        e.preventDefault()
        const jsonData = {
            newImg,
            newName,
            gitLink,
            blogLink,
            startDate,
            endDate,
            instituteId,
            webLink
        }
        fetch("/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newProject => {
                setProjectPortfolio([...projectPortfolio, newProject])
            })
            .then(setNewProject(false))
    }

    return(
        <div
            id="popUp"
        >
            <form
                id="newProjectContainer"
                onSubmit={handleNewProject}
            >
                <h2
                    className="popUpTitle"
                >
                    Add New Project
                </h2>

                <input 
                    placeholder="Enter the name of your project"
                    className="newProjectInput"
                    onChange={(e) => setNewName(e.target.value)}
                />

                <input 
                    placeholder="Enter an image for your project"
                    className="newProjectInput"
                    onChange={(e) => setNewImg(e.target.value)}
                />

                <input 
                    placeholder="Enter link of git-hub repo"
                    className="newProjectInput"
                    onChange={(e) => setGitLink(e.target.value)}
                />

                <input 
                    placeholder="Enter link of your blog"
                    className="newProjectInput"
                    onChange={(e) => setBlogLink(e.target.value)}
                />

                <input 
                    placeholder="Enter link of website"
                    className="newProjectInput"
                    onChange={(e) => setWebLink(e.target.value)}
                />

                <input 
                    placeholder="Enter start date"
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="newProjectInput"
                />

                <input 
                    placeholder="Enter end date"
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    className="newProjectInput"
                />

                <select
                    className="newProjectInput"
                    onChange={(e) => setInstituteId(e.target.value)}
                >
                    {availableInstitutes.map((institute) => (
                        <option
                            key={institute.id}
                            value={institute.id}
                        >
                            {institute.name}
                        </option>
                    ))}
                </select>


                <div
                    style={{marginBottom: "20px", alignItems: "center"}}
                >
                    <button
                        type="submit"
                    >
                        Create New Project
                    </button>

                    <button
                        onClick={() => setNewProject(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}