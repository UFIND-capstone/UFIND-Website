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
import Turnover from "../pages/user/turnover";
import Notification from "../pages/user/notification";
import ChatApp from "../pages/user/chatApp";
import WhyIsItImportantToSecureYourBelongings from "../pages/user/whyisitimportanttosecureyourBelongings";

// Admin Routes
<<<<<<< HEAD
import { LoginAdmin } from "../pages/admin/loginAdmin"; 
=======
import { LoginAdmin } from "../pages/admin/loginAdmin";
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
import DashboardAdmin from "../pages/admin/dashboard";
import ItemLost from "../pages/admin/itemLost";
import { MatchItems } from "../pages/admin/matchItems";
import ItemFound from "../pages/admin/itemFound";
import { MyAccountAdmin } from "../pages/admin/myAccount";
import UnclaimedTicket from "../pages/admin/unclaimedTicket";
import TurnoverTicket from "../pages/admin/turnoverTicket";
<<<<<<< HEAD
import ActiveTicketAdmin from "../pages/admin/ActiveTicketAdmin"; 
=======
import ActiveTicketAdmin from "../pages/admin/ActiveTicketAdmin";
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
import ImgDescriptions from "../pages/admin/imgDescriptions";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public routes
    { path: "/", element: <Login />, errorElement: <Login /> },
<<<<<<< HEAD
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
    { path: "/items/:itemID", element: <ImageDescription /> },
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
      path: "/admin/adminLogin", // Fixed route name for admin login
      element: <loginAdmin />,  // Using the correct AdminLogin component
      errorElement: <LoginAdmin />, // Handle error with the same component
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
      path: "/admin/activeTicketAdmin",
      element: (
        <ProtectedRoute>
          <ActiveTicketAdmin />
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
=======
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
    { path: "/turnover", element: <Turnover />, errorElement: <Turnover /> },
    { path: "/notification", element: <Notification />, errorElement: <Notification /> },
    { path: "/chatApp", element: <ChatApp />, errorElement: <ChatApp /> },

    // Admin Routes
    { path: "/admin/adminLogin", element: <LoginAdmin />, errorElement: <LoginAdmin /> },
    { path: "/admin/dashboard", element: <ProtectedRoute><DashboardAdmin /></ProtectedRoute>, errorElement: <DashboardAdmin /> },
    { path: "/admin/itemLost", element: <ProtectedRoute><ItemLost /></ProtectedRoute>, errorElement: <ItemLost /> },
    { path: "/admin/match-items", element: <ProtectedRoute><MatchItems /></ProtectedRoute>, errorElement: <MatchItems /> },
    { path: "/admin/itemFound", element: <ProtectedRoute><ItemFound /></ProtectedRoute>, errorElement: <ItemFound /> },
    { path: "/admin/myAccount", element: <ProtectedRoute><MyAccountAdmin /></ProtectedRoute>, errorElement: <MyAccountAdmin /> },
    { path: "/admin/unclaimedTicket", element: <ProtectedRoute><UnclaimedTicket /></ProtectedRoute>, errorElement: <UnclaimedTicket /> },
    { path: "/admin/turnoverTicket", element: <ProtectedRoute><TurnoverTicket /></ProtectedRoute>, errorElement: <TurnoverTicket /> },
    { path: "/admin/activeTicketAdmin", element: <ProtectedRoute><ActiveTicketAdmin /></ProtectedRoute>, errorElement: <ActiveTicketAdmin /> },
    { path: "/admin/items/:itemID", element: <ProtectedRoute><ImgDescriptions /></ProtectedRoute>, errorElement: <ImgDescriptions /> },
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
