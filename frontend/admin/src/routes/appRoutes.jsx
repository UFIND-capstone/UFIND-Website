import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import { Login } from "../pages/login";
import Dashboard from "../pages/dashboard"; // Import your Dashboard component
import  ItemLost from "../pages/itemLost";
import { MatchItems } from "../pages/matchItems";
import ItemFound from "../pages/itemFound";
import { MyAccount } from "../pages/myAccount";
import  UnclaimedTicket from "../pages/unclaimedTicket";
import TurnoverTicket from "../pages/turnoverTicket";
import ActiveTicket from "../pages/activeTicket";
import ImgDescriptions from "../pages/imgDescriptions";
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
      path: "/itemLost",
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
      path: "/itemFound",
      element: (
        <ProtectedRoute>
          <ItemFound />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/myAccount",
      element: (
        <ProtectedRoute>
          <MyAccount />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/unclaimedTicket",
      element: (
        <ProtectedRoute>
          <UnclaimedTicket />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/turnoverTicket",
      element: (
        <ProtectedRoute>
          <TurnoverTicket />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/activeTicket",
      element: (
        <ProtectedRoute>
          <ActiveTicket />
        </ProtectedRoute>
      ), // Protect the dashboard route
    },
    {
      path: "/imgDescriptions",
      element: (
        <ProtectedRoute>
          <ImgDescriptions />
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
