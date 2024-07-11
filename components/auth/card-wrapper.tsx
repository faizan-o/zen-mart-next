import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "./header";
import Social from "./social";
import BackButton from "./back-button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerHeading: string;
  headerLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  className?: string;
  lessGap?: boolean;
}

const CardWrapper = ({
  children,
  headerHeading,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  className,
  lessGap,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        "min-w-[300px] w-full max-w-[450px] mx-4 sm:-mx-0 shadow-md",
        className,
        lessGap ? "gap-y-0" : "gap-y-2"
      )}
    >
      <CardHeader>
        <Header
          label={headerLabel}
          heading={headerHeading.toUpperCase()}
        ></Header>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <BackButton label={backButtonLabel} href={backButtonHref} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
