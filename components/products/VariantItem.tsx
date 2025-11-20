import { ProductDetailData, ProductVariant } from "@/types/commerce";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from "react";
import { numberWithCommas } from "@/helpers";
import { SelectedVariantLevel } from "./VariantSection";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import CartFooter from "./CartFooter";

type VariantItemProps = {
  variantGroup?: ProductVariant;
  level: string;
  onSelectVariant: (variant: ProductVariant, level: number) => void;
  updateSelectedVariants: Dispatch<SetStateAction<SelectedVariantLevel[]>>;
  selectedVariantLevels: SelectedVariantLevel[];
  selectedVariantIds: number[];
  product: ProductDetailData;
};

const VariantItem: React.FC<VariantItemProps> = ({
  variantGroup,
  level,
  onSelectVariant,
  updateSelectedVariants,
  selectedVariantLevels,
  selectedVariantIds,
  product,
}) => {
  const firstAvailableChild = useMemo(() => {
    return variantGroup?.children?.find(
      (child) => child.items?.[0]?.status !== "OutOfStock"
    );
  }, [variantGroup]);

  const [currentVariantId, setCurrentVariantId] = useState<number | undefined>(
    firstAvailableChild?.id
  );
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setCurrentVariantId(firstAvailableChild?.id);

    setIsFading(true);
    const timer = setTimeout(() => setIsFading(false), 100);

    return () => clearTimeout(timer);
  }, [firstAvailableChild]);

  const currentVariant = useMemo(() => {
    if (!variantGroup) return undefined;

    if (!variantGroup.children?.length) return variantGroup;

    return variantGroup.children.find((c) => c.id === currentVariantId);
  }, [variantGroup, currentVariantId]);

  useEffect(() => {
    if (!currentVariant) return;

    const nextLevel =
      String(
        Number(
          selectedVariantLevels[selectedVariantLevels.length - 1]?.level || 0
        ) + 1
      );

    updateSelectedVariants((prev) => {
      const index = prev.findIndex(
        (entry) => entry.variant.name === currentVariant.name
      );

      const updated = [...prev];

      if (index !== -1) {
        updated[index] = { variant: currentVariant, level: nextLevel };
      } else {
        updated.push({ variant: currentVariant, level: nextLevel });
      }

      return updated;
    });
  }, [currentVariant]);

  /** next step (recursive or footer) */
  const renderNestedOrFooter = () => {
    if (currentVariant?.children?.length) {
      return (
        <VariantItem
          variantGroup={currentVariant}
          level={level}
          onSelectVariant={onSelectVariant}
          updateSelectedVariants={updateSelectedVariants}
          selectedVariantLevels={selectedVariantLevels}
          selectedVariantIds={selectedVariantIds}
          product={product}
        />
      );
    }

    if (currentVariant?.items?.[0]?.status !== "OutOfStock") {
      return (
        <CartFooter
          selectedVariant={currentVariant}
          selectedVariants={selectedVariantLevels}
          product={product}
        />
      );
    }

    return null;
  };

  return (
    <>
      {variantGroup?.children && (
        <>
          <label className="text-sm pointer-events-none block px-4 mt-7">
            انتخاب {variantGroup?.children?.[0]?.name}
          </label>

          <div
            className={`max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3 ${
              isFading ? "opacity-0" : "opacity-100 transition-all duration-100"
            }`}
          >
            <div className="flex px-4 gap-3 pt-2">
              {variantGroup.children.map((child) => {
                const item = child.items?.[0];
                const disabled = item?.status === "OutOfStock";
                const isBackOrder = item?.status === "OnBackOrder";
                const isSelected = currentVariantId === child.id;

                return (
                  <button
                    key={child.id}
                    disabled={disabled}
                    onClick={() =>
                      !disabled && setCurrentVariantId(child.id)
                    }
                    className={`relative min-w-40 shrink-0 rounded-xl whitespace-nowrap px-4 min-h-16 outline-none font-semibold py-3 ${
                      disabled
                        ? "bg-transparent border border-white/15 cursor-not-allowed"
                        : isSelected
                        ? "bg-gradient-green text-neutral-800"
                        : "bg-[#192a39]"
                    }`}
                  >
                    {disabled && (
                      <span className="absolute top-0 left-3 -mt-2 bg-gray-400 rounded-full text-black text-[11px] px-2">
                        ناموجود
                      </span>
                    )}

                    {isBackOrder && (
                      <span className="absolute top-0 left-3 -mt-2 bg-purple-600 rounded-full text-white text-[11px] px-2">
                        پیش خرید
                      </span>
                    )}

                    {child.value}

                    {item?.salePrice && (
                      <div
                        className={`border-t pt-2 mt-2 ${
                          isSelected
                            ? "border-neutral-800"
                            : "border-white/15"
                        }`}
                      >
                        {!!item.regularPrice && (
                          <div className="text-xs line-through">
                            {numberWithCommas(item.regularPrice)}{" "}
                            {getCurrencyLabelFa(item.currencyType)}
                          </div>
                        )}

                        <div className="text-sm">
                          {numberWithCommas(item.salePrice)}{" "}
                          {getCurrencyLabelFa(item.currencyType)}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}

              <div className="w-1 h-3 shrink-0" />
            </div>
          </div>
        </>
      )}

      {renderNestedOrFooter()}
    </>
  );
};

export default VariantItem;