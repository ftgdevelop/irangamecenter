import Head from "next/head";
import React from "react";
import Tabs from "@/components/ui/Tabs";
import { useAppSelector } from "@/hooks/use-store";
import SimplePortal from "@/components/shared/layout/SimplePortal";
import { useRouter } from "next/router";
import { numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import ProfileSection from "@/components/cart/ProfileSection";
import CartSection from "@/components/cart/CartSection";
import LoginSection from "@/components/cart/LoginSection";



const PaymentSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">پرداخت</h2>
  </div>
);

const ConfirmationSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">تایید سفارش</h2>
    <p>می‌توانید تنظیمات سفارش خود را در اینجا بررسی کنید.</p>
  </div>
);



const CartPage = () => {
  const { cartGeneralInfo, loading } = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector(
      (state) => state.authentication.isAuthenticated,
  );
  const userInfo = useAppSelector((state) => state.authentication.user);

  const getUserLoading = useAppSelector((state) => state.authentication.getUserLoading);

  const currencyStore = useAppSelector((state) => state.cart.currency);

  const router = useRouter();

  const currency = getCurrencyLabelFa(cartGeneralInfo?.items?.[0]?.variant.currencyType) || getCurrencyLabelFa(currencyStore);

  const tabItems = [
    {
      value: "cart",
      label: "سبد خرید",
      component: <CartSection />,
      show:true,
    },
    {
      value: "profile", label: "اطلاعات کاربر", component: isAuthenticated ? <ProfileSection /> : <LoginSection />, show: !!(userInfo && !userInfo?.firstName && !userInfo?.lastName) || !isAuthenticated,
    }  ,
    { value: "payment", label: "پرداخت", component: <PaymentSection />, show:true},
    { value: "confirmation", label: "تایید سفارش", component: <ConfirmationSection />, show:true,
    },
  ];

  const pageTitle = `سبد خرید | فروشگاه`;

  const handleCart = () => {
    if (isAuthenticated) {
      return null
    } else {
      router.push("/login")
    }
  }

  return (
    <>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta key="description" name="description" content="سبد خرید فروشگاه" />
      </Head>

      <div className="text-gray-900 dark:text-gray-100">
        <Tabs items={tabItems} defaultActive="cart" loading={getUserLoading} />
      </div>

      <div className="p-6 max-w-3xl  mx-auto">

      <div
        className={`transition-opacity duration-700 ease-in-out ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {!cartGeneralInfo || !cartGeneralInfo.items.length ? null : (
          <div className="mt-4 flex flex-col gap-[30px] justify-between">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#BBBBBB]">
                قیمت کالاها ({cartGeneralInfo?.totalQuantity})
              </span>
              <span className="font-bold">
                {numberWithCommas(cartGeneralInfo.totalItemsPrice)} {currency}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#BBBBBB]">
                مبلغ قابل پرداخت
              </span>
              <span className="font-bold">
                {numberWithCommas(cartGeneralInfo.payableAmount)} {currency}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent font-bold drop-shadow">
                سود شما از خرید
              </span>
              <span className="bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent font-bold drop-shadow">
                {numberWithCommas(cartGeneralInfo.profitAmount)} {currency}
              </span>
            </div>
          </div>
        )}
      </div>
      </div>
      {
        cartGeneralInfo && cartGeneralInfo.items && cartGeneralInfo.items.length ? <SimplePortal selector="fixed_bottom_portal">
        <footer className="min-h-20 fixed bottom-0 left-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 flex flex-wrap justify-between gap-2 items-center w-full md:max-w-lg transition-all duration-200">
          <button
            type="button"
            className="bg-violet-500 hover:bg-violet-600 text-white rounded-full px-[30px] py-[17px] max-[390px]:px-3 max-[390px]:text-sm  flex gap-2 items-center font-semibold transition-all duration-200"
            onClick={handleCart}
          >
            تایید و ثبت سفارش
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
      : null}

    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      initialTitle: "سبد خرید | فروشگاه",
    },
  };
};

export default CartPage;