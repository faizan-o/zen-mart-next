import { getCounts } from "@/data/analytics";
import { AnalyticalCounts } from "@/types";
import { BiCategory } from "react-icons/bi";
import { FaReceipt, FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { MainChart } from "./main-chart";
import { T_ANALYTICS_DASHBOARD_CARD } from "@/types/constant-types";
import { MdCampaign } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { cn } from "@/lib/utils";
import Header from "../header";

const AnalyticsDashboard = async () => {
  const counts: AnalyticalCounts = await getCounts();

  const ANALYTICS_DASHBOARD_CARDS: T_ANALYTICS_DASHBOARD_CARD[] = [
    {
      heading: "Total Products",
      Icon: FaProductHunt,
      value: counts.productsCount,
      color: "bg-emerald-500",
    },
    {
      heading: "Total Users",
      Icon: FaUser,
      value: counts.usersCount,
      color: "bg-orange-500",
    },
    {
      heading: "Total Categories",
      Icon: BiCategory,
      value: counts.categoriesCount,
      color: "bg-blue-500",
    },
    {
      heading: "Ongoing Campaigns",
      Icon: MdCampaign,
      value: counts.campaignsCount,
      color: "bg-purple-500",
    },
    {
      heading: "Total Revenue",
      Icon: AiFillDollarCircle,
      value: counts.revenue,
      color: "bg-cyan-500",
    },
    {
      heading: "Total Orders",
      Icon: FaReceipt,
      value: counts.ordersCount,
      color: "bg-red-500",
    },
  ];

  const AnalyticsCard = ({
    heading,
    Icon,
    value,
    color,
  }: T_ANALYTICS_DASHBOARD_CARD) => (
    <div
      className={cn(
        `w-full md:w-[300px] h-[100px] rounded-md flex items-center px-5 space-x-5`,
        color
      )}
    >
      <Icon className="text-5xl" />
      <div>
        <h1 className="font-bold ">{heading}</h1>
        <p>{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-full w-full">
      <div className="py-10 px-5 w-full">
        <Header heading="Overview" hasButton={false} />
        <div className="flex justify-center items-center flex-wrap gap-5 w-full py-10">
          {ANALYTICS_DASHBOARD_CARDS.map((card, idx) => (
            <AnalyticsCard key={idx} {...card} />
          ))}
        </div>
      </div>
      <div className="p-5 w-full">
        <h1 className="font-bold text-2xl py-5">Revenue</h1>
        <MainChart />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
