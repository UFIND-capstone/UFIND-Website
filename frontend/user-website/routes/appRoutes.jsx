import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// Importing the pages
import AboutUs from "../pages/AboutUs";
import Dashboard from "../pages/Dashboard";
import ContactUs from "../pages/ContactUs";
import CreateListing from "../pages/CreateListing";
import BrowseItemsLost from "../pages/BrowseItemsLost";
import BrowseItemsFound from "../pages/BrowseItemsFound";
import { Login } from "../pages/Login";

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
      ), // Protected route
    },
    {
      path: "/create-listing",
      element: (
        <ProtectedRoute>
          <CreateListing />
        </ProtectedRoute>
      ), // Protected route
    },
    {
      path: "/about-us",
      element: <AboutUs />,
    },
    {
      path: "/contact-us",
      element: <ContactUs />,
    },
    {
      path: "/browse-items/lost",
      element: <BrowseItemsLost />,
    },
    {
      path: "/browse-items/found",
      element: <BrowseItemsFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
