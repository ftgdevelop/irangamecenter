import { useAppSelector } from "@/hooks/use-store";
import { useEffect, useState } from "react";


const PaymentSection = () => {
    const orderNumber = useAppSelector((state) => state.cart.orderNumber);
    const [orderNumberLocalStorage, setOrderNumberLocalStorage] = useState<string | null>(null);
    // !! fix this part just choose  1 way

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("orderNumber");
      setOrderNumberLocalStorage(stored);
    }
  }, []);


  return <div>
      <h2 className="text-xl font-semibold mb-2">پرداخت</h2>
      <p>
          شماره سفارش-
          {orderNumber} 
          {orderNumberLocalStorage}
      </p>
  </div>
}

export default PaymentSection;