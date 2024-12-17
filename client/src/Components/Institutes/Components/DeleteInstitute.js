
import "./DeleteInstitute.css";

export default function DeleteInstitute({
    setDeleteInstitute,
    selectedInstituteId,
    setAllInstitutes,
    setSelectedInstituteId,
}) {
    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`/institutes/${selectedInstituteId}`, {
            method: "DELETE",
        })
            .then((r) => {
                if (r.ok) {
                    // Remove deleted institute from state
                    setAllInstitutes((institutes) =>
                        institutes.filter((institute) => institute.id !== selectedInstituteId)
                    );
                }
            })
            .then(() => {
                setSelectedInstituteId(null); // Reset selected ID
                setDeleteInstitute(false); // Close popup
            })
            .catch((error) => console.error("Error deleting institute:", error)); // Handle errors
    };

    return (
        <div id="popUp">
            <form id="deleteInstituteContainer" onSubmit={(e) => handleDelete(e)}>
                <h2>Do you wish to delete this institute?</h2>

                <div id="deleteInstituteButtonContainer">
                    <button
                        style={{ backgroundColor: "green" }}
                        className="instituteButton"
                        type="submit"
                    >
                        Delete
                    </button>

                    <button
                        className="instituteButton"
                        style={{ backgroundColor: "red" }}
                        onClick={() => setDeleteInstitute(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
