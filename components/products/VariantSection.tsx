import { ProductDetailData, ProductVariant } from "@/types/commerce";
import { useState, useEffect, useCallback } from "react";
import VariantItem from "./VariantItem";

type Props = {
  productData: ProductDetailData;
};

export type SelectedVariantLevel = {
  variant: ProductVariant;
  level: string;
};

const VariantSection: React.FC<Props> = ({ productData }) => {
  const [selectedVariantLevels, setSelectedVariantLevels] =
    useState<SelectedVariantLevel[]>([]);

  useEffect(() => {
    const rootVariant = productData.variants?.[0];
    if (rootVariant) {
      setSelectedVariantLevels([{ variant: rootVariant, level: "0" }]);
    }
  }, [productData]);

  const handleSelectVariant = useCallback(
    (variant: ProductVariant, level: number) => {
      setSelectedVariantLevels((prevLevels) => {
        const index = prevLevels.findIndex(
          (entry) => entry.variant.name === variant.name
        );

        const updatedLevel = { variant, level: level.toString() };

        if (index !== -1) {
          const updated = [...prevLevels];
          updated[index] = updatedLevel;
          return updated;
        }

        return [...prevLevels, updatedLevel];
      });
    },
    []
  );

  const rootSelectedVariant = selectedVariantLevels[0]?.variant;
  const selectedVariantIds = selectedVariantLevels.map((s) => s.variant.id);

  return (
    <>
      <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
        انتخاب {productData.variants?.[0]?.name}
      </label>

      <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">
        <div className="flex pr-4">
          {productData.variants?.map((rootVariant) => {
            const isSelected =
              rootSelectedVariant?.slug === rootVariant.slug;

            return (
              <div key={rootVariant.slug} className="pl-3 last:pl-4">
                <button
                  type="button"
                  disabled={!rootVariant.slug}
                  onClick={() => handleSelectVariant(rootVariant, 0)}
                  className={`shrink-0 rounded-xl whitespace-nowrap px-4 h-16 border-0 outline-none font-semibold py-3 ${
                    isSelected
                      ? "bg-gradient-green text-neutral-800"
                      : "bg-[#192a39]"
                  }`}
                >
                  {rootVariant.value}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {rootSelectedVariant && (
        <VariantItem
          variantGroup={rootSelectedVariant}
          level="1"
          updateSelectedVariants={setSelectedVariantLevels}
          onSelectVariant={handleSelectVariant}
          selectedVariantLevels={selectedVariantLevels}
          selectedVariantIds={selectedVariantIds}
          productId={productData.id}
        />
      )}
    </>
  );
};

export default VariantSection;