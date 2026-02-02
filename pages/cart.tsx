/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useCartApi } from "@/actions/cart";
import CartSection from "@/components/cart/CartSection";
import Steps from "@/components/payment/Steps";
import SimplePortal from "@/components/shared/layout/SimplePortal";
import LoadingFull from "@/components/shared/LoadingFull";
import { numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setGeneralCartInfo, setGeneralCartLoading } from "@/redux/cartSlice";
import { CreateOrderParams } from "@/types/commerce";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CartPage() {

  const { cartGeneralInfo } = useAppSelector((state) => state.cart);
  const userInfo = useAppSelector((state) => state.authentication.user);
  const currencyStore = useAppSelector((state) => state.cart.currency);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createOrder, getCart } = useCartApi();

  const getGeneralCartData = async () => {
    dispatch(setGeneralCartLoading(true));
    const response: any = await getCart();
    if (response?.result) {
      dispatch(setGeneralCartInfo(response.result));
    }
    dispatch(setGeneralCartLoading(false));
  };

  const handleCart = async () => {
      
    setIsSubmitting(true);

    if (!userInfo || !userInfo.lastName) {
      router.push("/checkout");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("Token") : null;

    if (!token) return;

    try {

      let basaCookie ="";
      const cookies = decodeURIComponent(document?.cookie).split(';');
      for (const item of cookies) {
          if (item.includes("basaUserToken=")) {
              basaCookie = item.split("=")[1];
          }
      }

      const params : CreateOrderParams = {
          gender: userInfo?.gender || false,
          email: userInfo?.emailAddress,
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          phoneNumber: userInfo?.phoneNumber
      };

      if ( basaCookie){
          params.metaSearchName = "basa";
          params.metaSearchKey = basaCookie;
      }

      const res: any = await createOrder(params);
               
      const orderId = res.data?.result?.id;
      const orderNumber = res.data?.result?.orderNumber;

      await getGeneralCartData();

      if (orderNumber && orderId) {
        router.push(`/payment?orderNumber=${orderNumber}&orderId=${orderId}`);
      } 
      
    } catch (error) {
      console.error("Error creating order:", error);
      setIsSubmitting(false);
    } finally {
    }
  };

  const currency =
    getCurrencyLabelFa(cartGeneralInfo?.items?.[0]?.variant.currencyType) ||
    getCurrencyLabelFa(currencyStore);

  return (
    <>
      {isSubmitting && (
        <LoadingFull />
      )}
      <Head>
        <title>سبد خرید | فروشگاه</title>
      </Head>
      <Steps activeStepKey="cart" />

      <div className="p-4">
        <CartSection loading={isSubmitting} />
      </div>

      {!!cartGeneralInfo?.items?.length && (
        <SimplePortal selector="fixed_bottom_portal">
          <footer className="min-h-20 fixed bottom-0 z-10 left-0 md:right-1/2 md:translate-x-1/2 bg-white dark:bg-[#192a39] px-4 py-3 flex flex-wrap justify-between gap-2 items-center w-full md:max-w-lg transition-all duration-200">

            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 text-white rounded-full px-4 py-3 text-xs flex gap-2 items-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCart}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت..." : "تایید و ثبت سفارش"}
            </button>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-[#011425] dark:text-gray-300">مبلغ قابل پرداخت</span>
              <span className="font-bold text-lg text-[#011425] dark:text-white">
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