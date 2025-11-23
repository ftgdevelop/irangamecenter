import { numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { useAppSelector } from "@/hooks/use-store";
import Image from "next/image";
import Link from "next/link";
import CartCard from "./CartCard";

const CartSection = () => {
  const { cartGeneralInfo, loading, error } = useAppSelector((state) => state.cart);
  const currencyStore = useAppSelector((state) => state.cart.currency);

  const currency =
    getCurrencyLabelFa(cartGeneralInfo?.items?.[0]?.variant.currencyType) ||
    getCurrencyLabelFa(currencyStore);

  const items = cartGeneralInfo?.items;

  const shouldShowEmpty =
    !loading && (!cartGeneralInfo || !Array.isArray(items) || items.length === 0);

  const shouldShowError = !loading && error;

  const emptySection = (
    <div className="flex flex-col justify-center items-center ">
      <Image width={90} height={90} src="/images/icons/2color/empty-cart.svg" alt="empty" />
      <p className="font-extrabold text-xl text-[#FF163E] mt-5">سبد خرید شما خالی است!</p>
      <Link href={"/"} className="w-full">
        <button className="bg-gradient-to-r from-[#FE4968] to-[#FF9B90] py-[22px] w-full rounded-[100px] mt-[60px] flex gap-3 items-center justify-center">
          <Image width={24} height={24} src="/images/icons/shop-outline.svg" alt="empty" />
          بازگشت به فروشگاه
        </button>
      </Link>
    </div>
  );

  const errorSection = (
    <div className="flex flex-col justify-center items-center ">
      <p className="font-extrabold text-xl text-red-500 mt-5">خطا در دریافت اطلاعات سبد خرید</p>
      <p className="text-sm text-gray-400 mt-2">{String(error)}</p>
    </div>
  );

  if (shouldShowError) return errorSection;
  if (shouldShowEmpty) return emptySection;

  const renderCards =
    items?.map((item) => item && cartGeneralInfo && <CartCard key={item.id} item={item} loading={loading} />);

  return (
    <>
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="bg-gradient-to-b from-[#FFE59A] to-[#FFFFD5] bg-clip-text text-transparent leading-8 font-bold">
            سبد خرید شما
          </span>
          {items && items.length && (
            <span className="text-[13px] font-medium">
              {cartGeneralInfo?.totalQuantity}
              محصول
            </span>
          )}
        </div>

        <Image src="/images/icons/2color/menu.svg" alt="menu" width="24" height="24" />
      </div>

      {renderCards}

      <div
        className={`transition-opacity duration-700 ease-in-out ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {!!cartGeneralInfo?.items?.length && (
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
              <span className="font-semibold text-sm text-[#BBBBBB]">مبلغ قابل پرداخت</span>
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
    </>
  );
};

export default CartSection;