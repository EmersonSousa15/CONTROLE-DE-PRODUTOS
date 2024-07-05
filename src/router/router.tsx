import { Outlet, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login"
import App from "../App";
import { Hero } from "../components/Hero/Hero";
import { Home } from "../pages/Home/Home";


export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <>
                    <Hero />
                    <Outlet />
                    <footer>
                        <p>&copy; 2024 My Website. All rights reserved.</p>
                    </footer>
                </>,
                children: [
                    {
                        path: "/",
                        element: <Home/>
                    }
                ]
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])