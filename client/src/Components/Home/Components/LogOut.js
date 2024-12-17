import "./LogOut.css"

export default function LogOut({
    setLoggedUser,
    setLogOut
}){
    const handleLogOut = e => {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok) {
                setLoggedUser(null)
            }
        })
    }
    return(
        <div
            id="popUp"
        >
            <form
                id="logOutButtonContainer"
                onSubmit={handleLogOut}
            >
                <h3>Confirm Log-Out</h3>

                <div
                    id="logOutButtonGrid"
                >
                    <button
                        type="submit"
                        className="logOutButton"
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => setLogOut(false)}
                        className="logOutButton"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}