import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

const AboutCard = ({
  heading,
  imageSrc,
  paragraph,
  isEven,
}: {
  isEven?: boolean;
  heading: string;
  imageSrc: StaticImageData;
  paragraph: string;
}) => (
  <div
    className={cn("flex flex-col", {
      "md:flex-row": isEven,
      "md:flex-row-reverse": !isEven,
    })}
  >
    <div className="w-full md:w-1/2 space-y-5">
      <Image
        src={imageSrc}
        className="object-fit object-contain object-center"
        alt="About Page Image"
      />
    </div>
    <div className="w-full md:w-1/2 space-y-5 md:flex md:flex-col md:justify-center">
      <h1 className="text-center md:text-left mt-5 md:mt-0 font-bold text-2xl">
        {heading}
      </h1>
      <p className="text-center md:text-left md:w-3/4 text-[14px] text-gray-500">
        {paragraph}
      </p>
    </div>
  </div>
);

export default AboutCard;
