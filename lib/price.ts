export const calculateTotalPrice = ({
    isOnSale,
    discount,
    price,
    quantity,
}: {
    isOnSale: boolean;
    discount?: number | null;
    price: number;
    quantity?: number;
}): number => {
    if (!isOnSale && quantity) return Math.floor(price*quantity);
    if (isOnSale && discount && quantity) return Math.floor((discount / 100) * (price*quantity));
    if(!isOnSale) return Math.floor(price);
    if (isOnSale && discount) return Math.floor((discount / 100) * price);
    return 0;
}
