import {
  promiseCard1,
  promiseCard2,
  promiseCard3,
  promiseCard4,
  promiseCard5,
} from "@/public/export";
import { T_CAROUSEL_CARD, T_HERO_OBJECT } from "@/types/constant-types";

export const HERO: T_HERO_OBJECT = {
  heading: "Your Source For High Quality Goods And Products",
  paragraph:
    "Discover a world of unparalleled convenience and choice at ShopEase, where shopping meets innovation. Our ecommerce platform is designed with you in mind, offering a seamless and enjoyable shoppingexperience from start to finish.",
  category_button: "See Categories",
  login_button: "Login",
};

export const HOME_SECTION_HEADING = "Our Top Categories";

export const CAROUSEL_CARDS: T_CAROUSEL_CARD[] = [
  {
    heading: "Your Source For High Quality Goods And Products",
    paragraph:
      "Discover a world of unparalleled convenience and choice at ShopEase, where shopping meets innovation. Our ecommerce platform is designed with you in mind, offering a seamless and enjoyable shoppingexperience from start to finish.",
    image: promiseCard1,
  },
  {
    heading: "Discover Quality Products at Unbeatable Prices",
    paragraph:
      "ZenMart is committed to providing high-quality products at prices that won&apos;t break the bank. We partner with trusted brands and suppliers to ensure that every item you purchase meets your standards. Whether you&apos;re looking for the latest gadgets, stylish apparel, or home essentials, you&apos;ll find it at ZenMart at a price you&apos;ll love. Shop with confidence knowing you&apos;re getting the best value for your money.",
    image: promiseCard2,
  },
  {
    heading: "Shop with Ease: Intuitive and User-Friendly Interface",
    paragraph:
      "Our website is designed with you in mind. ZenMart features an intuitive and user-friendly interface that makes finding and purchasing products a breeze. With easy navigation, detailed product descriptions, and a streamlined checkout process, you can shop quickly and efficiently. Plus, our advanced search and filter options help you find exactly what you&apos;re looking for, saving you time and effort.",
    image: promiseCard3,
  },
  {
    heading: "Fast and Reliable Shipping: Get Your Orders Quickly",
    paragraph:
      "We understand that when you make a purchase, you want it delivered as soon as possible. That&apos;s why ZenMart offers fast and reliable shipping options to get your orders to you quickly. We work with top courier services to ensure timely delivery, and our efficient order processing means you won&apos;t have to wait long to enjoy your new products. Track your order every step of the way for peace of mind.",
    image: promiseCard4,
  },
  {
    heading: "Exceptional Customer Service: We&apos;re Here to Help",
    paragraph:
      "At ZenMart, our customers are our top priority. Our dedicated customer service team is here to assist you with any questions or concerns you may have. Whether you need help with an order, have a question about a product, or need support with a return, we&apos;re just a click or call away. Your satisfaction is important to us, and we&apos;re committed to providing the best possible shopping experience.",
    image: promiseCard5,
  },
];
