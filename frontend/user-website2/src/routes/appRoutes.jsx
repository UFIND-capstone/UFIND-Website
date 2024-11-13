// AppRoutes.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import { Login } from "../pages/login";
import Dashboard from "../pages/dashboard";
import { MyAccount } from "../pages/myAccount";
import ContactUs from "../pages/contactUs";
import AboutUs from "../pages/aboutUs"; // Adjust this import as needed
import { Register } from "../pages/register";
import ProtectedRoute from "../components/ProtectedRoute";

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
      ),
    },
    {
      path: "/contactUs",
      element: (
        <ProtectedRoute>
          <ContactUs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/myAccount",
      element: (
        <ProtectedRoute>
          <MyAccount />
        </ProtectedRoute>
      ),
    },
    {
      path: "/aboutUs",
      element: <AboutUs />, // Publicly accessible About Us route
    },
    {
      path: "/register",
      element: <Register />, 
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
