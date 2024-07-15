import { convertToSubCurrency } from "@/lib/currency";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";
// import type { SubmitError }

interface CheckOutPaymentCardProps {
  amount: number;
  orderId: string;
}

const CheckOutPaymentCard = ({ amount, orderId }: CheckOutPaymentCardProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handlePaymentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    toast("Processing Your Payment");

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError && submitError.message) {
      setErrorMessage(submitError.message);
      toast(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://www.zenmart.com/payment-success?order=${orderId}`,
      },
    });

    if (error && error.message) {
      setErrorMessage(error.message);
      toast(error.message);
    }
  };

  if (!stripe || !elements || !clientSecret) {
    return (
      <div className="flex justify-center items-center">
        <ScaleLoader color="cyan" height={14} />
      </div>
    );
  }

  return (
    <form onSubmit={handlePaymentSubmit}>
      {clientSecret && (
        <PaymentElement className="bg-white p-5 rounded-md my-5" />
      )}
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-5"
        variant="secondary"
      >
        Pay {amount}$
      </Button>
      {errorMessage && (
        <h1 className="font-bold text-[12px] mt-4">{errorMessage}</h1>
      )}
    </form>
  );
};

export default CheckOutPaymentCard;
