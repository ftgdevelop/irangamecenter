import { ProductDetailData, ProductVariant } from "@/types/commerce";
import { useState, useMemo, useEffect } from "react";
import VariantFooter from "./VariantFooter";
import { useRouter } from "next/router";
import VariantButton from "./VariantButton";

type VariantItemProps = {
  variantGroup?: ProductVariant;
  productId: ProductDetailData["id"];
  rootVariantSlug: string;
};

const VariantItem: React.FC<VariantItemProps> = ({
  variantGroup,
  productId,
  rootVariantSlug
}) => {
  const router = useRouter();
  const { query } = router;

  const queryVariantId = query.variant as string;

  let initialVarId: number =
    variantGroup?.children?.find(
      (child) => child.items?.[0]?.status !== "OutOfStock",
    )?.id || 0;

  if (!initialVarId) {
    initialVarId = variantGroup?.children?.[0]?.id || 0;
  }

  if (queryVariantId && variantGroup?.children?.length) {
    const initialUrlVariant = variantGroup.children.find((v1) => {
      if (v1.items?.[0]?.id === +queryVariantId) return true;

      if (v1.children) {
        for (const a of v1.children) {
          if (a.items?.[0]?.id === +queryVariantId) return true;
          if (a.children?.length) {
            for (const b of a.children) {
              if (b.items?.[0]?.id === +queryVariantId) return true;
              if (b.children?.length) {
                for (const c of b.children) {
                  if (c.items?.[0]?.id === +queryVariantId) return true;
                  if (c.children?.length) {
                    for (const d of c.children) {
                      if (d.items?.[0]?.id === +queryVariantId) return true;
                      if (d.children) {
                        for (const e of d.children) {
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

    if (initialUrlVariant) {
      initialVarId = initialUrlVariant.id;
    }
  }

  const [selectedVariantId, setSelectedVariantId] =
    useState<number>(initialVarId);

  const currentVariant = useMemo(() => {
    if (!variantGroup) return undefined;

    if (!variantGroup.children?.length) return variantGroup;

    return variantGroup.children.find((c) => c.id === selectedVariantId);
  }, [variantGroup, selectedVariantId]);

  useEffect(() => {
    let initialId: number =
      variantGroup?.children?.find(
        (child) => child.items?.[0]?.status !== "OutOfStock",
      )?.id || 0;

    if (!initialId) {
      initialId = variantGroup?.children?.[0]?.id || 0;
    }

    if (queryVariantId && variantGroup?.children?.length) {
      const initialVariant = variantGroup.children.find((v1) => {
        if (v1.items?.[0]?.id === +queryVariantId) return true;

        if (v1.children) {
          for (const a of v1.children) {
            if (a.items?.[0]?.id === +queryVariantId) return true;
            if (a.children?.length) {
              for (const b of a.children) {
                if (b.items?.[0]?.id === +queryVariantId) return true;
                if (b.children?.length) {
                  for (const c of b.children) {
                    if (c.items?.[0]?.id === +queryVariantId) return true;
                    if (c.children?.length) {
                      for (const d of c.children) {
                        if (d.items?.[0]?.id === +queryVariantId) return true;
                        if (d.children) {
                          for (const e of d.children) {
                            if (e.items?.[0]?.id === +queryVariantId)
                              return true;
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

      if (initialVariant) {
        initialId = initialVariant.id;
      }
    }

    setSelectedVariantId(initialId);

  }, [variantGroup?.id]);

  const renderNestedOrFooter = () => {
    if (currentVariant?.children?.length) {
      return (
        <VariantItem variantGroup={currentVariant} productId={productId} rootVariantSlug={rootVariantSlug} />
      );
    }

    return (
      <VariantFooter
        currentVariant={currentVariant}
        productId={productId}
        productVariantId={currentVariant?.items?.[0]?.id}
      />
    );
  };

  const someVariantsHasImage = variantGroup?.children?.find(
    (x) => x.items?.[0]?.filePath,
  );

  return (
    <>
      {variantGroup?.children && (
        <>
          <label className="text-sm pointer-events-none block max-lg:px-4 mt-7">
            انتخاب {variantGroup?.children?.[0]?.name}
          </label>

          <div
            className="w-full max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3"
          >
            <div className="flex max-lg:px-4 gap-3 pt-2">
              {variantGroup.children.map(child => (
                  <VariantButton 
                    key={child.id}
                    child={child}
                    onClick={() => {
                      setSelectedVariantId(child.id);
                    }}
                    selectedVariantId={selectedVariantId}
                    someVariantsHasImage={!!someVariantsHasImage}
                  />
                )
              )}
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
