"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  promiseCard1,
  promiseCard2,
  promiseCard3,
  promiseCard4,
  promiseCard5,
} from "@/public/export";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";

export default function CarouselSpacing() {
  return (
    <Carousel
      plugins={[
        AutoPlay({
          delay: 2000,
        }),
      ]}
      className="min-w-[60%] md:min-w-[70%] border-none w-full max-w-[60%] md:max-w-[70%] mx-auto"
    >
      <CarouselContent className="-ml-1">
        <CarouselItem className="pl-1 w-full h-[26rem] flex justify-center items-center">
          <div className="p-1 h-full hidden md:block">
            <Card className="h-full">
              <CardContent className="w-full h-full flex flex-col items-center justify-around p-6">
                <h1 className="font-bold text-xl text-center">
                  Welcome to ZenMart: Your One-Stop Online Shopping Destination
                </h1>
                <p className="text-[12px] font-thin text-gray-600 text-center text-pretty">
                  At ZenMart, we believe in making your shopping experience as
                  seamless and enjoyable as possible. Our platform offers a wide
                  range of products, from everyday essentials to unique and
                  hard-to-find items. With a focus on quality and customer
                  satisfaction, we strive to bring you the best deals and a
                  hassle-free shopping journey. Explore our extensive catalog
                  and find everything you need, all in one place.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Image src={promiseCard1} alt="PromiseCard1" />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 w-full h-[26rem] flex justify-center items-center">
          <div className="p-1 h-full hidden md:block">
            <Card className="h-full">
              <CardContent className="w-full h-full flex flex-col items-center justify-around p-6">
                <h1 className="font-bold text-xl text-center">
                  Discover Quality Products at Unbeatable Prices
                </h1>
                <p className="text-[12px] font-thin text-gray-600 text-center text-pretty">
                  ZenMart is committed to providing high-quality products at
                  prices that won&apos;t break the bank. We partner with trusted
                  brands and suppliers to ensure that every item you purchase
                  meets your standards. Whether you&apos;re looking for the
                  latest gadgets, stylish apparel, or home essentials,
                  you&apos;ll find it at ZenMart at a price you&apos;ll love.
                  Shop with confidence knowing you&apos;re getting the best
                  value for your money.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Image src={promiseCard2} alt="PromiseCard2" />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 w-full h-[26rem] flex justify-center items-center">
          <div className="p-1 h-full hidden md:block">
            <Card className="h-full">
              <CardContent className="w-full h-full flex flex-col items-center justify-around p-6">
                <h1 className="font-bold text-xl text-center">
                  Shop with Ease: Intuitive and User-Friendly Interface
                </h1>
                <p className="text-[12px] font-thin text-gray-600 text-center text-pretty">
                  Our website is designed with you in mind. ZenMart features an
                  intuitive and user-friendly interface that makes finding and
                  purchasing products a breeze. With easy navigation, detailed
                  product descriptions, and a streamlined checkout process, you
                  can shop quickly and efficiently. Plus, our advanced search
                  and filter options help you find exactly what you&apos;re
                  looking for, saving you time and effort.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Image src={promiseCard3} alt="PromiseCard3" />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 w-full h-[26rem] flex justify-center items-center">
          <div className="p-1 h-full hidden md:block">
            <Card className="h-full">
              <CardContent className="w-full h-full flex flex-col items-center justify-around p-6">
                <h1 className="font-bold text-xl text-center">
                  Fast and Reliable Shipping: Get Your Orders Quickly
                </h1>
                <p className="text-[12px] font-thin text-gray-600 text-center text-pretty">
                  We understand that when you make a purchase, you want it
                  delivered as soon as possible. That&apos;s why ZenMart offers
                  fast and reliable shipping options to get your orders to you
                  quickly. We work with top courier services to ensure timely
                  delivery, and our efficient order processing means you
                  won&apos;t have to wait long to enjoy your new products. Track
                  your order every step of the way for peace of mind.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Image src={promiseCard4} alt="PromiseCard4" />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 w-full h-[26rem] flex justify-center items-center">
          <div className="p-1 h-full hidden md:block">
            <Card className="h-full">
              <CardContent className="w-full h-full flex flex-col items-center justify-around p-6">
                <h1 className="font-bold text-xl text-center">
                  Exceptional Customer Service: We&apos;re Here to Help
                </h1>
                <p className="text-[12px] font-thin text-gray-600 text-center text-pretty">
                  At ZenMart, our customers are our top priority. Our dedicated
                  customer service team is here to assist you with any questions
                  or concerns you may have. Whether you need help with an order,
                  have a question about a product, or need support with a
                  return, we&apos;re just a click or call away. Your
                  satisfaction is important to us, and we&apos;re committed to
                  providing the best possible shopping experience.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Image src={promiseCard5} alt="PromiseCard5" />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
