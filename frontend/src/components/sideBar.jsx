import imagee from "../assets/imagee.jpg";

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-950 to-blue-500 text-white min-h-screen w-64">
      <div className="profile border-red-900 flex flex-col items-center p-4">
        <img className="w-24 h-24 object-cover rounded-full" src={imagee} alt="User Profile" />
        <h1 className="text-2xl font-bold mt-2">User Name</h1>
      </div>
      <ul className="flex flex-col font-medium w-full">
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Dashboard</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Lost Items</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Found Items</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Match Items</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">My Account</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
}
