import { numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { ProductVariant } from "@/types/commerce";
import Image from "next/image";

type Props = {
  child: ProductVariant;
  selectedVariantId: number;
  someVariantsHasImage: boolean;
  onClick:()=> void;
};

const VariantButton: React.FC<Props> = (props) => {
    
  const { child, selectedVariantId, someVariantsHasImage } = props;

  const item = child.items?.[0];
  const disabled = item?.status === "OutOfStock";
  const isBackOrder = item?.status === "OnBackOrder";
  const isSelected = selectedVariantId === child.id;
  const isOnDemand = item?.status === "OnDemand";

  const buttonClassName = [
    "flex flex-col relative w-40 shrink-0 rounded-xl px-4 min-h-16 outline-none font-semibold py-3 transition-all"
  ];

  if (someVariantsHasImage) {
    buttonClassName.push("justify-start");
  } else {
    buttonClassName.push("justify-center");
  }

  if (isSelected) {
    if (disabled) {
      buttonClassName.push("bg-gradient-gray text-neutral-800");
    } else {
      buttonClassName.push("bg-gradient-green text-neutral-800");
    }
  } else {
    if (disabled) {
      buttonClassName.push(
        "bg-transparent border border-neutral-300 lg:border-white/50 dark:border-white/15",
      );
    } else {
      buttonClassName.push(
        "bg-[#eeeeee] dark:bg-[#192a39] lg:bg-white/15 lg:dark:bg-white/15",
      );
    }
  }

  return (
    <button
      key={child.id}
      onClick={props.onClick}
      className={buttonClassName.join(" ")}
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
      {isOnDemand && (
        <span className="absolute top-0 left-3 -mt-2 bg-purple-600 rounded-full text-white text-[11px] px-2">
          استعلام موجودی
        </span>
      )}

      {(item?.filePath || someVariantsHasImage) && (
        <Image
          src={item?.filePath || "/images/default-game.png"}
          alt={item?.description || child.value || ""}
          width={128}
          height={128}
          className="w-full aspect-square object-cover mb-2 rounded-xl"
        />
      )}

      <div className="leading-4">{item?.description || child.value}</div>

      {!!item?.salePrice && (
        <div
          className={`border-t pt-2 mt-2 ${
            isSelected
              ? "border-neutral-800"
              : "border-neutral-300 dark:border-white/15"
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
};

export default VariantButton;
