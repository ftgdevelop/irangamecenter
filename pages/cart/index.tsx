import Head from "next/head";
import React, { useEffect, useState } from "react";
import CartCard, { CartGeneralInfo } from "@/components/cart/CartCard";
import Tabs from "@/components/ui/Tabs";
import { getCart } from "@/actions/cart";
import { ProductDetailData } from "@/types/commerce";
import { useAppSelector } from "@/hooks/use-store";



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
  const [cartData, setCartData] = useState<ProductDetailData[] | undefined>(undefined);
  const [cartGeneralInfo, setCartGeneralInfo] = useState<CartGeneralInfo | undefined>(undefined);
  const deviceId = useAppSelector((state) => state.cart.deviceId);


  const CartSection = ({ items }: { items: ProductDetailData[] }) => {
  return items.map((item) => item && cartGeneralInfo && <CartCard key={item.id} item={item} cartGeneralInfo={cartGeneralInfo}/>);
};
  const tabItems = [
    {
      value: "cart",
      label: "سبد خرید",
      component:
        cartData && cartData?.length > 0 ? (
          <CartSection items={cartData} />
        ) : null,
    },
    { value: "payment", label: "پرداخت", component: <PaymentSection /> },
    { value: "confirmation", label: "تایید سفارش", component: <ConfirmationSection /> },
  ];

  const pageTitle = `سبد خرید | فروشگاه`;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await getCart(deviceId);
        if ("data" in result) {
          setCartGeneralInfo(result?.result);
          setCartData(result?.result?.items);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchCart();
  }, []);



  const handleClearCart = async () => {
    return null
  };

  const handleDeleteItem = async () => {
      return null
  };


  return (
    <>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta key="description" name="description" content="سبد خرید فروشگاه" />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Tabs items={tabItems} defaultActive="cart" />
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">سبد خرید شما</h1>

        {!cartData || !cartData.length ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          <div>
            {cartData?.length > 0 &&
              cartData.map((item: ProductDetailData) => {
                const targetItem = item.variants?.filter(v=>v.items)?.[0].items?.[0]
                return (
                  <div
                    key={item?.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p>{item?.name}</p>
                      <p>
                        {item.toLocaleString()} × {targetItem?.salePrice ?? 0} تومان
                      </p>
                    </div>
                    <button onClick={handleDeleteItem} className="text-red-500">
                      حذف
                    </button>
                  </div>
                );
              })}

            <div className="mt-4 flex justify-between">
              <strong>مجموع: {cartGeneralInfo?.totalItemsPrice?? 0} تومان</strong>
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                خالی کردن سبد
              </button>
            </div>
          </div>
        )}
      </div>
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