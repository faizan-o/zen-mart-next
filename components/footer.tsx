import Link from "next/link";
import React from "react";
import { IoMail } from "react-icons/io5";
import { FaSquarePhone } from "react-icons/fa6";
import Image from "next/image";
import { logo } from "@/public/export";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font border-t-2 mt-10">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <Image
              src={logo}
              alt="ZenMart Logo"
              className="w-8 h-8 rounded-[100%] border-white border-2"
            />
            <span className="ml-3 text-xl text-white">ZenMart</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Discover a world of unparalleled convenience and choice at ShopEase,
            where shopping meets innovation.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              User
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Orders
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Useful Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact Us
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Admin Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/admin/dashboard"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Campaigns
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Authentication
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="auth/login"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="auth/register"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Regsiter
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Settings
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-800">
        <div className="container mx-auto py-5 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024 ZenMart —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @faizan-o
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
