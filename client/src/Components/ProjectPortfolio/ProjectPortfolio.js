import "./ProjectPortfolio.css"

import laptop from "../../assets/laptop.png"
import { useEffect, useState } from "react"

import ProjectStack from "./Components/ProjectStack"
import ProjectPoints from "./Components/ProjectPoints"

import { FaGithub } from "react-icons/fa";
import { AiFillMediumCircle } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import { Link } from "react-router-dom"

export default function ProjectPortfolio({
    appData
}){
    const projectPortfolio = appData.projectPortfolio
    const [sortProjects, setSortProjects] = useState([])

    const projectStack = appData.projectStack
    const setProjectStack = appData.setProjectStack

    const projectPoints = appData.projectPoints
    const setPojectPoints = appData.setProjectPoints

    useEffect(() => (
        setSortProjects(projectPortfolio.sort((a, b) => new Date(b.start_date) - new Date(a. start_date)))
    ), [projectPortfolio])

    const renderProjects = sortProjects.map((project, index) => {
        const projectId = project.id 
        const projectName = project.name 
        const projectImg = project.image 
        const gitLink = project.git_hub_link 
        const blogLink = project.blog_link

        return (
            <div>
                {projectId % 2 === 1 ? (
                    <div
                        id="projectGrid"
                    >
                        <div className="projectContainer">
                            <img 
                                src={laptop} 
                                className="laptopPng" 
                            />
                            <img 
                                src={projectImg} 
                                className="projectImg" 
                            />
                            <ProjectStack 
                                projectId={projectId} 
                                projectStack={projectStack}
                            />
                        </div>

                        <div>
                            <h2>{projectName}</h2>

                            <ProjectPoints 
                                projectId={projectId}
                                projectName={projectName}
                                gitLink={gitLink}
                                blogLink={blogLink}
                                projectPoints={projectPoints}
                            />

                            <div
                                id="projectLinkContainer"
                            >
                                {gitLink ? 
                                    <Link
                                        to={gitLink}
                                        className="projectLinks"
                                    >
                                        <FaGithub 
                                            className="projectIcon"
                                        />
                                    </Link>
                                    :
                                    null
                                }

                                {blogLink ?
                                    <Link
                                        to={blogLink}
                                        className="projectLinks"
                                    >
                                        <AiFillMediumCircle 
                                            className="projectIcon"
                                        />
                                    </Link>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                ) : 
                    <div
                        id="projectGrid"
                    >
                        <div>
                            <h2>{projectName}</h2>

                            <ProjectPoints 
                                projectId={projectId}
                                gitLink={gitLink}
                                blogLink={blogLink}
                                projectPoints={projectPoints}
                            />

                            <div
                                id="projectLinkContainer"
                            >
                                {gitLink ?
                                    <Link
                                        to={gitLink}
                                        className="projectLinks"
                                    >
                                        <FaGithub 
                                            className="projectIcon"
                                        />
                                    </Link>
                                    :
                                    null
                                }

                                {blogLink ?
                                    <Link
                                        to={blogLink}
                                        className="projectLinks"
                                    >
                                        <AiFillMediumCircle 
                                            className="projectIcon"
                                        />
                                    </Link>
                                    :
                                    null
                                }
                            </div>
                        </div>

                        <div className="projectContainer">
                            <img 
                                src={laptop} 
                                className="laptopPng" 
                            />
                            <img 
                                src={projectImg} 
                                className="projectImg" 
                            />
                            <ProjectStack 
                                projectId={projectId} 
                                projectStack={projectStack}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    })        

    return(
        <div>
            <h1>Project Portfolio</h1>
            <div
                id="projectPortfolioContainer"
            >
                {renderProjects}
            </div>
        </div>
    )
}