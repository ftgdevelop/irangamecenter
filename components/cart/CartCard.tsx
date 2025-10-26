import Image from 'next/image'
import React from 'react'
import { Trash2, Plus } from 'lucide-react'

const CartCard = () => {
  return (
    <div className=" text-white flex flex-col gap-6 justify-between items-center pb-4 border-b border-[#192b39]/50 w-full ">
      <div className="flex w-full items-center h-28 gap-4">
        <div className="relative w-28 h-28 bg-black/25  rounded-lg overflow-hidden">
          <Image
            src="/apple-touch-icon.png"
            alt="EA SPORTS FC 25"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
            <h2 className="font-semibold text-sm md:text-base mt-4">بازی EA SPORTS FC ۲۵</h2>
            <div className='flex flex-col gap-1'>     
            <p className="text-xs text-gray-400">بازی برای پلی استیشن 5</p>
            <p className="text-xs text-gray-400">ظرفیت 2</p>
            </div>
        </div>
      </div>

        <div className="flex w-full justify-between">
            <div className='flex flex-col gap-1'>        
                <p className="text-xs text-gray-400 mb-1">مبلغ با   ۱۰۰،۰۰۰ تومان تخفیف</p>
                <p className="font-bold text-sm">۵,۹۰۰,۰۰۰ تومان</p>
            </div>
              <div className="flex items-center gap-2 h-10  bg-[#192b39] rounded-full">
                <button className=" bg-gradient-to-t from-green-600 to-green-300 hover:bg-gradient-to-tr  flex justify-center items-center p-2 h-10 w-10 rounded-full ">
                    <Plus size={18} />
                </button>
                <span className="text-base w-4 text-center font-medium">۱</span>
                <button className="bg-gray-700 flex justify-center items-center p-2 h-10 w-10 rounded-full hover:bg-gray-600">
                    <Trash2 size={18} className='text-white/70'/>
                </button>
            </div>
      </div>
    </div>
  )
}

export default CartCard