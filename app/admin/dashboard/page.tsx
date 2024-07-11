import AnalyticsDashboard from "@/components/admin/analytics-dashboard";
import CampaignsDashboard from "@/components/admin/campaigns-dashboard";
import CategoriesDashboard from "@/components/admin/categories-dashboard";
import OrdersDashboard from "@/components/admin/orders-dashboard";
import ProductsDashboard from "@/components/admin/products-dashboard";
import UsersDashboard from "@/components/admin/users-dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalizeFirstLetter } from "@/utils/string-function";
import { GiHamburgerMenu } from "react-icons/gi";

const DashBoardPage = () => {
  type TAB = { tab: string; name: string; component: React.FC };
  const DASHBOARD_TABS: TAB[] = [
    {
      tab: "analytics",
      name: "Analytics",
      component: AnalyticsDashboard,
    },
    {
      tab: "users",
      name: "Users",
      component: UsersDashboard,
    },
    {
      tab: "products",
      name: "Products",
      component: ProductsDashboard,
    },
    {
      tab: "categories",
      name: "Categories",
      component: CategoriesDashboard,
    },
    {
      tab: "campaigns",
      name: "Campaigns",
      component: CampaignsDashboard,
    },
    {
      tab: "orders",
      name: "Orders",
      component: OrdersDashboard,
    },
  ];

  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="hidden sm:grid w-full grid-cols-6 h-fit rounded-none">
        {DASHBOARD_TABS.map((tab: TAB) => (
          <TabsTrigger key={tab.tab} value={tab.tab} className="py-5 font-semibold">
            {capitalizeFirstLetter(tab.name)}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="block sm:hidden w-full h-16">
        <Sheet>
          <SheetTrigger className="text-3xl w-full cursor-pointer h-full">
            <div className="bg-primary-foreground h-full w-full pl-4 flex items-center">
              <GiHamburgerMenu />
            </div>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="max-h-screen overflow-y-auto bg-gray-900"
          >
            <SheetHeader className="text-3xl py-5 font-bold">
              Dashboard Tabs
            </SheetHeader>
            <TabsList className="grid grid-cols-1 bg-gray-900 space-y-8">
              {DASHBOARD_TABS.map((tab: TAB) => (
                <TabsTrigger
                  key={tab.tab}
                  value={tab.tab}
                  className="py-5 px-5"
                >
                  {capitalizeFirstLetter(tab.name)}
                </TabsTrigger>
              ))}
            </TabsList>
          </SheetContent>
        </Sheet>
      </div>
      {DASHBOARD_TABS.map((tab: TAB) => {
        const Component = tab.component;
        return (
          <TabsContent key={tab.tab} value={tab.tab}>
            <Component />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
export default DashBoardPage;
