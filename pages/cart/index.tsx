/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useCartApi } from "@/actions/cart";
import CartSection from "@/components/cart/CartSection";
import Steps from "@/components/payment/Steps";
import SimplePortal from "@/components/shared/layout/SimplePortal";
import { numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { useAppSelector } from "@/hooks/use-store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CartPage() {

  const { cartGeneralInfo } = useAppSelector((state) => state.cart);
  const userInfo = useAppSelector((state) => state.authentication.user);
  const currencyStore = useAppSelector((state) => state.cart.currency);

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createOrder } = useCartApi();

  const handleCart = async () => {
      
    setIsSubmitting(true);

    if (!userInfo || !userInfo.lastName) {
      router.push("/checkout");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("Token") : null;

    if (!token) return;

    try {
      const res: any = await createOrder(userInfo);
            
      debugger;

      const orderId = res.data?.result?.id;
      const orderNumber = res.data?.result?.orderNumber;

      if (orderNumber && orderId) {
      router.push(`/payment?orderNumber=${orderNumber}&orderId=${orderId}`);
      } 
      
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currency =
    getCurrencyLabelFa(cartGeneralInfo?.items?.[0]?.variant.currencyType) ||
    getCurrencyLabelFa(currencyStore);

  return (
    <>
      <Head>
        <title>سبد خرید | فروشگاه</title>
      </Head>
      <Steps activeStepKey="cart" />

      <div className="p-4">
        <CartSection />
      </div>

      {!!cartGeneralInfo?.items?.length && (
        <SimplePortal selector="fixed_bottom_portal">
          <footer className="min-h-20 fixed bottom-0 z-10 left-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 flex flex-wrap justify-between gap-2 items-center w-full md:max-w-lg transition-all duration-200">

            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 text-white rounded-full px-4 py-3 text-xs flex gap-2 items-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCart}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت..." : "تایید و ثبت سفارش"}
            </button>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-gray-300">مبلغ قابل پرداخت</span>
              <span className="font-bold text-lg text-white">
                {numberWithCommas(cartGeneralInfo?.payableAmount) || 0}{" "}
                {currency}
              </span>
            </div>
          </footer>
          <div className="h-20" />
        </SimplePortal>
      )}
    </>
  );
}