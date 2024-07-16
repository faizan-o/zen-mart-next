import { T_NAVBAR_LINK } from "@/types/constant-types";
import { BiSolidCategory } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { RiContactsBook3Fill, RiHeartAddFill } from "react-icons/ri";

export const NAVBAR_TITLE = "ZenMart";

export const NAVBAR_LINKS: T_NAVBAR_LINK[] = [
  {
    label: "Home",
    href: "/",
    Icon: FaHome,
    type: "PUBLIC",
  },
  {
    label: "Categories",
    href: "/categories",
    Icon: BiSolidCategory,
    type: "PUBLIC",
  },
  {
    label: "Cart",
    href: "/cart",
    Icon: FaShoppingCart,
    type: "PRIVATE",
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    Icon: RiHeartAddFill,
    type: "PRIVATE",
  },
  {
    label: "My Orders",
    href: "/orders",
    Icon: FaReceipt,
    type: "PRIVATE",
  },
  {
    label: "About Us",
    href: "/about",
    Icon: BsInfoCircleFill,
    type: "PUBLIC",
  },
  {
    label: "Contact Us",
    href: "/contact",
    Icon: RiContactsBook3Fill,
    type: "PUBLIC",
  },
];

export const NAVBAR_BUTTONS = {
  dashboard: "Dashboard",
  settings: "Settings",
  login: "Login",
  register: "Register",
  logout: "Logout"
}