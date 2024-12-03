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
import HowtoProtectYourBelongings from "../pages/howtoprotectyourbelongings";
import HowtoReportaLostorFoundItem from "../pages/howtoreportalostorfounditem";
import ProtectedRoute from "../components/ProtectedRoute";
import ItemDescription from "../pages/imageDesc";
import ReportPage from "../pages/reportPage";
import ViewMyTickets from "../pages/viewmyTickets";
import UnclaimedTickets from "../pages/unclaimedTickets";
import WhyIsItImportantToSecureYourBelongings from "../pages/whyisitimportanttosecureyourBelongings";

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
      path: "/items/:itemID",
      element: <ItemDescription />, 
    },
    {
      path: "/browseItemsFound/:itemID",
      element: <ItemDescription />, 
    },
    {
      path: "/browseItemsFound",
      element: <BrowseitemsFound />, 
    },
    {
      path: "/imageDesc",
      element: <ImageDesc />, 
    },
    {
      path: "/howtoProtectYourBelongings",
      element: <HowtoProtectYourBelongings />, 
    },
    {
      path: "/howtoreportalostorfounditem",
      element: <HowtoReportaLostorFoundItem />, 
    },
    {
      path: "/reportPage",
      element: <ReportPage />
    },
    {
      path: "/whyisitimportanttosecureyourBelongings",
      element: <WhyIsItImportantToSecureYourBelongings />,
    },
    {
      path: "/viewmyTickets",
      element: <ViewMyTickets />
    },
    {
      path: "/unclaimedTickets",
      element: <UnclaimedTickets />
    }

  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
