import { useEffect, useState } from "react"
import "./Institutes.css"

import { IoAddCircle } from "react-icons/io5";

import AddInstitute from "./Components/AddInstitute";

export default function Insititutes({
    allInstitutes,
    setAllInstitutes
}){
    const [institutes, setInstitutes] = useState([])
    const [addInstitute, setAddInstitute] = useState(false)

    useEffect(() => (
        setInstitutes(allInstitutes.map(institute => institute))
    ), [allInstitutes])

    console.log(institutes)

    const renderInstitutes = institutes.map((institute, index) => (
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