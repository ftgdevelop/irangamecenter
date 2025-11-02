
import {   GetCartByProductIdType, ProductDetailData, ProductVariant } from "@/types/commerce";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

import SimplePortal from "../shared/layout/SimplePortal";
import { numberWithCommas } from "@/helpers";
import { SelectedVariantLevel } from "./VariantSection";
import { addDeviceId, addQuantity,  removeQuantity } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { addItem, getCartByProductId, removeItem } from "@/actions/cart";

type Props = {
  variant?: ProductVariant;
  level: string;
  onSelectVariant: (variant: ProductVariant, level: number) => void;
  setSelectedVariants: Dispatch<SetStateAction<SelectedVariantLevel[]>>;
  selectedVariants: SelectedVariantLevel[];
  selectedVariantIds: number[] | [];
  productData: ProductDetailData;
};

const VariantItem: React.FC<Props> = ({
  variant,
  level,
  onSelectVariant,
  setSelectedVariants,
  selectedVariants,
  selectedVariantIds,
  productData
}) => {

  // find the first available variant
  const initialVariant = variant?.children?.find(
    (x) => x.items?.[0]?.status !== "OutOfStock"
  );

  const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(
    initialVariant?.id
  );
    const [fade, setFade] = useState(false);

  useEffect(() => {
    setSelectedVariantId(initialVariant?.id);
        setFade(true);
    setTimeout(() => { setFade(false) }, 100)
  }, [initialVariant]);

  const selectedVariant = variant?.children?.find(
    (c) => c.id === selectedVariantId
  );

  // update selected variants for attributes
  useEffect(() => {
    if (selectedVariant) {
      const nextLevel = String(
        Number(selectedVariants[selectedVariants.length - 1]?.level || 0) + 1
      );

      setSelectedVariants((prev) => {
        const existingIndex = prev.findIndex(
          (v) => v.variant.name === selectedVariant.name
        );
        const updated = [...prev];
        if (existingIndex !== -1)
          updated[existingIndex] = { variant: selectedVariant, level: nextLevel };
        else updated.push({ variant: selectedVariant, level: nextLevel });
        return updated;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant]);

  let childElement: ReactNode = null;

  if (selectedVariant?.children?.length) {
    childElement = (
      <VariantItem
        variant={selectedVariant}
        level={level}
        onSelectVariant={onSelectVariant}
        setSelectedVariants={setSelectedVariants}
        selectedVariants={selectedVariants}
        selectedVariantIds={selectedVariantIds}
        productData={productData}
      />
    );
  } else if (selectedVariant?.items?.[0]?.status !== "OutOfStock") {
    childElement = (
      <CartFooter
        selectedVariant={selectedVariant}
        selectedVariants={selectedVariants}
        selectedVariantIds={selectedVariantIds}
        product={productData}
      />
    );
  }

  return (
    <>
      <label className="text-sm pointer-events-none block px-4 mt-7">
        انتخاب {variant?.children?.[0]?.name}
      </label>

        <div className={`max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3 ${fade?"opacity-0":"opacity-100 transition-all duration-100"}`}>

        <div className="flex px-4 gap-3 pt-2">
          {variant?.children?.map((variantItem) => {
            const item = variantItem?.items?.[0];
            const isDisabled = item?.status === "OutOfStock";
            const isBackOrder = item?.status === "OnBackOrder";
            const isSelected = selectedVariantId === variantItem.id;

            return (
              <button
                key={variantItem.id}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && setSelectedVariantId(variantItem.id)}
                className={`relative min-w-40 shrink-0 rounded-xl whitespace-nowrap px-4 min-h-16 outline-none font-semibold py-3 ${
                    isDisabled
                      ? "bg-transparent border border-white/15 cursor-not-allowed"
                      : isSelected
                      ? "bg-gradient-green text-neutral-800 border-0"
                      : "bg-[#192a39] border-0"
                  }`}
              >
                {isDisabled && (
                  <span className="absolute top-0 left-3 -mt-2 bg-gray-400 rounded-full text-black text-[11px] px-2">
                    ناموجود
                  </span>
                )}
                {isBackOrder && (
                  <span className="absolute top-0 left-3 -mt-2 bg-purple-600 rounded-full text-white text-[11px] px-2">
                    پیش خرید
                  </span>
                )}
                {variantItem.value}
                {item?.salePrice && (
                  <div
                    className={`border-t pt-2 mt-2 ${
                      isSelected ? "border-neutral-800" : "border-white/15"
                    }`}
                  >
                    {!!item?.regularPrice && (
                      <div className="text-xs line-through">
                        {numberWithCommas(item.regularPrice)} {item.currencyType}
                      </div>
                    )}
                    <div className="text-sm">
                      {numberWithCommas(item.salePrice)} {item.currencyType}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
          <div className="w-1 h-3 shrink-0" />
        </div>
      </div>

      {childElement}
    </>
  );
};

export default VariantItem;


const CartFooter = ({
  selectedVariant,
  selectedVariants,
  product
}: {
    selectedVariant?: ProductVariant;
    selectedVariants: SelectedVariantLevel[];
    selectedVariantIds: number[] | [];
    product: ProductDetailData;
  }) => {
  const [cartInfo, setCartInfo] = useState<GetCartByProductIdType | null>(null);

  const dispatch = useAppDispatch();
  const deviceId = useAppSelector((state) => state.cart.deviceId);
  const currentClickQuantity = useAppSelector((state) => state.cart.quantity);

  const fetchCartByProductId = () => {
    getCartByProductId(deviceId || "", product.id).then(res => {
      setCartInfo(res?.result || null)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchCartByProductId()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!selectedVariant?.items?.[0]) return null;

  const currency = cartInfo?.items?.[0]?.variant.currencyType;
  const variants = selectedVariants.map((v) => v.variant);  
  console.log({
  cartInfo
});

  
  const handleAddItem = async () => {
    const targetItem = variants.filter(v => v.items && v.items?.length > 0)[0].items?.[0]?.id
    
    dispatch(addQuantity())
    if (targetItem) {
      await addItem({ variantId: targetItem, quantity: currentClickQuantity }, deviceId).then(res => {    

        dispatch(
          addDeviceId(res?.result?.deviceId || "" )
        )
        dispatch(
          removeQuantity(currentClickQuantity)
        )
        fetchCartByProductId()
      }).catch(err => { console.log(err);
      })
    }
  }

  const handleDeleteItem = async () => {
    await removeItem({ Id: product.id }, deviceId).then(( ) => { 
        dispatch(
          removeQuantity(1)
        )
      fetchCartByProductId()
      })
  }

  return (
    <SimplePortal selector="fixed_bottom_portal">
      <footer className="min-h-20 fixed bottom-0 left-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 flex flex-wrap justify-between gap-2 items-center w-full md:max-w-lg transition-all duration-200">
        {!!cartInfo? (
          <div className="flex items-center gap-2 h-10 bg-[#1e3246] rounded-full transition-all duration-300">
            <button
              className="bg-gradient-to-t from-green-600 to-green-300 hover:opacity-90 flex justify-center items-center p-2 h-10 w-10 rounded-full transition-all"
              onClick={() =>
                handleAddItem()
              }
            >
              <Plus size={18} />
            </button>

            <span className="text-base w-4 text-center font-medium text-white">
              {cartInfo.totalQuantity}
            </span>

            <button
              className="bg-gray-700 hover:bg-gray-600 flex justify-center items-center p-2 h-10 w-10 rounded-full transition-all"
              onClick={() => {
                handleDeleteItem()
              }}
            >
              <Trash2 size={18} className="text-white/70" />
            </button>
          </div>
        ) : (
          <button
            type="button"
              onClick={() => {
                handleAddItem()
              }
            }
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
        )}

        <div className="text-left text-white">
          {!!cartInfo && cartInfo.profitAmount && (
            <div className="flex flex-wrap gap-2 mb-1">
              <span className="text-[#fe9f00] text-2xs font-semibold">
                  {cartInfo.profitAmount}% تخفیف
                </span>
              <span className="text-xs text-white/70">
                {numberWithCommas(cartInfo.totalQuantity)} {currency}
              </span>
            </div>
          )}
          {cartInfo && cartInfo.payableAmount && (
            <b className="text-base font-semibold block">
              {numberWithCommas(cartInfo.payableAmount)} {currency}
            </b>
          )}
        </div>
      </footer>

      <div className="h-20" />
    </SimplePortal>
  );
};