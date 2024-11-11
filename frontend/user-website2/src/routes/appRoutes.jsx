import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import { Login } from "../pages/login";
import Dashboard from "../pages/dashboard"; // Import your Dashboard component
import { ItemLost } from "../pages/itemLost";
import { MatchItems } from "../pages/matchItems";
import { ItemFound } from "../pages/itemFound";
import { MyAccount } from "../pages/myAccount";
import { AboutUs } from "../pages/aboutUs";
import { UnclaimedTicket } from "../pages/unclaimedTicket";
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
    {
      path: "/lost-items",
      element: (
        <ProtectedRoute>
          <ItemLost />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/match-items",
      element: (
        <ProtectedRoute>
          <MatchItems />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/found-items",
      element: (
        <ProtectedRoute>
          <ItemFound />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/my-account",
      element: (
        <ProtectedRoute>
          <MyAccount />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/about-us",
      element: (
        <ProtectedRoute>
          <AboutUs />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/unclaimed-tickets",
      element: (
        <ProtectedRoute>
          <UnclaimedTicket />
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
