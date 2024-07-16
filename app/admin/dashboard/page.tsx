import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DASHBOARD_TABS, SIDEBAR_HEADER } from "@/constants/dashboard";
import { T_DASHBOARD_TAB } from "@/types/constant-types";
import { capitalizeFirstLetter } from "@/utils/string-function";
import { GiHamburgerMenu } from "react-icons/gi";

const DashBoardPage = () => {
  return (
    <Tabs defaultValue="analytics" className="w-full">
      <TabsList className="hidden sm:grid w-full grid-cols-6 h-fit rounded-none">
        {DASHBOARD_TABS.map((tab: T_DASHBOARD_TAB) => (
          <TabsTrigger
            key={tab.tab}
            value={tab.tab}
            className="py-5 font-semibold"
          >
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
              {SIDEBAR_HEADER}
            </SheetHeader>
            <TabsList className="grid grid-cols-1 bg-gray-900 space-y-8">
              {DASHBOARD_TABS.map((tab: T_DASHBOARD_TAB) => (
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
      {DASHBOARD_TABS.map((tab: T_DASHBOARD_TAB) => {
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
