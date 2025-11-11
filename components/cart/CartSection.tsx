import Image from "next/image";
import CartCard from "./CartCard";
import { useAppSelector } from "@/hooks/use-store";
import Link from "next/link";

const CartSection = () => {
    const { cartGeneralInfo, loading } = useAppSelector((state) => state.cart);
    
      const emptySection = (
        <div className="flex flex-col justify-center items-center ">
          <Image width={90} height={90} src='/images/icons/2color/empty-cart.svg' alt="empty"/>
          <p className="font-extrabold text-xl text-[#FF163E] mt-5">
            سبد خرید شما خالی است!
          </p>
          <Link href={'/'} className="w-full">
          <button className="bg-gradient-to-r from-[#FE4968] to-[#FF9B90] py-[22px] w-full rounded-[100px] mt-[60px] flex gap-3 items-center justify-center">
            <Image width={24} height={24} src='/images/icons/shop-outline.svg' alt="empty"/>
            بازگشت به فروشگاه
          </button>
          </Link>
    
        </div>
      )
    
    const items = cartGeneralInfo && cartGeneralInfo.items;

    const renderCards = items &&  items.map((item) => item && cartGeneralInfo && <CartCard key={item.id} item={item} loading={loading} />);
    
    return items && items.length > 0 && cartGeneralInfo ? <>
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
    </> : emptySection
};

export default CartSection;