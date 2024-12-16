import { useEffect, useState } from "react";

export default function ProjectStack({ projectStack, projectId }) {
    const [filterStack, setFilterStack] = useState([]);

    useEffect(() => {
        setFilterStack(projectStack.filter(stack => stack.project_id === projectId));
    }, [projectStack, projectId]);

    const stackNames = filterStack.map(stack => stack.languages.name).join(" | ");

    return (
        <div
            style={{
                width: "100%",
                border: "solid",
                borderRadius: "20px",
                textAlign: "center",
                backgroundColor: "black",
                color: "white",
                height: "35px",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
            }}
        >
            <p>
                {stackNames}
            </p>
        </div>
    );
}
