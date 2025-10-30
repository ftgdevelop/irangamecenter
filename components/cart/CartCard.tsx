import Image from 'next/image'
import React from 'react'
import { Trash2, Plus } from 'lucide-react'
import { CartItem } from '@/redux/cartSlice'

const CartCard = ({ item }: { item: CartItem }) => {
  const currency = item.variants?.filter(v => v.items && v.items?.length > 0)?.[0].items?.[0].currencyType;
  const regularPrice = item.variants?.filter(v => v.items && v.items?.length > 0)?.[0].items?.[0].regularPrice;
  const salePrice = item.variants?.filter(v => v.items && v.items?.length > 0)?.[0].items?.[0].salePrice;
  const profitPercentage = item.variants?.filter(v => v.items && v.items?.length > 0)?.[0].items?.[0].profitPercentage;

  console.log({
    p: item.product,
    v: item.variants
  });
  
  return (
    <div className=" text-white flex flex-col gap-6 pt-4 justify-between items-center pb-4 border-b border-[#192b39]/50 w-full ">
      <div className="flex w-full items-center min-h-28 gap-4">
        <div className="relative w-28 h-28 bg-black/25  rounded-lg overflow-hidden">
          <Image
            src={item.product?.filePath || '/placeholder.png'}
            alt={item.product?.fileTitleAttribute || 'محصول'}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
            <h2 className="font-semibold text-sm md:text-base mt-4">{item.product?.name || 'محصول'}</h2>
            <div className='flex flex-col gap-1'>
            {
              item.variants && item.variants.length > 0 ? (
                item.variants.map((variant) => (
                  <p key={variant.id} className="text-xs text-gray-400">
                    {variant.name}
                  </p>
                ))
              ) : (
                <p className="text-xs text-gray-400">بدون واریانت</p>
              )
              }     
            </div>
        </div>
      </div>

        <div className="flex w-full justify-between">
        <div className='flex flex-col gap-1'>        
          {
            profitPercentage &&                 <p className="text-xs text-gray-400 mb-1">مبلغ  با   {profitPercentage} تومان تخفیف</p>

          }
                    {
            regularPrice &&                           <p className="font-bold text-sm">{salePrice} { currency}</p>


          }
        </div>


              <div className="flex items-center gap-2 h-10  bg-[#192b39] rounded-full">
                <button className=" bg-gradient-to-t from-green-600 to-green-300 hover:bg-gradient-to-tr  flex justify-center items-center p-2 h-10 w-10 rounded-full ">
                    <Plus size={18} />
                </button>
          <span className="text-base w-4 text-center font-medium">
            {item.quantity}
                </span>
                <button className="bg-gray-700 flex justify-center items-center p-2 h-10 w-10 rounded-full hover:bg-gray-600">
                    <Trash2 size={18} className='text-white/70'/>
                </button>
            </div>
      </div>
    </div>
  )
}

export default CartCard