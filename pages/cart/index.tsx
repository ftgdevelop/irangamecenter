import Head from "next/head";
import React, { useEffect, useState } from "react";
import CartCard from "@/components/cart/CartCard";
import Tabs from "@/components/ui/Tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { removeFromCart, clearCart, CartItem } from "@/redux/cartSlice";
import { getCart } from "@/actions/cart";
import { RootState } from "@/redux";

const CartSection = ({ items }: { items: CartItem[] }) => {
  return items.map((item) => <CartCard key={item.productId} item={item} />);
};

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
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.cart.items);
  const [cartData, setCartData] = useState<unknown[]>([]);

  const tabItems = [
    { value: "cart", label: "سبد خرید", component: <CartSection items={items} /> },
    { value: "payment", label: "پرداخت", component: <PaymentSection /> },
    { value: "confirmation", label: "تایید سفارش", component: <ConfirmationSection /> },
  ];

  const pageTitle = `سبد خرید | فروشگاه`;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await getCart();
        if ("data" in result) {
          setCartData(result.data.items);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchCart();
  }, []);

  const total = items.reduce((sum, item) => {
    const priceInfo =  item.variants?.filter(v => v.items && v.items?.length > 0) 
    const price = priceInfo?.[0]?.items?.[0]?.regularPrice ?? 0;
    return sum + price * item.quantity;
  }, 0);

  console.log({cartData});
  

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

        {items.length === 0 ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          <div>
            {items.map((item) => {
              const regularPrice =
                item.variants
                  ?.filter((v) => v.items && v.items.length > 0)?.[0]
                  ?.items?.[0].regularPrice ?? 0;

              return (
                <div
                  key={item.productId}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p>{item.product.name}</p>
                    <p>
                      {regularPrice.toLocaleString()} × {item.quantity} تومان
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(removeFromCart({ product: item.product }))
                    }
                    className="text-red-500"
                  >
                    حذف
                  </button>
                </div>
              );
            })}

            <div className="mt-4 flex justify-between">
              <strong>مجموع: {total.toLocaleString()} تومان</strong>
              <button
                onClick={() => dispatch(clearCart())}
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