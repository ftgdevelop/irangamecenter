import { ProductDetailData } from "@/types/commerce";
import Link from "next/link";
import { dateDiplayFormat } from "@/helpers";

type Props = {
  productData: ProductDetailData;
};
const ProductSpecification: React.FC<Props> = (props) => {
  const { productData } = props;

  if (!productData) return null;

  return (
    <>
      {!!productData.genres?.[0]?.name && (
        <div className="flex justify-between py-4 border-b border-neutral-300 dark:border-white/15 text-sm gap-5 last:border-0">
          <div className="whitespace-nowrap"> سبک بازی </div>
          <div className="text-left text-[#099268] dark:text-teal-500 lg:text-black dark:lg:text-white">
            {productData.genres.map((item) => item.name).join("، ")}
          </div>
        </div>
      )}

      {!!productData.developer?.name && (
        <div className="flex justify-between py-4 border-b border-neutral-300 dark:border-white/15 text-sm gap-5">
          <div className="whitespace-nowrap"> شرکت توسعه دهنده </div>
          <Link
            prefetch={false}
            href={`/brand/${productData.developer.slug || "unknown"}`}
            className="text-left text-[#099268] dark:text-teal-500 last:border-0 lg:text-black dark:lg:text-white"
          >
            {productData.developer.name}
          </Link>
        </div>
      )}
      {!!productData.publisher?.name && (
        <div className="flex justify-between py-4 border-b border-neutral-300 dark:border-white/15 text-sm gap-5">
          <div className="whitespace-nowrap"> شرکت انتشار دهنده </div>
          <Link
            prefetch={false}
            href={`/brand/${productData.publisher.slug || "unknown"}`}
            className="text-left text-[#099268] dark:text-teal-500 last:border-0 lg:text-black dark:lg:text-white"
          >
            {productData.publisher.name}
          </Link>
        </div>
      )}

      {!!productData.gameplay?.length && (
        <div className="flex justify-between py-4 border-b border-neutral-300 dark:border-white/15 text-sm gap-5 last:border-0">
          <div className="whitespace-nowrap"> حالت بازی </div>
          <div className="text-left text-[#099268] dark:text-teal-500 lg:text-black dark:lg:text-white">
            {productData.gameplay.map((item) => item.name).join("، ")}
          </div>
        </div>
      )}
      {!!productData.playerPerspective?.length && (
        <div className="flex justify-between py-4 border-b border-neutral-300 dark:border-white/15 text-sm gap-5 last:border-0">
          <div className="whitespace-nowrap"> زاویه دید </div>
          <div className="text-left text-[#099268] dark:text-teal-500 lg:text-black dark:lg:text-white">
            {productData.playerPerspective.map((item) => item.name).join("، ")}
          </div>
        </div>
      )}

      {!!productData.theme?.length && (
        <div className="flex justify-between py-4 border-b border-neutral-300 dark:border-white/15 text-sm gap-5 last:border-0">
          <div className="whitespace-nowrap"> تم بازی </div>
          <div className="text-left text-[#099268] dark:text-teal-500 lg:text-black dark:lg:text-white">
            {productData.theme.map((item) => item.name).join("، ")}
          </div>
        </div>
      )}

      {!!productData.releaseDate && (
        <div className="flex justify-between py-4 border-b border-neutral-300 dark:border-white/15 text-sm gap-5 last:border-0">
          <div className="whitespace-nowrap"> تاریخ انتشار </div>
          <div className="text-left text-[#099268] dark:text-teal-500 lg:text-black dark:lg:text-white">
            {dateDiplayFormat({
              date: productData.releaseDate,
              locale: "fa",
              format: "dd mm yyyy",
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSpecification;
