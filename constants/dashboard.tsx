import AnalyticsDashboard from "@/components/admin/analytics/analytics-dashboard";
import CampaignsDashboard from "@/components/admin/campaign/campaigns-dashboard";
import CategoriesDashboard from "@/components/admin/categories/categories-dashboard";
import OrdersDashboard from "@/components/admin/order/orders-dashboard";
import ProductsDashboard from "@/components/admin/product/products-dashboard";
import UsersDashboard from "@/components/admin/user/users-dashboard";
import {
  T_ANALYTICS_DASHBOARD_CARD,
  T_DASHBOARD_TAB,
} from "@/types/constant-types";

export const DASHBOARD_TABS: T_DASHBOARD_TAB[] = [
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

export const SIDEBAR_HEADER = "Dashboard Tabs";

export const SEARCH_PRODUCTS_HEADING = "Search Products";

export const CAMPAIGN_CONDITION_TYPES = [
  {
    value: "PRODUCT",
    label: "Product",
  },
  {
    value: "CATEGORY",
    label: "Category",
  },
  {
    value: "PRICE",
    label: "Price",
  },
];

export const CAMPAIGN_PRICE_CONDITION_TYPES = [
  {
    value: "GREATERTHAN",
    label: "Greater Than",
  },
  {
    value: "LESSTHAN",
    label: "Less Than",
  },
];
