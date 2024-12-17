import { useEffect, useState } from "react";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import EditPoint from "./EditPoint";
import DeletePoint from "./DeletePoint";


export default function ProjectPoints({
    projectId,
    projectPoints,
    loggedUser,
    setPojectPoints
}){
    const [specificPoints, setSpecificPoints] = useState([])

    useEffect(() => (
        setSpecificPoints(projectPoints.filter(points => points.project_id === projectId))
    ), [projectPoints])

    console.log(specificPoints)

    const [pointId, setPointId] = useState()
    const [deletePoint, setDeletePoint] = useState(false)

    const handleDelete = (pointId) => {
        setDeletePoint(true)
        setPointId(pointId)
    }

    const renderPoints = specificPoints.map((point, index) => (
        loggedUser ?
            <div
                key={index}
            >
                <li
                    key={index}
                >
                    {point.point}
                </li>

                <div style={{gap: "20px", display: "flex"}}>
                    <CiEdit />

                    <MdDelete 
                        onClick={() => handleDelete(point.id)}
                    />
                </div>
            </div>
            :
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
            {deletePoint ?
                <DeletePoint 
                    pointId={pointId}
                    setPointId={setPointId}
                    setDeletePoint={setDeletePoint}
                    setProjectPoints={setPojectPoints}
                />
                :
                null
            }

            {renderPoints}
        </div>
    )
}