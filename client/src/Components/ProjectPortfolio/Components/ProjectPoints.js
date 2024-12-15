import { useEffect, useState } from "react";


export default function ProjectPoints({
    projectId,
    projectName,
    gitLink,
    blogLink,
    projectPoints
}){
    const [specificPoints, setSpecificPoints] = useState([])

    useEffect(() => (
        setSpecificPoints(projectPoints.filter(points => points.project_id === projectId))
    ), [])

    console.log(specificPoints)

    const renderPoints = specificPoints.map((point, index) => (
        <li
            key={index}
        >
            {point.point}
        </li>
    ))

    return(
        <div
            style={{display: "flex", flexDirection: "column"}}
        >
            {renderPoints}
        </div>
    )
}