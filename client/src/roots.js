import App from "./App";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]
export default routes