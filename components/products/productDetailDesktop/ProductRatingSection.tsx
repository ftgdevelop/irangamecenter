import { ProductDetailData } from "@/types/commerce";
import ProductDesktopSection from "./ProductDesktopSection";
import { toPersianDigits } from "@/helpers";

type Props = {
  rating: ProductDetailData["rating"];
};
const ProductRatingSection: React.FC<Props> = (props) => {
  const { rating } = props;

  if (!rating) return null;

  return (
    <ProductDesktopSection id="ratings" title="امتیاز در وبسایت های معتبر">
      {rating.map(rating => (
        <div className="grid grid-cols-2 p-2 max-w-550" key={rating.id}>
          <div className="font-semibold text-sm text-[#a93aff]">
            {rating.type}
          </div>
          <div className="font-bold text-xs whitespace-nowrap text-right" dir="ltr">
            {toPersianDigits(rating.value.toString())}/
            {toPersianDigits(rating.total.toString())}
          </div>
        </div>
      ))}
    </ProductDesktopSection>
  );
};

export default ProductRatingSection;
