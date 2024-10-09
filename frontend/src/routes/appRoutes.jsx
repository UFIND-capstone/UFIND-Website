import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../pages/login";
import Dashboard from "../pages/dashboard"; // Import your Dashboard component

export const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            errorElement: <Login />, // Handle errors by showing the Login component
        },
        {
            path: "/dashboard",
            element: <Dashboard />, // Define your dashboard route
        },
    ]);

    return <RouterProvider router={router} />;
};