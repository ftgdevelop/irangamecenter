
import { ProductDetailData, ProductVariant } from "@/types/commerce";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { numberWithCommas } from "@/helpers";
import { SelectedVariantLevel } from "./VariantSection";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import CartFooter from "./CartFooter";

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
                        {numberWithCommas(item.regularPrice)} {getCurrencyLabelFa(item.currencyType)}
                      </div>
                    )}
                    <div className="text-sm">
                      {numberWithCommas(item.salePrice)} {getCurrencyLabelFa(item.currencyType)}
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


