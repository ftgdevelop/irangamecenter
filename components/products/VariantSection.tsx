import { PlatformSlugTypes, ProductVariant } from "@/types/commerce";
import { useEffect, useState } from "react";
import VariantItem from "./VariantItem";
import { useRouter } from "next/router";

type Props = {
  productId: number;
  productVariants: ProductVariant[];
  platform?: PlatformSlugTypes;
};

const VariantSection: React.FC<Props> = ({ productId, productVariants, platform }) => {
  
  const router = useRouter();
  const {query} = router;
  const queryVariantId = query.variant as string;

  let initialVarId:number = productVariants[0].id;

  const initialUrlVariant = productVariants.find(v1 => {
    
    if(v1.items?.[0]?.id === +queryVariantId) return true;

    if(v1.children){
      for (const a of v1.children){
        
        if(a.items?.[0]?.id === +queryVariantId) return true;
        if (a.children?.length){
          for (const b of a.children){
            
            if(b.items?.[0]?.id === +queryVariantId) return true;
            if(b.children?.length){
              for (const c of b.children){
                
                if(c.items?.[0]?.id === +queryVariantId) return true;
                if(c.children?.length){
                  for (const d of c.children){ 
                      
                    if (d.items?.[0]?.id === +queryVariantId) return true;
                    if(d.children){
                      for (const e of d.children){

                        if (e.items?.[0]?.id === +queryVariantId) return true;
                      } 
                    }                              
                  } 
                }                           
              }
            }  
          } 
        }
      } 
    }
    
    return false;

  });
  
  if(initialUrlVariant){
    initialVarId =  initialUrlVariant.id
  }

  const [selectedVariantId, setSelectedVariantId] = useState <number>(initialVarId);

  const isPlatform = productVariants[0]?.name?.toLowerCase() === "platform";

  useEffect(()=>{
    if(isPlatform && platform){
      const activePlatform = productVariants.find(x => x.slug === platform);
      if(activePlatform){
        setSelectedVariantId(activePlatform.id);
      }
    }
  },[isPlatform, platform])
  
  const selectedVariant = productVariants.find(v => v.id === selectedVariantId);

  return (
    <div>
      {(isPlatform && platform) ? null :
      (productVariants?.length > 1 ) && <>
        <label className="text-sm pointer-events-none mb-3 block max-lg:px-4 mt-7">
          انتخاب {productVariants[0]?.name}
        </label>

        <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">
          <div className="flex max-lg:pr-4">
            {productVariants.map((rootVariant) => {

              const isSelected = rootVariant.id === selectedVariantId;
            
              return (
                <div key={rootVariant.slug} className="pl-3 last:pl-4">
                  <button
                    type="button"
                    disabled={!rootVariant.slug}
                    onClick={() => setSelectedVariantId(rootVariant.id)}
                    className={`shrink-0 rounded-xl whitespace-nowrap px-4 h-16 border-0 outline-none font-semibold py-3 ${
                      isSelected
                        ? "bg-gradient-green text-neutral-800"
                        : "bg-[#eeeeee] dark:bg-[#192a39] lg:bg-white/15 lg:dark:bg-white/15"
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
          rootVariantSlug={selectedVariant.slug || ""}
        />
      )}
    </div>
  );
};

export default VariantSection;