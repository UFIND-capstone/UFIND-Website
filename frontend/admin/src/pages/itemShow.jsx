import Sidebar from "../components/sideBar";
import Topbar from "../components/topBar";
import data from "../assets/data.json";

export default function ItemShow() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <main className="flex flex-col items-center p-5">
          <h1 className="font-extrabold text-6xl">LOST ITEMS</h1>
          <ul className="flex gap-4">
            {data.map((item) => (
              <li key={item.id} className="p-5 border-4 border-red-950">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
