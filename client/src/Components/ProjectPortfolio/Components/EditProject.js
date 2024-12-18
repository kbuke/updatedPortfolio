
import "./EditProject.css"

export default function EditProject({
    projectImg,
    setProjectImg,
    projectName,
    setProjectName,
    projectGit,
    setProjectGit,
    projectBlog,
    setProjectBlog,
    projectStart,
    setProjectStart,
    projectEnd,
    setProjectEnd,
    setEditProject,
    projectId,
    projects,
    setProjects
}){
    console.log(`I am attempting to alter project ${projectId}: ${projectName}`)
    //Set up decorator for creating input
    const editProjectInput = (value, state, text, valueType) => {
        return(
            <input 
                placeholder={text}
                className="editProjectInput"
                value={value}
                onChange={(e) => state(e.target.value)}
                type={valueType}
            />
        )
    }

    const handleEdit = e => {
        e.preventDefault()
        fetch(`/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: projectImg,
                name: projectName,
                git_hub_link: projectGit,
                blog_link: projectBlog,
                start_date: projectStart,
                end_date: projectEnd
            })
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                return null 
            }
        })
        .then(editInfo => {
            if(editInfo){
                setProjects(projects.map(oldProjects => 
                    oldProjects.id === editInfo.id ? editInfo : oldProjects
                ))
            }
        })
        .then(setEditProject(false))
    }


    return(
        <div
            id="popUp"
        >
            <form
                id="editProjectForm"
                onSubmit={handleEdit}
            >
                <h2>Edit Project Info</h2>

                {editProjectInput(
                    projectImg, 
                    setProjectImg,
                    "Please enter Projects Image",
                    "text"
                )}

                {editProjectInput(
                    projectName,
                    setProjectName,
                    "Please enter Projects Name",
                    "text"
                )}

                {editProjectInput(
                    projectGit,
                    setProjectGit,
                    "Please enter link to git url",
                    "text"
                )}

                {editProjectInput(
                    projectBlog,
                    setProjectBlog,
                    "Please enter link to blog",
                    "text"
                )}

                {editProjectInput(
                    projectStart, 
                    setProjectStart,
                    "Please enter start date",
                    "date"
                )}

                {editProjectInput(
                    projectEnd,
                    setProjectEnd,
                    "Please enter end date",
                    "date"
                )}

                <div>
                    <button
                        type="submit"
                    >
                        Submit
                    </button>

                    <button
                        onClick={() => setEditProject(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}