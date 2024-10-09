import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from '../AuthContext';
import { Login } from "../pages/login";
import Dashboard from "../pages/dashboard"; // Import your Dashboard component
import ProtectedRoute from "../components/ProtectedRoute"; // Import the ProtectedRoute component

export const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            errorElement: <Login />,
        },
        {
            path: "/dashboard",
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            ), // Protect the dashboard route
        },
    ]);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};