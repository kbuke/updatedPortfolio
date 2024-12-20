
import "./EditProject.css";
import { useState } from "react";

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
}) {
    const [isCurrentProject, setIsCurrentProject] = useState(false);

    console.log(`I am attempting to alter project ${projectId}: ${projectName}`);

    // Set up decorator for creating input
    const editProjectInput = (value, state, text, valueType, isDisabled = false) => {
        return (
            <input 
                placeholder={text}
                className="editProjectInput"
                value={value}
                onChange={(e) => state(e.target.value)}
                type={valueType}
                disabled={isDisabled}
            />
        );
    };

    const handleEdit = (e) => {
        e.preventDefault();
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
                end_date: isCurrentProject ? "present" : projectEnd // Send "present" if currently working
            })
        })
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                return null;
            }
        })
        .then((editInfo) => {
            if (editInfo) {
                setProjects(projects.map((oldProject) => 
                    oldProject.id === editInfo.id ? editInfo : oldProject
                ));
            }
        })
        .then(() => setEditProject(false));
    };

    return (
        <div id="popUp">
            <form id="editProjectForm" onSubmit={handleEdit}>
                <h2>Edit Project Info</h2>

                {editProjectInput(
                    projectImg, 
                    setProjectImg,
                    "Please enter Project's Image",
                    "text"
                )}

                {editProjectInput(
                    projectName,
                    setProjectName,
                    "Please enter Project's Name",
                    "text"
                )}

                {editProjectInput(
                    projectGit,
                    setProjectGit,
                    "Please enter link to GitHub URL",
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

                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={isCurrentProject} 
                            onChange={(e) => {
                                setIsCurrentProject(e.target.checked);
                                if (e.target.checked) setProjectEnd(""); // Clear end date if "currently working" is checked
                            }}
                        />
                        I am currently working on this project
                    </label>
                </div>

                {editProjectInput(
                    projectEnd,
                    setProjectEnd,
                    "Please enter end date",
                    "date",
                    isCurrentProject // Disable if "currently working" is checked
                )}

                <div>
                    <button type="submit">
                        Submit
                    </button>

                    <button type="button" onClick={() => setEditProject(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
