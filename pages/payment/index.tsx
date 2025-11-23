/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getOrderById } from "@/actions/commerce";
import Gateways from "@/components/payment/Gateways";
import Steps from "@/components/payment/Steps";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentPage() {

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const fetchOrder = async (id: string) => {

      const token = localStorage.getItem('Token');
      const response: any = await getOrderById({
        id: +id,
        currency: "IRR",
        token: token || ""
      });
      console.log(response);
    }
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  return (
    <>
      <Steps activeStepKey="payment" />
      <div className="p-4">

        <h2 className="text-lg font-semibold my-4 text-[#ffefb2]">انتخاب روش پرداخت </h2>

        {!!(orderId && orderNumber) && <Gateways
          orderId={+orderId}
          orderNumber={orderNumber}
        />}

      </div>

    </>
  );
}