import "./TechText.css";

export default function TechText({ renderedStack }) {

    const availableTech = renderedStack.map((tech, index) => {
        const techName = tech.name;
        const techLength =
            tech.experience < 12
                ? `${tech.experience} Months`
                : `${tech.experience / 12} Years`;
        return (
            <li key={index}>
                <span className="techName">{techName}</span> - {techLength}
            </li>
        );
    });

    return (
        <div id="techStackGrid">
            {availableTech}
        </div>
    );
}
