import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaymentSection = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("orderId")
      localStorage.removeItem("orderNumber")
    }   
  },[])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">پرداخت</h2>
      <p>
        شماره سفارش - {orderNumber}
      </p>
      <p>
        شناسه سفارش - {orderId}
      </p>
    </div>
  );
};

export default PaymentSection;