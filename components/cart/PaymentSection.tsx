import { useSearchParams } from "next/navigation";

const PaymentSection = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">پرداخت</h2>
      <p>
        شماره سفارش - {orderNumber}
      </p>
    </div>
  );
};

export default PaymentSection;