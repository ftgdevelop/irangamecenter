import { ProductVariant } from "@/types/commerce";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SimplePortal from "../shared/layout/SimplePortal";
import { numberWithCommas } from "@/helpers";
import Image from "next/image";
import { SelectedVariantLevel } from "./VariantSection";

type Props = {
  variant?: ProductVariant;
  level: string;
  onSelectVariant: (variant: ProductVariant, level: number) => void;
  setSelectedVariants: Dispatch<SetStateAction<SelectedVariantLevel[]>>;
  selectedVariants: SelectedVariantLevel[];
};

const VariantItem: React.FC<Props> = ({
  variant,
  level,
  onSelectVariant,
  setSelectedVariants,
  selectedVariants,
}) => {
  const initialVariant = variant?.children?.find(
    (x) => x.items?.[0]?.status !== "OutOfStock"
  );

  const [selectedVariantId, setSelectedVariantId] = useState<
    number | undefined
  >(initialVariant?.id);

  const [fade, setFade] = useState(false);

  useEffect(() => {
    setSelectedVariantId(initialVariant?.id);
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 100);
  }, [initialVariant]);

  const selectedVariant = variant?.children?.find(
    (c) => c.id === selectedVariantId
  );

  useEffect(() => {
    if (selectedVariant ) {
      
      const att = selectedVariant;
      const level = String(
        Number(selectedVariants[selectedVariants.length - 1].level) + 1
      );

      console.log(variant?.children?.[0]?.name, {
              att,
              level
            });


      setSelectedVariants((prev) => {
        const existingLevelIndex = prev.findIndex(
          (v) =>  v.variant.name === att.name
        );

        if (existingLevelIndex !== -1) {
          const updated = [...prev];
          updated[existingLevelIndex] = { variant: att, level };
          return updated;
        } else {
          return [...prev, { variant: att, level }];
        }
      });
    }
  }, [selectedVariant]);

  let childElement: ReactNode = "";

  if (selectedVariant?.children?.length) {
    childElement = (
      <VariantItem
        variant={selectedVariant}
        level={level}
        onSelectVariant={onSelectVariant}
        setSelectedVariants={setSelectedVariants}
        selectedVariants={selectedVariants}
      />
    );
  } else if (selectedVariant?.items?.[0]?.status !== "OutOfStock") {
    const currency = selectedVariant?.items?.[0]?.currencyType;
    childElement = (
      <SimplePortal selector="fixed_bottom_portal">
        <footer className="min-h-20 Z-10 fixed bottom-0 left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 flex flex-wrap justify-between gap-2 items-center w-full md:max-w-lg">
          <button
            type="button"
            className="bg-violet-500 text-white rounded-full px-4 py-3 text-xs flex gap-2 items-center font-semibold"
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

          <div className="text-left text-white">
            {!!selectedVariant?.items?.[0]?.regularPrice && (
              <div className="flex flex-wrap gap-2 mb-1">
                {!!selectedVariant?.items?.[0]?.profitPercentage && (
                  <span className="text-[#fe9f00] text-2xs font-semibold">
                    {selectedVariant?.items?.[0]?.profitPercentage} % تخفیف
                  </span>
                )}
                <span className="text-xs">
                  {numberWithCommas(selectedVariant.items[0].regularPrice)} 
                  {currency}
                </span>
              </div>
            )}

            {!!selectedVariant?.items?.[0]?.salePrice && (
              <b className="text-base font-semibold block">
                {numberWithCommas(selectedVariant.items[0].salePrice)} 
                {currency}
              </b>
            )}
          </div>
        </footer>
        <div className="h-20" />
      </SimplePortal>
    );
  }

  return (
    <>
      <label className="text-sm pointer-events-none block px-4 mt-7">
        انتخاب {variant?.children?.[0]?.name}
      </label>

      <div
        className={`max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3 ${
          fade ? "opacity-0" : "opacity-100 transition-all duration-100"
        }`}
      >
        <div className="flex px-4 gap-3 pt-2">
          {variant?.children?.map((variantItem) => {
            const variantProperties = variantItem?.items?.[0];
            const isDisabled = variantProperties?.status === "OutOfStock";
            const isOnBackOrder = variantProperties?.status === "OnBackOrder";

            let tag: ReactNode = "";
            if (isDisabled) {
              tag = (
                <span className="absolute top-0 left-3 -mt-2 bg-[#bbbbbb] rounded-full text-black text-[11px] font-normal block px-2">
                  ناموجود
                </span>
              );
            }
            if (isOnBackOrder) {
              tag = (
                <span className="absolute top-0 left-3 -mt-2 bg-[#a93aff] rounded-full text-white text-[11px] font-normal block px-2">
                  پیش خرید
                </span>
              );
            }

            return (
              <button
                key={variantItem.id}
                type="button"
                className={`relative min-w-40 shrink-0 rounded-xl whitespace-nowrap px-4 min-h-16 outline-none font-semibold py-3 ${
                  isDisabled
                    ? "bg-transparent border border-white/15"
                    : selectedVariantId === variantItem.id
                    ? "bg-gradient-green text-neutral-800 border-0"
                    : "bg-[#192a39] border-0"
                }`}
                disabled={!variantItem.slug || isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    setSelectedVariantId(variantItem.id || undefined);
                  }
                }}
              >
                {tag}
                {variantItem.value}
                {variantProperties?.salePrice ? (
                  <div
                    className={`border-t pt-2 mt-2 ${
                      isDisabled
                        ? "border-white/15"
                        : selectedVariantId === variantItem.id
                        ? "border-neutral-800"
                        : "border-white"
                    }`}
                  >
                    {!!variantProperties?.regularPrice && (
                      <div className="text-xs line-through">
                        {numberWithCommas(variantProperties.regularPrice)} 
                        {variantProperties.currencyType}
                      </div>
                    )}
                    <div className="text-sm">
                      {numberWithCommas(variantProperties.salePrice)} 
                      {variantProperties.currencyType}
                    </div>
                  </div>
                ) : null}
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