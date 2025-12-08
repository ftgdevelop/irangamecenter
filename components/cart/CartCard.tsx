/* eslint-disable  @typescript-eslint/no-explicit-any */

import Image from "next/image";
import React, { useState } from "react";
import {  GetCurrentProductType } from "@/types/commerce";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { addDeviceId, setGeneralCartInfo, setGeneralCartLoading, setLastItemChangedId } from "@/redux/cartSlice";
import Link from "next/link";
import Loading from "../icons/Loading";
import { numberWithCommas } from "@/helpers";
import { useCartApi } from "@/actions/cart";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { addDeviceIdToCookie } from "@/helpers/order";
import Plus from "../icons/Plus";
import Minus from "../icons/Minus";
import Trash from "../icons/Trash";



const CartCard = ({ item, loading } : { item: GetCurrentProductType['items'][number], loading: boolean }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);


  const dispatch = useAppDispatch();
  const lastProductId = useAppSelector((state) => state.cart.lastItemIsChangedId);
  const {  addItem, removeItem, getCart } = useCartApi();
  
  const variantItem = item?.variant;
  const currency = getCurrencyLabelFa(item?.variant.currencyType);
  const productId = item?.id;

  const getGeneralCartData = async () => {
    dispatch(setGeneralCartLoading(true));
    const response: any = await getCart();
    if (response?.result) {
      dispatch(setGeneralCartInfo(response.result));
    }
    dispatch(setGeneralCartLoading(false));
  };    


  const handleAddToCart = async () => {
    const variantId = variantItem?.id;
    if (!variantId) return;

    setIsAdding(true);

    try {
      const res = await addItem({variantId});

      addDeviceIdToCookie(res?.result?.deviceId);
      dispatch(addDeviceId(res?.result?.deviceId || ""));

      dispatch(setLastItemChangedId(productId));
      getGeneralCartData();

    } catch (err) {
      setIsAdding(false);
      throw err
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveFromCart = async () => {

    setIsRemoving(true);
    try {
      await removeItem({ Id: productId});
      dispatch(setLastItemChangedId(productId));
      getGeneralCartData();
    } catch (err) {
      console.error(err);
      setIsRemoving(false);
    } finally {
      setIsRemoving(false);
    }
  };


  return (
    <div className="dark:text-white flex flex-col gap-5 pt-4 justify-between items-center pb-4 border-b border-[#192b39]/50 w-full">
      <div className="flex w-full items-center min-h-[120px] gap-5">
        <Link href={`/product/${item.variant.product.slug}`} className="relative w-[120px] h-[120px] bg-black/25  rounded-[20px]  overflow-hidden" >
                    <Image
            src={item?.variant.product.filePath || "/placeholder.png"}
            alt={item?.variant.product.fileTitleAttribute || "محصول"}
            fill
            className="object-cover rounded-[20px]"
          />
        </Link>
        <div className="flex flex-col justify-between min-h-[120px]">
          <h2 className="font-semibold text-sm md:text-base mt-4">
            {item?.variant.product.name || "محصول"}
          </h2>
          <div className="flex flex-col gap-1">
            {item?.variant.attributes && item?.variant.attributes.length > 0 ? (
              item?.variant.attributes.map((variant,index) => (
                <p key={index} className="text-xs text-gray-600 dark:text-gray-400">
                  {variant}
                </p>
              ))
            ) : (
              <p className="text-xs text-gray-600 dark:text-gray-400">بدون واریانت</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 w-full justify-between">
          <div className="flex items-center h-[42px] bg-[#eeeeee] dark:bg-[#EFEFF0]/10 rounded-full">
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-t from-green-600 to-green-300 hover:bg-gradient-to-tr flex justify-center items-center p-2 h-[42px] w-[42px] rounded-full"
            disabled={isAdding}
          >
            <Plus className="w-4 h-4 fill-current"  />
          </button>
          <span className="flex justify-center items-center w-[67px]  font-medium">
            {isAdding || isRemoving || (loading && lastProductId === productId) ? (
                <Loading className="fill-current text-[#A93AFF] w-5 h-5 animate-spin" />
                ) : (
              item?.quantity || 0
            )}
          </span>
          <button
            onClick={handleRemoveFromCart}
            className="text-[#333333] dark:text-white/70 bg-gradient-to-t hover:bg-gradient-to-tr from-[#dddddd] to-[#aaaaaa] dark:from-[#00B59C]/10 dark:to-[#9CFFAC]/10 flex justify-center items-center p-2 h-[42px] w-[42px] rounded-full"
            disabled={isRemoving}
          >
          {
              item.quantity > 1
                ?
              <Minus className="w-4 h-4 fill-current" />
                :
              <Trash className="w-5 h-5 fill-current" />
          }
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {item.totalDiscountAmount > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              مبلغ با {numberWithCommas(item.totalDiscountAmount)} {(currency)} تخفیف
            </p>
          )}
          {item.totalPrice && (
            <p className="font-bold text-sm">
              {numberWithCommas(item.totalPrice)} {currency}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default CartCard;