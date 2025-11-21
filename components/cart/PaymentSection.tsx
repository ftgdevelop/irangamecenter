import { useAppSelector } from "@/hooks/use-store";


const PaymentSection = () => {
    const orderNumber  = useAppSelector((state) => state.cart.orderNumber);

  return <div>
      <h2 className="text-xl font-semibold mb-2">پرداخت</h2>
      <p>
          شماره سفارش-
          {orderNumber} 
      </p>
  </div>
}

export default PaymentSection;