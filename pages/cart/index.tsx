'use client'

import React, { useEffect, useState } from 'react'
import CartCard from '@/components/cart/CartCard'
import Tabs from '@/components/ui/Tabs'
// import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
// import { removeFromCart, clearCart } from '@/redux/cartSlice'
// import type { CartState } from '@/redux/cartSlice' 
import { getCart } from '@/actions/cart'


const CartSection: React.FC = () => (
  <div>
    <CartCard />
  </div>
)

const PaymentSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">پرداخت</h2>
  </div>
)

const ConfirmationSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">تایید سفارش</h2>
    <p>می‌توانید تنظیمات سفارش خود را در اینجا بررسی کنید.</p>
  </div>
)


interface TabItem {
  value: string
  label: string
  component: React.ReactNode
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}




const tabItems: TabItem[] = [
  { value: 'cart', label: 'سبد خرید', component: <CartSection /> },
  { value: 'payment', label: 'پرداخت', component: <PaymentSection /> },
  { value: 'confirmation', label: 'تایید سفارش', component: <ConfirmationSection /> },
]


const CartPage: React.FC = () => {
const [cartData, setCartData] = useState<CartItem[]>([]); 
  // const cart = useAppSelector((state) => state.cart) as CartState
  // const { items } = cart;


useEffect(() => {
  const fetchCart = async () => {
    try {
      const result = await getCart();

      if ('data' in result) {
        setCartData(result.data.items);
      } else {
        console.error("Failed to fetch cart:");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  fetchCart();
}, []);
  
  console.log({cartData});
  

  // const total = items.reduce(
  //   (sum, item) => sum + (item?.product?.items[0]?.regularPrice && 0) * item.quantity,
  //   0
  // )

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Tabs items={tabItems} defaultActive="cart" />
      </div>
      {/* <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">سبد خرید شما</h1>
        {items.length === 0 ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p>{item.product.name}</p>
                  <p>
                    {item.product?.items[0]?.regularPrice ?? 0} × {item.quantity} تومان
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500"
                >
                  حذف
                </button>
              </div>
            ))}
            <div className="mt-4 flex justify-between">
              <strong>مجموع: {total} تومان</strong>
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                خالی کردن سبد
              </button>
            </div>
          </div>
        )}
      </div> */}
    </>
  )
}

export default CartPage