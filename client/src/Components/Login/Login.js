import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

export default function Login() {
    const appData = useOutletContext();
    const setLoggedUser = appData.setLoggedUser;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLogInError] = useState(false);
    const [redirect, setRedirect] = useState(false); // Add a state for redirect

    const handleLogin = (e) => {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    setLogInError(true);
                }
            })
            .then((user) => {
                if (user) {
                    setLoggedUser(user);
                    setRedirect(true); // Set redirect to true after login
                }
            });
    };

    if (redirect) {
        return <Navigate to="/" />; // Conditionally render the Navigate component
    }

    return (
        <form
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
            onSubmit={(e) => handleLogin(e)}
        >
            <h1>Login below</h1>

            <div
                style={{
                    display: "flex",
                    border: "solid",
                    borderRadius: "24px",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <input
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        marginTop: "10px",
                    }}
                />

                <input
                    placeholder="Enter password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {loginError ? (
                    <p style={{ color: "red" }}>Error Logging In</p>
                ) : null}

                <button
                    type="submit"
                    style={{
                        marginBottom: "10px",
                    }}
                >
                    Login
                </button>
            </div>
        </form>
    );
}
