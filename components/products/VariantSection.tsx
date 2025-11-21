import { ProductDetailData, ProductVariant } from "@/types/commerce";
import { useState } from "react";
import VariantItem from "./VariantItem";

type Props = {
  productData: ProductDetailData;
};

export type SelectedVariantLevel = ProductVariant | undefined;


const VariantSection: React.FC<Props> = ({ productData }) => {
  const [selectedVariantLevels, setSelectedVariantLevels] =
    useState < SelectedVariantLevel[]>([ productData.variants?.[0]]);

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariantLevels([variant]);
  };

  const rootSelectedVariant = selectedVariantLevels[0];

  return (
    <>
      <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
        انتخاب {productData.variants?.[0]?.name}
      </label>

      <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">
        <div className="flex pr-4">
          {productData.variants?.map((rootVariant) => {
            const isSelected = rootSelectedVariant?.slug === rootVariant.slug;

            return (
              <div key={rootVariant.slug} className="pl-3 last:pl-4">
                <button
                  type="button"
                  disabled={!rootVariant.slug}
                  onClick={() => handleSelectVariant(rootVariant)}
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
          productId={productData.id}
        />
      )}
    </>
  );
};

export default VariantSection;