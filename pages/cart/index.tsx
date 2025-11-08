import Head from "next/head";
import React from "react";
import CartCard from "@/components/cart/CartCard";
import Tabs from "@/components/ui/Tabs";
import { GetCurrentProductType } from "@/types/commerce";
import { useAppSelector } from "@/hooks/use-store";
import Loading from "@/components/icons/Loading";
import Image from "next/image";
import SimplePortal from "@/components/shared/layout/SimplePortal";



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

  const currency = cartGeneralInfo?.items?.[0]?.variant.currencyType;

  const CartSection = ({ items }: { items: GetCurrentProductType['items'] }) => {
    const renderCards = items.map((item) => item && cartGeneralInfo && <CartCard key={item.id} item={item} loading={loading} />);
    return <>
      <div className="flex items-center justify-between gap-2.5">

        <div className="flex items-center gap-2.5">
        <span className="bg-gradient-to-b from-[#FFE59A] to-[#FFFFD5] bg-clip-text text-transparent leading-8 font-bold">
        سبد خرید شما
      </span>
      {
        items.length && <span className="text-[13px] font-medium">
          {cartGeneralInfo?.totalQuantity}
          محصول
        </span>
      }
      </div>

        <Image src='/images/icons/2color/menu.svg' alt='menu' width='24' height='24' />
      </div>
      {renderCards}
    </>
};
  const tabItems = [
    {
      value: "cart",
      label: "سبد خرید",
      component:
        cartGeneralInfo && cartGeneralInfo?.items.length > 0 ? (
          <CartSection items={cartGeneralInfo.items} />
        ) : null,
    },
    { value: "payment", label: "پرداخت", component: <PaymentSection /> },
    { value: "confirmation", label: "تایید سفارش", component: <ConfirmationSection /> },
  ];

  const pageTitle = `سبد خرید | فروشگاه`;



  return (
    <>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta key="description" name="description" content="سبد خرید فروشگاه" />
      </Head>

      <div className=" text-gray-900 dark:text-gray-100">
        <Tabs items={tabItems} defaultActive="cart" />
      </div>

      <div className="p-6 max-w-3xl  mx-auto">

        {loading ?  <Loading className="fill-current w-32 h-32 animate-spin" />
          :
          !cartGeneralInfo || !cartGeneralInfo.items.length ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
            <div className="mt-4 flex flex-col gap-[30px] justify-between">
               
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#BBBBBB]">
                    قیمت کالاها ({cartGeneralInfo?.totalQuantity})
                  </span>
                  <span className="font-bold">
                    {cartGeneralInfo.totalItemsPrice} {currency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#BBBBBB]">
                    مبلغ قابل پرداخت
                  </span>
                  <span className="font-bold">
                    {cartGeneralInfo.payableAmount} {currency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent font-bold drop-shadow">
                    سود شما از خرید
                  </span>
                  <span className="bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent font-bold drop-shadow">
                    {cartGeneralInfo.profitAmount} {currency}
                  </span>
                </div>
            </div>
        )}
      </div>
        <SimplePortal selector="fixed_bottom_portal">
        <footer className="min-h-20 fixed bottom-0 left-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 flex flex-wrap max-[390px]:justify-center justify-between gap-2 items-center w-full md:max-w-lg transition-all duration-200">
          BUTTON
        </footer>
        <div className="h-20" />
      </SimplePortal>
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