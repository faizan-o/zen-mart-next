import CardWrapper from "../auth/card-wrapper";
import { CartProduct } from "@/types";

const CheckOutCard = ({ products, totalPrice }: { products: CartProduct[], totalPrice: number }) => {


  return (
    <CardWrapper
      headerHeading="Order Details"
      headerLabel="Details Of Your Order"
      backButtonLabel="Continue Shopping"
      backButtonHref="/categories/"
      className="mt-5 md:mt-0"
    >
      <div className="space-y-3">
        <div className="flex justify-between font-bold items-center">
          <h1 className="text-center w-full">Product Name</h1>
          <p className="text-center w-full">Quantity</p>
          <p className="text-center w-full">Price ($)</p>
        </div>
        {products &&
          products.map((product) => (
            <div className="flex justify-between">
              <h1 className="text-center w-full">{product.name}</h1>
              <p className="text-center w-full">{product.quantity}</p>
              <p className="text-center w-full">
                {product.isOnSale && product.discount
                  ? product.quantity * product.price * (product.discount / 100)
                  : product.quantity * product.price}
                $
              </p>
            </div>
          ))}
        <div className="flex justify-around font-bold border-y-[2px] border-gray-500 py-2">
          <h1>Total</h1>
          <p>{totalPrice}$</p>
        </div>
      </div>
    </CardWrapper>
  );
};

export default CheckOutCard;
