import Image from "next/image";
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { addItem, removeItem } from "@/actions/cart";
import {  GetCurrentProductType } from "@/types/commerce";



const CartCard = ({ item } : { item: GetCurrentProductType['items'][number]}) => {
  const [isLoadingAddItem, setIsLoadingAddItem] = useState(false);
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] = useState(false);

  const variants = item?.variant;
  const currency = item?.variant.currencyType;


  const handleAddItem = async () => {
    setIsLoadingAddItem(true);
    const targetItem = item?.variant?.variantAttributeValues && item?.variant?.variantAttributeValues?.[0]?.variantId
    if (targetItem && variants) {
      await addItem({ variantId: targetItem, quantity: 1 }).finally(() => {
        setIsLoadingAddItem(false);
      });
    }
  };

  const handleDeleteItem = async () => {
    setIsLoadingDeleteItem(true);
    const targetItem = item?.variant?.variantAttributeValues && item?.variant?.variantAttributeValues?.[0]?.variantId
    if (targetItem && variants) {
      await removeItem({ Id: targetItem }).finally(() => {
        setIsLoadingDeleteItem(false);
      });
    }
  };


  return (
    <div className="text-white flex flex-col gap-6 pt-4 justify-between items-center pb-4 border-b border-[#192b39]/50 w-full">
      <div className="flex w-full items-center min-h-28 gap-4">
        <div className="relative w-28 h-28 bg-black/25 rounded-lg overflow-hidden">
          <Image
            src={item?.variant.product.filePath || "/placeholder.png"}
            alt={item?.variant.product.fileTitleAttribute || "محصول"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <h2 className="font-semibold text-sm md:text-base mt-4">
            {item?.variant.product.name || "محصول"}
          </h2>
          <div className="flex flex-col gap-1">
            {item?.variant.variantAttributeValues && item?.variant.variantAttributeValues.length > 0 ? (
              item?.variant.variantAttributeValues.map((variant) => (
                <p key={variant.id} className="text-xs text-gray-400">
                  {variant.name}
                </p>
              ))
            ) : (
              <p className="text-xs text-gray-400">بدون واریانت</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          {item.variant.regularPrice > item.variant.salePrice && (
            <p className="text-xs text-gray-400 mb-1">
              مبلغ با {item.variant.regularPrice - item.variant.salePrice} {currency} تخفیف
            </p>
          )}
          {item.variant.salePrice && (
            <p className="font-bold text-sm">
              {item.variant.salePrice} {currency}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 h-10 bg-[#192b39] rounded-full">
          <button
            onClick={handleAddItem}
            className="bg-gradient-to-t from-green-600 to-green-300 hover:bg-gradient-to-tr flex justify-center items-center p-2 h-10 w-10 rounded-full"
            disabled={isLoadingAddItem}
          >
            <Plus size={18} />
          </button>
          <span className="text-base w-4 text-center font-medium">
            {item.quantity}
          </span>
          <button
            onClick={handleDeleteItem}
            className="bg-gray-700 flex justify-center items-center p-2 h-10 w-10 rounded-full hover:bg-gray-600"
            disabled={isLoadingDeleteItem}
          >
            <Trash2 size={18} className="text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;