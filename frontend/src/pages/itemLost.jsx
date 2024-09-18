import Sidebar from "../components/sidebar";
import Topbar from "../components/topBar";
import data from "../assets/data.json";
export default function ItemLost() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <main className="flex flex-col items-center p-5">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">LOST ITEMS</h1>
          <ul className="flex flex-wrap gap-4 justify-center">
            {data.map((item) => (
              <li
                key={item.id}
                className="p-5 border-4 border-red-950 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="mt-2">{item.description}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
