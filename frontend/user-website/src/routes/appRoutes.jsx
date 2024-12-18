import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import ProtectedRoute from "../components/user/ProtectedRoute";

// User Routes
import { Login } from "../pages/user/login";
import Dashboard from "../pages/user/dashboard";
import { MyAccount } from "../pages/user/myAccount";
import ContactUs from "../pages/user/contactUs";
import AboutUs from "../pages/user/aboutUs";
import { Register } from "../pages/user/register";
import ListLost from "../pages/user/listLost";
import ListFound from "../pages/user/listFound";
import BrowseitemsLost from "../pages/user/browseItemsLost";
import BrowseitemsFound from "../pages/user/browseItemsFound";
import ImageDesc from "../pages/user/imageDesc";
import HowtoProtectYourBelongings from "../pages/user/howtoprotectyourbelongings";
import HowtoReportaLostorFoundItem from "../pages/user/howtoreportalostorfounditem";
import ItemDescription from "../pages/user/imageDesc";
import ReportPage from "../pages/user/reportPage";
import ViewMyTickets from "../pages/user/viewmyTickets";
import UnclaimedTickets from "../pages/user/unclaimedTickets";
import ContactForm from "../pages/user/contactForm";
import ActiveTickets from "../pages/user/activeTickets";
import Turnover from "../pages/user/turnover";
import Notification from "../pages/user/notification";
import ChatApp from "../pages/user/chatApp";
import WhyIsItImportantToSecureYourBelongings from "../pages/user/whyisitimportanttosecureyourBelongings";

// Admin Routes
import { LoginAdmin } from "../pages/admin/login";
import DashboardAdmin from "../pages/admin/dashboard";
import ItemLost from "../pages/admin/itemLost";
import { MatchItems } from "../pages/admin/matchItems";
import ItemFound from "../pages/admin/itemFound";
import { MyAccountAdmin } from "../pages/admin/myAccount";
import UnclaimedTicket from "../pages/admin/unclaimedTicket";
import TurnoverTicket from "../pages/admin/turnoverTicket";
import ActiveTicket from "../pages/admin/activeTicket";
import ImgDescriptions from "../pages/admin/imgDescriptions";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public routes
    { path: "/", element: <Login />, errorElement: <Login /> },
    { path: "/aboutUs", element: <AboutUs /> },
    { path: "/register", element: <Register /> },
    { path: "/howtoProtectYourBelongings", element: <HowtoProtectYourBelongings /> },
    { path: "/howtoreportalostorfounditem", element: <HowtoReportaLostorFoundItem /> },
    { path: "/whyisitimportanttosecureyourBelongings", element: <WhyIsItImportantToSecureYourBelongings /> },

    // Protected User Routes
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
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
    { path: "/contactUs", element: <ContactUs /> },
    { path: "/listLost", element: <ListLost /> },
    { path: "/listFound", element: <ListFound /> },
    { path: "/browseItemsLost", element: <BrowseitemsLost /> },
    { path: "/browseItemsFound", element: <BrowseitemsFound /> },
    { path: "/items/:itemID", element: <ItemDescription /> },
    { path: "/imageDesc", element: <ImageDesc /> },
    { path: "/reportPage", element: <ReportPage /> },
    { path: "/viewmyTickets", element: <ViewMyTickets /> },
    { path: "/unclaimedTickets", element: <UnclaimedTickets /> },
    { path: "/contactForm", element: <ContactForm /> },
    { path: "/activeTickets", element: <ActiveTickets /> },
    { path: "/turnover", element: <Turnover /> },
    { path: "/notification", element: <Notification /> },
    { path: "/chatApp", element: <ChatApp /> },

    // Admin Routes
    {
      path: "/admin",
      element: <LoginAdmin />,
      errorElement: <LoginAdmin />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardAdmin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/itemLost",
      element: (
        <ProtectedRoute>
          <ItemLost />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/match-items",
      element: (
        <ProtectedRoute>
          <MatchItems />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/itemFound",
      element: (
        <ProtectedRoute>
          <ItemFound />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/myAccount",
      element: (
        <ProtectedRoute>
          <MyAccountAdmin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/unclaimedTicket",
      element: (
        <ProtectedRoute>
          <UnclaimedTicket />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/turnoverTicket",
      element: (
        <ProtectedRoute>
          <TurnoverTicket />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/activeTicket",
      element: (
        <ProtectedRoute>
          <ActiveTicket />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/imgDescriptions",
      element: (
        <ProtectedRoute>
          <ImgDescriptions />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
