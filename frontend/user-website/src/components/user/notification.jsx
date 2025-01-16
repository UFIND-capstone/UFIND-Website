import { useNotification } from "../../context/contextNotification";
const NotificationBanner = () => {
  const { notification, dismissNotification } = useNotification();
  if (!notification) return null; // Don't show the banner if there's no notification
  return (
    <div className="fixed top-0 left-0 w-full bg-blue-500 text-white text-center py-2 z-50 flex justify-between items-center">
      <span>{notification}</span>
      <button
        onClick={dismissNotification}
        className="text-white bg-transparent border-0 p-1 ml-4"
        aria-label="Close Notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 11-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
export default NotificationBanner;