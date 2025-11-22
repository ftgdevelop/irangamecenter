import { useCartApi } from "@/actions/cart";
import CartSection from "@/components/cart/CartSection";
import LoginSection from "@/components/cart/LoginSection";
import ProfileSection from "@/components/cart/ProfileSection";
import SimplePortal from "@/components/shared/layout/SimplePortal";
import { numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import {  useAppSelector } from "@/hooks/use-store";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WizardTabs from "@/components/ui/WizardTabs";
import PaymentSection from "./PaymentSection";
import ConfirmationSection from "./ConfirmationSection";

export type CartTab = "cart" | "profile" | "payment" | "confirmation";

interface CartPageProps {
  tab: CartTab;
}

const CartPage = ({ tab }: CartPageProps) => {
  const router = useRouter();

  const { cartGeneralInfo } = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  const userInfo = useAppSelector((state) => state.authentication.user);
  const getUserLoading = useAppSelector((state) => state.authentication.getUserLoading);
  const currencyStore = useAppSelector((state) => state.cart.currency);

  const { createOrder } = useCartApi();

  const [activeTab, setActiveTab] = useState<CartTab>(tab);
  const [isSubmitting, setIsSubmitting] = useState(false);  

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const currency =
    getCurrencyLabelFa(cartGeneralInfo?.items?.[0]?.variant.currencyType) ||
    getCurrencyLabelFa(currencyStore);


  const handleCart = async () => {
    if (isAuthenticated) {
      const token = typeof window !== "undefined" ? localStorage.getItem("Token") : null;
      if (!token) return;

      try {
        setIsSubmitting(true);
        await createOrder(token, userInfo);
      } catch (error) {
        console.error("Error creating order:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      router.push("/cart/profile");
    }
  };

  const handleLoginSuccess = () => {
    router.push("/cart/cart");
  };

  const tabItems = [
    {
      value: "cart",
      label: "سبد خرید",
      component: <CartSection />,
      show: true,
    },
    {
      value: "profile",
      label: "اطلاعات کاربر",
      component: isAuthenticated ? (
        <ProfileSection />
      ) : (
        <LoginSection onLoginSuccess={handleLoginSuccess} />
      ),
      show:
        !isAuthenticated ||
        !!(userInfo && !userInfo?.firstName && !userInfo?.lastName),
    },
    { value: "payment", label: "پرداخت", component: <PaymentSection />, show: true },
    {
      value: "confirmation",
      label: "تایید سفارش",
      component: <ConfirmationSection />,
      show: true,
    },
  ];

  return (
    <>
      <Head>
        <title key="title">سبد خرید | فروشگاه</title>
        <meta key="description" name="description" content="سبد خرید فروشگاه" />
      </Head>

      <div className="text-gray-900 dark:text-gray-100">
        <WizardTabs items={tabItems} activeTab={activeTab} loading={getUserLoading} />
      </div>

      {activeTab === "cart" &&
      cartGeneralInfo?.items &&
      cartGeneralInfo.items.length > 0 ? (
        <SimplePortal selector="fixed_bottom_portal">
          <footer className="min-h-20 fixed bottom-0 z-10 left-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 flex flex-wrap justify-between gap-2 items-center w-full md:max-w-lg transition-all duration-200">
            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 text-white rounded-full px-[30px] py-[17px] max-[390px]:px-3 max-[390px]:text-sm flex gap-2 items-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCart}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت..." : "تایید و ثبت سفارش"}
            </button>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-300 ml-2">مبلغ قابل پرداخت</span>
              <span className="font-bold text-lg">
                {numberWithCommas(cartGeneralInfo?.payableAmount) || 0} {currency}
              </span>
            </div>
          </footer>
          <div className="h-20" />
        </SimplePortal>
      ) : null}
    </>
  );
};

export default CartPage;
