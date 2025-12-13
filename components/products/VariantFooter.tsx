/* eslint-disable  @typescript-eslint/no-explicit-any */

import {   GetCartByProductIdType, ProductVariant } from "@/types/commerce";
import { useEffect, useState} from "react";

import SimplePortal from "../shared/layout/SimplePortal";
import { numberWithCommas } from "@/helpers";
import { addDeviceId, setGeneralCartInfo, setGeneralCartLoading } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {  useCartApi } from "@/actions/cart";
import Loading from "../icons/Loading";
import Alert from "../shared/Alert";
import Image from "next/image";
import { useRouter } from "next/router";
import { setProgressLoading } from "@/redux/stylesSlice";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { addDeviceIdToCookie } from "@/helpers/order";
import CaretLeft from "../icons/CaretLeft";
import Plus from "../icons/Plus";
import Minus from "../icons/Minus";
import Trash from "../icons/Trash";

const VariantFooter = ({
  currentVariant,
  productId,
}: {
  currentVariant?: ProductVariant;
  productId: number;
}) => {

  const [cartData, setCartData] = useState<GetCartByProductIdType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const router = useRouter();
  
  const { getCartByProductId, addItem, removeItem, getCart } = useCartApi();


  const dispatch = useAppDispatch();

  const currencyStore = useAppSelector((state) => state.cart.currency);

  const getGeneralCartData = async () => {
    dispatch(setGeneralCartLoading(true));
    const response: any = await getCart();
    if (response?.result) {
      dispatch(setGeneralCartInfo(response.result));
    }
    dispatch(setGeneralCartLoading(false));
  };

  const deviceId = useAppSelector((state) => state.cart?.deviceId);

  const loadCartByProductId = (params?:{deviceId?:string;userToken?:string}) => {

    setLoading(true);

    getCartByProductId({
      productId: productId,
      deviceId: params?.deviceId,
      userToken: params?.userToken
    })
      .then((res) => setCartData(res?.result || null))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCartByProductId();
  }, [deviceId]);

  if (!currentVariant?.items?.[0]) return null;

  const variantItem = currentVariant?.items?.[0];

  const currency =
    getCurrencyLabelFa(cartData?.items?.[0]?.variant.currencyType )||
    getCurrencyLabelFa(variantItem?.currencyType) || getCurrencyLabelFa(currencyStore)

  const handleAddToCart = async () => {  

    setShowSuccessAlert(false);
    const variantId = variantItem?.id;
    if (!variantId) return;

    setLoading(true);

    try {
      const res = await addItem({variantId});

      addDeviceIdToCookie(res?.result?.deviceId);

      dispatch(addDeviceId(res?.result?.deviceId || ""));

      await Promise.all([
        loadCartByProductId({deviceId: res?.result?.deviceId || ""}),
        getGeneralCartData(),
      ]);

      setLoading(false);
      setShowSuccessAlert(true);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!cartData?.items?.length) return;

    const lastCartItem = cartData.items.at(-1);
    if (!lastCartItem) return;

    setLoading(true);
    
    try {
      await removeItem({ Id: lastCartItem.id });
      await Promise.all([
        loadCartByProductId(),
        getGeneralCartData()
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCartStatus = () => {
    if (!cartData || !currentVariant?.items?.[0]?.id)
      return { exists: false, index: null as number | null };

    const index = cartData.items.findIndex(
      (item) => item.variant.id === currentVariant.items?.[0]?.id
    );

    return { exists: index !== -1, index: index !== -1 ? index : null };
  };

  const { exists, index } = getCartStatus();
  const currentCartItem = exists && index !== null ? cartData?.items[index] : null;

  return (
    <>
      {showSuccessAlert && (
        <Alert 
          closable 
          autoClose
          wrapperClassName="fixed bottom-[100px] left-0 right-0 flex justify-center items-center px-4 z-50"
        >
          <div className="flex flex-wrap gap-2 justify-between items-center text-sm">
            <span className="text-gradient-logo-linear">
              کالا به سبد اضافه شد!
            </span>
          <button
            type="button"
            className="w-fit h-full text-neutral-700 text-white flex items-end"
            onClick={async (e) => {
              e.preventDefault();
              dispatch(setProgressLoading(true)); 
              await router.push("/cart");
              dispatch(setProgressLoading(false));
            }}
          >
            <span>برو به سبد خرید</span>
            <CaretLeft className="fill-current w-4 h-4 inline-block align-middle mr-1" />
          </button>
          </div>
        </Alert>
      )}

      <SimplePortal selector="fixed_bottom_portal">
        <footer className="min-h-20 fixed bottom-0 left-0 md:right-1/2 md:translate-x-1/2 text-white bg-[#192a39] px-4 py-3 flex flex-wrap max-[390px]:justify-center justify-between gap-2 items-center w-full md:max-w-lg transition-all duration-200">
          
          {!!cartData?.items.length &&
          cartData.totalQuantity &&
          currentCartItem?.quantity ? (
          <div className="flex items-center gap-2 h-13 bg-[#EFEFF0]/10 rounded-full max-[390px]:w-full max-[390px]:justify-between">
              <button
              className="bg-gradient-to-t from-green-600 to-green-300 hover:bg-gradient-to-tr flex justify-center items-center p-2 h-13 w-13 rounded-full"
                onClick={handleAddToCart}
              >
                <Plus className="w-4 h-4 fill-current" />
              </button>

              <span className="flex justify-center items-center w-[67px]  font-medium">
                {loading ? (
                  <Loading className="fill-current w-5 h-5 animate-spin" />
                ) : (
                  currentCartItem?.quantity || 0
                )}
              </span>

              <button
                className="text-white/70 bg-gradient-to-t hover:bg-gradient-to-tr from-[#00B59C]/10 to-[#9CFFAC]/10 flex justify-center items-center p-2 h-13 w-13 rounded-full"
                onClick={handleRemoveFromCart}
                >
                  {
                    currentCartItem?.quantity  > 1 ? <Minus className="w-4 h-4 fill-current" /> : <Trash className="w-6 h-6 fill-current" />
                  }
              </button>
            </div>
          ) : (
            loading ? (
              <div className="h-10 flex justify-center items-center px-6 bg-gradient-to-t from-green-600 to-green-300 rounded-full">
                <Loading className="fill-current w-5 h-5 animate-spin" />
              </div>
            ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-violet-500 hover:bg-violet-600 text-white rounded-full px-4 py-3 text-xs flex gap-2 items-center font-semibold transition-all duration-200"
            >
              <Image
                src="/images/icons/bag.svg"
                alt="shopping bag"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              افزودن به سبد خرید
            </button>
          ))}

          {((variantItem?.salePrice && variantItem?.regularPrice) ||
            (currentCartItem && currentCartItem.unitPrice)) && (
            <div className="text-left text-white max-[390px]:w-full">
              {variantItem?.profitPercentage && (
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="text-[#fe9f00] text-2xs font-semibold">
                    {!currentCartItem?.totalDiscountAmount ? `${variantItem.profitPercentage} %   تخفیف` : `
                    ${currentCartItem?.totalDiscountAmount} ${currency} تخفیف `}
                  </span>
                  <span className="text-xs text-white/70 line-through">
                    {numberWithCommas(currentCartItem?.totalStrikePrice ?? variantItem.regularPrice ?? 0)} {currency}
                  </span>
                </div>
              )}

              <b className="text-base font-semibold block">
                {currency} {numberWithCommas(currentCartItem?.totalPrice ?? variantItem?.salePrice ?? 0 )}
              </b>
            </div>
          )}
        </footer>
        <div className="h-20" />
      </SimplePortal>
    </>
  );
};

export default VariantFooter;