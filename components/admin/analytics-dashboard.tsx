import { getCounts } from "@/data/analytics";
import { AnalyticalCounts } from "@/types";
import { BiCategory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { MainChart } from "./main-chart";

const AnalyticsDashboard = async () => {
  const counts: AnalyticalCounts = await getCounts();

  return (
    <div className="min-h-full w-full">
      <div className="px-5 w-full">
        <h1 className="font-bold text-2xl py-5">Overview</h1>
        <div className="flex justify-center items-center flex-wrap gap-5 w-full py-10">
          <div className="w-full md:w-[300px] h-[100px] bg-emerald-500 rounded-md flex items-center px-5 space-x-5">
            <FaProductHunt className="text-5xl" />
            <div>
              <h1 className="font-bold ">Total Products</h1>
              <p>{counts.productsCount}</p>
            </div>
          </div>
          <div className="w-full md:w-[300px] h-[100px]  bg-orange-600 rounded-md flex items-center px-5 space-x-5">
            <FaUser className="text-5xl" />
            <div>
              <h1 className="font-bold ">Total Users</h1>
              <p>{counts.usersCount}</p>
            </div>
          </div>
          <div className="w-full md:w-[300px] h-[100px]  bg-blue-600 rounded-md flex items-center px-5 space-x-5">
            <BiCategory className="text-5xl" />
            <div>
              <h1 className="font-bold ">Total Categories</h1>
              <p>{counts.categoriesCount}</p>
            </div>
          </div>
          <div className="w-full md:w-[300px] h-[100px]  bg-purple-600 rounded-md flex items-center px-5 space-x-5">
            <BiCategory className="text-5xl" />
            <div>
              <h1 className="font-bold ">OnGoing Campaings</h1>
              <p>{counts.campaignsCount}</p>
            </div>
          </div>
          <div className="w-full md:w-[300px] h-[100px]  bg-cyan-600 rounded-md flex items-center px-5 space-x-5">
            <BiCategory className="text-5xl" />
            <div>
              <h1 className="font-bold ">Total Revenue</h1>
              <p>{counts.revenue}$</p>
            </div>
          </div>
          <div className="w-full md:w-[300px] h-[100px]  bg-red-600 rounded-md flex items-center px-5 space-x-5">
            <BiCategory className="text-5xl" />
            <div>
              <h1 className="font-bold ">Total Orders</h1>
              <p>{counts.ordersCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 w-full">
        <h1 className="font-bold text-2xl py-5">Revenue</h1>
        <MainChart />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
