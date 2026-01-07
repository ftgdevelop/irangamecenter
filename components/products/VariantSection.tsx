import { PlatformSlugTypes, ProductVariant } from "@/types/commerce";
import { useEffect, useState } from "react";
import VariantItem from "./VariantItem";

type Props = {
  productId: number;
  productVariants: ProductVariant[];
  platform?: PlatformSlugTypes;
};

const VariantSection: React.FC<Props> = ({ productId, productVariants, platform }) => {
  
  const [selectedVariant, setSelectedVariant] = useState < ProductVariant>(productVariants[0]);

  const isPlatform = productVariants[0]?.name?.toLowerCase() === "platform";

  useEffect(()=>{
    if(isPlatform && platform){
      const activePlatform = productVariants.find(x => x.slug === platform);
      if(activePlatform){
        setSelectedVariant(activePlatform);
      }
    }
  },[isPlatform, platform])

  return (
    <>
      {(isPlatform && platform) ? null :
      (productVariants?.length > 1 ) && <>
        <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
          انتخاب {productVariants[0]?.name}
        </label>

        <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">
          <div className="flex pr-4">
            {productVariants.map((rootVariant) => {
              const isSelected = selectedVariant?.slug === rootVariant.slug;

              return (
                <div key={rootVariant.slug} className="pl-3 last:pl-4">
                  <button
                    type="button"
                    disabled={!rootVariant.slug}
                    onClick={() => setSelectedVariant(rootVariant)}
                    className={`shrink-0 rounded-xl whitespace-nowrap px-4 h-16 border-0 outline-none font-semibold py-3 ${
                      isSelected
                        ? "bg-gradient-green text-neutral-800"
                        : "bg-[#eeeeee] dark:bg-[#192a39]"
                    }`}
                  >
                    {rootVariant.value}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </>}

      {selectedVariant && (
        <VariantItem
          variantGroup={selectedVariant}
          productId={productId}
        />
      )}
    </>
  );
};

export default VariantSection;