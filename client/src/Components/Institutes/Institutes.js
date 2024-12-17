import { useEffect, useState } from "react"
import "./Institutes.css"

import { IoAddCircle } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";

import AddInstitute from "./Components/AddInstitute";
import DeleteInstitute from "./Components/DeleteInstitute";

export default function Insititutes({
    allInstitutes,
    setAllInstitutes
}){
    const [institutes, setInstitutes] = useState([])
    const [addInstitute, setAddInstitute] = useState(false)
    const [deleteInstitute, setDeleteInstitute] = useState(false)
    const [selectedInstituteId, setSelectedInstituteId] = useState()

    useEffect(() => (
        setInstitutes(allInstitutes.map(institute => institute))
    ), [allInstitutes])

    console.log(institutes)

    const handleDeleteInstitute = (instituteId) => {
        setDeleteInstitute(true)
        setSelectedInstituteId(instituteId)
    }

    const renderInstitutes = institutes.map((institute, index) => (
        <div
            style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}
        >
            <div
                key={index}
                className="instituteContainer"
            >
                <img 
                    src={institute.logo}
                    className="instituteLogo"
                />
                <p>{institute.name}</p>
            </div>

            <RiDeleteBin7Fill 
                className="deleteInstituteButton"
                onClick={() => handleDeleteInstitute(institute.id)}
            />
        </div>
    ))
    return(
        <div
            id="specificInstitutesContainer"
        >
            {addInstitute ?
                <AddInstitute 
                    allInstitutes={allInstitutes}
                    setAllInstitutes={setAllInstitutes}
                    setAddInstitute={setAddInstitute}
                />
                :
                null
            }

            {deleteInstitute ?
                <DeleteInstitute 
                    setDeleteInstitute={setDeleteInstitute}
                    selectedInstituteId={selectedInstituteId}
                    setAllInstitutes={setAllInstitutes}
                    setSelectedInstituteId={setSelectedInstituteId}
                />
                :
                null
            }

            <h1>Institutes</h1>

            <div
                id="instituteRole"
            >
                {renderInstitutes}

                <IoAddCircle 
                    className="addInstitute"
                    onClick={() => setAddInstitute(true)}
                />
            </div>
        </div>
    )
}