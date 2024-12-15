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
                display: "flex",
                flexDirection: "row"
            }}
        >
            <p>{stackNames}</p>
        </div>
    );
}
