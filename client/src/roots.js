import App from "./App";
import Home from "./Components/Home/Home";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
]
export default routes