import "./TechImg.css"

export default function TechImg({
    renderedStack
}){
    const renderStackImg = renderedStack.map((tech, index) => (
        <div
            id="techStackImgContainer"
            key={index}
        >
            <img 
                src={tech.logo}
                id="techStackImg"
                alt={`${tech.name}Logo`}
            />

            <h3>
                {tech.experience < 12 ? 
                    `${tech.experience} Months`
                    : 
                    `${tech.experience / 12} Years`
                }
            </h3>
        </div>
    ))
    return(
        <div
            id="techStackGrid"
        >
            {renderStackImg}
        </div>
    )
}