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
import ImageDescription from "../pages/user/ImageDescription";
import HowtoProtectYourBelongings from "../pages/user/howtoprotectyourbelongings";
import HowtoReportaLostorFoundItem from "../pages/user/howtoreportalostorfounditem";
import ReportPage from "../pages/user/reportPage";
import ViewMyTickets from "../pages/user/viewmyTickets";
import UnclaimedTickets from "../pages/user/unclaimedTickets";
import ContactForm from "../pages/user/contactForm";
import ActiveTickets from "../pages/user/ActiveTickets";
import Completed from "../pages/user/completed";
import Notification from "../pages/user/notification";
import ChatApp from "../pages/user/chatApp";
import WhyIsItImportantToSecureYourBelongings from "../pages/user/whyisitimportanttosecureyourBelongings";

// Admin Routes
import { LoginAdmin } from "../pages/admin/loginAdmin";
import DashboardAdmin from "../pages/admin/dashboard";
import ItemLost from "../pages/admin/itemLost";
import { MatchItems } from "../pages/admin/matchItems";
import ItemFound from "../pages/admin/itemFound";
import { MyAccountAdmin } from "../pages/admin/myAccount";
import UnclaimedTicket from "../pages/admin/unclaimedTicket";
import TurnoverTicket from "../pages/admin/turnoverTicket";
import ActiveTicketAdmin from "../pages/admin/ActiveTicketAdmin";
import ImgDescriptions from "../pages/admin/imgDescriptions";
import CompletedTickets from "../pages/admin/completedTickets";
import UserManagement from "../pages/admin/userManagement";



export const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public routes
    { path: "/", element: <Login />, errorElement: <Login /> },
    { path: "/aboutUs", element: <AboutUs />, errorElement: <AboutUs /> },
    { path: "/register", element: <Register />, errorElement: <Register /> },
    { path: "/howtoProtectYourBelongings", element: <HowtoProtectYourBelongings />, errorElement: <HowtoProtectYourBelongings /> },
    { path: "/howtoreportalostorfounditem", element: <HowtoReportaLostorFoundItem />, errorElement: <HowtoReportaLostorFoundItem /> },
    { path: "/whyisitimportanttosecureyourBelongings", element: <WhyIsItImportantToSecureYourBelongings />, errorElement: <WhyIsItImportantToSecureYourBelongings /> },

    // Protected User Routes
    { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute>, errorElement: <Dashboard /> },
    { path: "/myAccount", element: <ProtectedRoute><MyAccount /></ProtectedRoute>, errorElement: <MyAccount /> },
    { path: "/contactUs", element: <ContactUs />, errorElement: <ContactUs /> },
    { path: "/listLost", element: <ListLost />, errorElement: <ListLost /> },
    { path: "/listFound", element: <ListFound />, errorElement: <ListFound /> },
    { path: "/browseItemsLost", element: <BrowseitemsLost />, errorElement: <BrowseitemsLost /> },
    { path: "/browseItemsFound", element: <BrowseitemsFound />, errorElement: <BrowseitemsFound /> },
    { path: "/items/:itemID", element: <ImageDescription />, errorElement: <ImageDescription /> },
    { path: "/reportPage", element: <ReportPage />, errorElement: <ReportPage /> },
    { path: "/viewmyTickets", element: <ViewMyTickets />, errorElement: <ViewMyTickets /> },
    { path: "/unclaimedTickets", element: <UnclaimedTickets />, errorElement: <UnclaimedTickets /> },
    { path: "/contactForm", element: <ContactForm />, errorElement: <ContactForm /> },
    { path: "/activeTickets", element: <ActiveTickets />, errorElement: <ActiveTickets /> },
    { path: "/completed", element: <Completed />, errorElement: <Completed /> },
    { path: "/notification", element: <Notification />, errorElement: <Notification /> },
    { path: "/chatApp", element: <ChatApp />, errorElement: <ChatApp /> },

    // Admin Routes
    { path: "/admin/adminLogin", element: <LoginAdmin />, errorElement: <LoginAdmin /> },
    { path: "/admin/dashboard", element: <ProtectedRoute adminOnly={true}><DashboardAdmin /></ProtectedRoute>, errorElement: <DashboardAdmin /> },
    { path: "/admin/itemLost", element: <ProtectedRoute adminOnly={true}><ItemLost /></ProtectedRoute>, errorElement: <ItemLost /> },
    { path: "/admin/match-items", element: <ProtectedRoute adminOnly={true}><MatchItems /></ProtectedRoute>, errorElement: <MatchItems /> },
    { path: "/admin/itemFound", element: <ProtectedRoute adminOnly={true}><ItemFound /></ProtectedRoute>, errorElement: <ItemFound /> },
    { path: "/admin/myAccount", element: <ProtectedRoute adminOnly={true}><MyAccountAdmin /></ProtectedRoute>, errorElement: <MyAccountAdmin /> },
    { path: "/admin/unclaimedTicket", element: <ProtectedRoute adminOnly={true}><UnclaimedTicket /></ProtectedRoute>, errorElement: <UnclaimedTicket /> },
    { path: "/admin/turnoverTicket", element: <ProtectedRoute adminOnly={true}><TurnoverTicket /></ProtectedRoute>, errorElement: <TurnoverTicket /> },
    { path: "/admin/completedTickets", element: <ProtectedRoute adminOnly={true}><CompletedTickets /></ProtectedRoute>, errorElement: <CompletedTickets /> },
    { path: "/admin/activeTicketAdmin", element: <ProtectedRoute adminOnly={true}><ActiveTicketAdmin /></ProtectedRoute>, errorElement: <ActiveTicketAdmin /> },
    { path: "/admin/userManagement", element: <ProtectedRoute adminOnly={true}><UserManagement /></ProtectedRoute>, errorElement: <UserManagement /> },
    { path: "/admin/items/:itemID", element: <ProtectedRoute adminOnly={true}><ImgDescriptions /></ProtectedRoute>, errorElement: <ImgDescriptions /> },
    { path: "/admin/unclaimedTickets", element: <ProtectedRoute adminOnly={true}><UnclaimedTicket /></ProtectedRoute>, errorElement: <UnclaimedTicket /> },

  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
