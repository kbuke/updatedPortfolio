


export default function DeletePoint({
    pointId,
    setPointId,
    setDeletePoint,
    setProjectPoints
}){
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/points/${pointId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setProjectPoints(points => points.filter(point => point.id !== pointId))
                }
            })
            .then(setPointId())
            .then(setDeletePoint(false))
    }

    return(
        <div
            id="popUp"
        >
            <form
                style={{color: "black", backgroundColor: "white", display: "flex", flexDirection: "column", borderRadius: "8px", width: "800px", textAlign: "center"}}
                onSubmit={handleDelete}
            >
                <h2>Delete Point?</h2>

                <div
                    style={{display: "grid", gridTemplateColumns: "40% 40%", gap: "40px", justifyContent: "center", alignItems: "center", marginBottom: "20px"}}
                >
                    <button
                        type="submit"
                    >
                        Delete Point
                    </button>

                    <button
                        onClick={() => setDeletePoint(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}