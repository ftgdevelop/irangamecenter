/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getOrderById } from "@/actions/commerce";
import Gateways from "@/components/payment/Gateways";
import Steps from "@/components/payment/Steps";
import SimplePortal from "@/components/shared/layout/SimplePortal";
import { numberWithCommas } from "@/helpers";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const fetchOrder = async (id: string) => {
      const token = localStorage.getItem("Token");
      const response: any = await getOrderById({
        id: +id,
        currency: "IRR",
        token: token || "",
      });
      console.log(response);
    };
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  return (
    <>
      <Steps activeStepKey="payment" />

      <div className="p-4">
        <h2 className="text-lg font-semibold my-4 text-[#ffefb2]">
          انتخاب روش پرداخت{" "}
        </h2>

        {!!(orderId && orderNumber) && (
          <Gateways orderId={+orderId} orderNumber={orderNumber} />
        )}

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="text-xs"> قیمت کالاها (6) </label>
          <span className="font-semibold"> {numberWithCommas(1500000)} ریال</span>
        </div>

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="text-xs"> مبلغ قابل پرداخت </label>
          <span className="font-semibold"> {numberWithCommas(1500000)} ریال</span>
        </div>

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="font-semibold bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent"> سود شما از خرید </label>
          <span className="font-semibold bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent"> {numberWithCommas(1500000)} ریال</span>
        </div>
      </div>

      <div className="h-[104px]" />

      <SimplePortal selector="fixed_bottom_portal">
        <footer className="min-h-20 fixed bottom-0 left-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 w-full md:max-w-lg">
          <div className="flex justify-between text-white mb-2">
            <label className="text-sm"> مبلغ قابل پرداخت </label>
            <span className="font-semibold">
              {" "}
              {numberWithCommas(1760000)} ریال{" "}
            </span>
          </div>
          <button
            type="button"
            className="w-full p-3 font-semibold bg-[#a93aff] text-white rounded-full"
          >
            پرداخت {numberWithCommas(1760000)} ریال
          </button>
        </footer>
        <div className="h-20" />
      </SimplePortal>
    </>
  );
}
