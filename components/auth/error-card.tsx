import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = (): JSX.Element => {
  return (
    <CardWrapper
      headerHeading="OOPS! Something Went Wrong!"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
    >
      <div className="text-destructive w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="w-10 h-10" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
