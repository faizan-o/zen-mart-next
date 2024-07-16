import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

export interface T_ABOUT_CARD {
  imageSrc: StaticImageData;
  heading: string;
  paragraph: string;
}

type T_LINK_BUTTON = "PUBLIC" | "PRIVATE";

export interface T_NAVBAR_LINK {
  label: string;
  Icon: IconType;
  href: string;
  type: T_LINK_BUTTON;
}

export interface T_HERO_OBJECT {
  heading: string;
  paragraph: string;
  category_button: string;
  login_button: string;
} 

export interface T_CAROUSEL_CARD {
  image: StaticImageData;
  heading: string;
  paragraph: string;
}

export type T_DASHBOARD_TAB = { tab: string; name: string; component: React.FC };

export interface T_ANALYTICS_DASHBOARD_CARD {
  heading: string;
  value: number;
  color: string;
  Icon: IconType;
}