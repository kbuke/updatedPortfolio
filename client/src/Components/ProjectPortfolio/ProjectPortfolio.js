import "./ProjectPortfolio.css"

import laptop from "../../assets/laptop.png"
import { useEffect, useState } from "react"

import ProjectStack from "./Components/ProjectStack"
import ProjectPoints from "./Components/ProjectPoints"
import AddProject from "./Components/AddProject"
import NewProjectPoint from "./Components/NewProjectPoint"
import AddProjectStack from "./Components/AddProjectStack"

import { FaGithub } from "react-icons/fa";
import { AiFillMediumCircle } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

import { Link } from "react-router-dom"
import { FaP } from "react-icons/fa6"

export default function ProjectPortfolio({
    appData
}){
    const loggedUser = appData.loggedUser

    const projectPortfolio = appData.projectPortfolio
    const setProjectPortfolio = appData.setProjectPortfolio

    console.log(projectPortfolio)

    const [sortProjects, setSortProjects] = useState([])

    const projectStack = appData.projectStack
    const setProjectStack = appData.setProjectStack

    const projectPoints = appData.projectPoints
    const setPojectPoints = appData.setProjectPoints

    const allInstitutes = appData.allInstitutes
    const setAllInstitutes = appData.setAllInstitutes

    const techStack = appData.techStack
    const setTechStack = appData.setTechStack

    const [newProject, setNewProject] = useState(false)

    const [addPoint, setAddPoint] = useState(false)
    const [addTech, setAddTech] = useState(false)
    const [projectId, setProjectId] = useState()

    console.log(sortProjects)

    const addProjectPoints = (projectId) => {
        setAddPoint(true)
        setProjectId(projectId)
    }

    const addProjectStack = (projectId) => {
        setAddTech(true)
        setProjectId(projectId)
    }

    useEffect(() => (
        setSortProjects(projectPortfolio.sort((a, b) => new Date(b.start_date) - new Date(a. start_date)))
    ), [projectPortfolio])

    const renderProjects = sortProjects.map((project, index) => {
        const projectId = project.id;
        const projectName = project.name;
        const projectImg = project.image;
        const gitLink = project.git_hub_link;
        const blogLink = project.blog_link;
        const webLink = project.web_link;
        const projectInstitute = project?.institutes?.logo
        console.log(project)
    
        const isLastProject = index === sortProjects.length - 1;

        const addPoints = 
            <div
                className="portfolioOptionsButtons"
                style={{
                    backgroundColor: "rgb(37, 92, 194);"
                }}
            >
                <p>Add Points</p>
                <FaPlus 
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => addProjectPoints(projectId)}
                />
            </div>
        
        const addTech = 
                    <div
                        className="portfolioOptionsButtons"
                        style={{backgroundColor: "rgb(4, 148, 76)", marginTop: "10PX"}}
                    >
                        <p>Add Stack</p>
                        <FaPlus 
                            style={{cursor: "pointer"}}
                            onClick={() => addProjectStack(projectId)}
                        />
                    </div>
    
        return (
            <div
                key={index} // Use the index as a unique key
                style={{
                    marginLeft: "20px"
                }}
            >
                {index % 2 === 0 ? ( // Alternate layout based on index
                    <div
                        id="projectGrid"
                        className={!isLastProject ? "dashedBorder" : ""} // Apply class conditionally
                    >
                        <div className="projectContainer">
                            <img src={laptop} className="laptopPng" />
                            <img src={projectImg} className="projectImg" />
                            <ProjectStack projectId={projectId} projectStack={projectStack} />
                        </div>
                        <div>
                            <h2>{projectName}</h2>
                            <ProjectPoints
                                projectId={projectId}
                                projectName={projectName}
                                gitLink={gitLink}
                                blogLink={blogLink}
                                projectPoints={projectPoints}
                                loggedUser={loggedUser}
                                setPojectPoints={setPojectPoints}
                            />
                            <div id="projectLinkContainer">
                                {gitLink && (
                                    <Link to={gitLink} className="projectLinks">
                                        <FaGithub className="projectIcon" />
                                    </Link>
                                )}
                                {blogLink && (
                                    <Link to={blogLink} className="projectLinks">
                                        <AiFillMediumCircle className="projectIcon" />
                                    </Link>
                                )}
                                {webLink && (
                                    <Link to={webLink} className="projectLinks">
                                        <TbWorldWww  className="projectIcon"/>
                                    </Link>
                                )}
                            </div>
                            
                            {projectInstitute ?
                                <div
                                    className="projectInstituteContainer"
                                >
                                    <img 
                                        src={projectInstitute}
                                        className="projectInstituteImg"
                                    />
                                </div>
                                :
                                null
                            }

                            {loggedUser ?
                                addPoints
                                :
                                null
                            }

                            {loggedUser ?
                                addTech
                                :
                                null
                            }
                        </div>
                    </div>
                ) : (
                    <div
                        id="projectGrid"
                        className={!isLastProject ? "dashedBorder" : ""} // Apply class conditionally
                    >
                        <div>
                            <h2>{projectName}</h2>
                            <ProjectPoints
                                projectId={projectId}
                                gitLink={gitLink}
                                blogLink={blogLink}
                                projectPoints={projectPoints}
                                loggedUser={loggedUser}
                            />
                            <div id="projectLinkContainer">
                                {gitLink && (
                                    <Link to={gitLink} className="projectLinks">
                                        <FaGithub className="projectIcon" />
                                    </Link>
                                )}
                                {blogLink && (
                                    <Link to={blogLink} className="projectLinks">
                                        <AiFillMediumCircle className="projectIcon" />
                                    </Link>
                                )}
                                {webLink && (
                                    <Link to={webLink} className="projectLinks">
                                        <TbWorldWww  className="projectIcon"/>
                                    </Link>
                                )}
                            </div>
                            
                            {projectInstitute ?
                                <div
                                    className="projectInstituteContainer"
                                >
                                    <img 
                                        src={projectInstitute}
                                        className="projectInstituteImg"
                                    />
                                </div>
                                :
                                null
                            }

                            {loggedUser ?
                                addPoints
                                :
                                null
                            }

                            {loggedUser ?
                                addTech
                                :
                                null
                            }
                        </div>
                        <div className="projectContainer">
                            <img src={laptop} className="laptopPng" />
                            <img src={projectImg} className="projectImg" />
                            <ProjectStack projectId={projectId} projectStack={projectStack} />
                        </div>
                    </div>
                )}
            </div>
        );
    });    
           

    return(
        <div>
            {addPoint?
                <NewProjectPoint 
                    projectId={projectId}
                    setAddPoint={setAddPoint}
                    projectPoints={projectPoints}
                    setProjectPoints={setPojectPoints}
                />
                :
                null
            }

            {addTech ?
                <AddProjectStack 
                    projectId={projectId}
                    techStack={techStack}
                    setProjectStack={setProjectStack}
                    projectStack={projectStack}
                    setNewStack = {setAddTech}
                />
                :
                null
            }
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "40px",
                    cursor: "pointer"
                }}
            >
                {newProject ?
                    <AddProject 
                        setNewProject={setNewProject}
                        projectPortfolio={projectPortfolio}
                        setProjectPortfolio={setProjectPortfolio}
                        allInstitutes={allInstitutes}
                        setAllInstitutes={setAllInstitutes}
                    />
                    :
                    null
                }

                <h1>Project Portfolio</h1>
                {loggedUser ?
                    <FaPlus 
                        onClick={() => setNewProject(true)}
                    />
                    :
                    null
                }
            </div>
            <div
                id="projectPortfolioContainer"
            >
                {renderProjects}
            </div>
        </div>
    )
}