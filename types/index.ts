import { Category, Product } from "@prisma/client";
import { StaticImageData } from "next/image";

export type ResponseData = {
  error?: string;
  success?: string;
};

export type LoginResponseData = ResponseData & {
  isTwoFactorAuthentication?: boolean;
};

export interface FetchedUsers {
  id: string;
  name: string | null;
  image: string | null;
  role: "ADMIN" | "USER";
  isTwoFactorEnabled: boolean;
  emailVerified: Date | null;
}

export type QueryTypes = "CATEGORIES" | "TITLE";

export interface Query {
  query: string;
  type: QueryTypes;
}

export interface ProductsWithIdAndName {
  id: string;
  name: string;
  price: number;
  discount: number | null;
}

export interface SearchProductRespone {
  id: string;
  image: string;
  name: string;
  description: string;
}

export interface GetOrderCountObject {
  _count: {
    categoryId: number;
  };
  categoryId: string;
}

export interface ProductByCategory {
  category: Category;
  products: Product[] | null;
}

export type CheckOutProduct = {
  id: string;
  quantity: number;
};

export type CartProduct = Product & {
  quantity: number;
};

export interface MapAddress {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface AnalyticalCounts {
  productsCount: number;
  categoriesCount: number;
  usersCount: number;
  campaignsCount: number;
  ordersCount: number;
  revenue: number;
}

export interface CategoryRevenue {
  categoryName: string;
  revenue: number;
  productCount: number;
}
