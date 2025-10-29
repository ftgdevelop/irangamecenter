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
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariantLevel[]>([]);

  useEffect(() => {
    if (productData.variants?.length) {
      const first = productData.variants[0];
      setSelectedVariants([{ variant: first, level: "0" }]);
    }
  }, [productData]);

const handleSelectVariant = useCallback((variant: ProductVariant, level: number) => {
  setSelectedVariants(prev => {
    const existingLevelIndex = prev.findIndex(v =>  v.variant.name === variant.name);

    if (existingLevelIndex !== -1) {
      const updated = [...prev];
      updated[existingLevelIndex] = { variant, level: level.toString() };
      return updated;
    } else {
      return [...prev, { variant, level: level.toString() }];
    }
  });
}, []);

    const selectedVariant = selectedVariants[0]?.variant;
    
console.log({selectedVariants});


  return (
    <>
      <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
        انتخاب {productData.variants?.[0]?.name}
      </label>

      <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">
        <div className="flex pr-4">
          {productData.variants?.map((variantItem) => {
            const isSelected = selectedVariant?.slug === variantItem.slug;
            return (
              <div key={variantItem.slug} className="pl-3 last:pl-4">
                <button
                  type="button"
                  className={`shrink-0 rounded-xl whitespace-nowrap px-4 h-16 border-0 outline-none font-semibold py-3 
                    ${isSelected ? "bg-gradient-green text-neutral-800" : "bg-[#192a39]"}`}
                  disabled={!variantItem.slug}
                  onClick={() => handleSelectVariant(variantItem, 0)}
                >
                  {variantItem.value}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedVariant && (
        <VariantItem
            variant={selectedVariant}
            level={"1"}
            setSelectedVariants={setSelectedVariants}
            onSelectVariant={handleSelectVariant}
            selectedVariants={selectedVariants}
        />
      )}
    </>
  );
};

export default VariantSection;