// AppRoutes.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import { Login } from "../pages/login";
import Dashboard from "../pages/dashboard";
import { MyAccount } from "../pages/myAccount";
import ContactUs from "../pages/contactUs";
import AboutUs from "../pages/aboutUs"; 
import { Register } from "../pages/register";
import ListLost from "../pages/listLost";
import ListFound from "../pages/listFound";
import BrowseitemsLost from "../pages/browseItemsLost";
import BrowseitemsFound from "../pages/browseItemsFound";
import ImageDesc from "../pages/imageDesc";
import ProtectedRoute from "../components/ProtectedRoute";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Login />, // You could replace this with a 404 error page component if desired
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
    {
      path: "/listLost",
      element: <ListLost />, 
    },
    {
      path: "/listFound",
      element: <ListFound />, 
    },
    {
      path: "/browseItemsLost",
      element: <BrowseitemsLost />, 
    },
    {
      path: "/browseItemsFound",
      element: <BrowseitemsFound />, 
    },
    {
      path: "/imageDesc",
      element: <ImageDesc />, 
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
