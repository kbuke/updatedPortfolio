import { IoMdGrid } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

import "./TechStack.css"
import { useEffect, useState } from "react";

import TechText from "./Components/TechText";
import TechImg from "./Components/TechImg";

export default function TechStack({
    appData
}){
    const [viewStack, setViewStack] = useState("Grid")

    const [renderedStack, setRenderedStack] = useState([])

    const techStack = appData.techStack
    const setTechStack = appData.setTechStack

    useEffect(() => (
        setRenderedStack(techStack.sort((a, b) => b.experience - a.experience))
    ), [techStack])

    console.log(renderedStack)

    return(
        <div
            style={{borderBottom: "solid"}}
        >
            <div
                id="techTitleGrid"
            >
                <h1>Tech Stack</h1>

                <>
                    <IoMdGrid 
                        className="techOptions"
                        id={viewStack==="Grid" ? "chosenTechView" : ""}
                        onClick={() => setViewStack("Grid")}
                    />

                    <CiImageOn 
                        className="techOptions"
                        id={viewStack==="Img" ? "chosenTechView" : ""}
                        onClick={() => setViewStack("Img")}
                    />
                </>
            </div>

            {viewStack === "Grid" ?
                <TechText 
                    renderedStack={renderedStack}
                />
                :
                <TechImg 
                    renderedStack={renderedStack}
                />
            }
        </div>
    )
}