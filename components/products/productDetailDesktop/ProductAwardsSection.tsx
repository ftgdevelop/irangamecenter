import { ProductDetailData } from "@/types/commerce";
import ProductDesktopSection from "./ProductDesktopSection";
import Image from "next/image";

type Props = {
  awards: ProductDetailData["awards"];
};
const ProductAwardsSection: React.FC<Props> = (props) => {
  const { awards } = props;

  if (!awards) return null;

  return (
    <ProductDesktopSection id="awards" title="جوایز و دستاوردها">
        {awards.map((award) => (
          <div className="flex items-center gap-2 mb-2 text-sm" key={award}>
            <Image
              src="/images/icons/award.svg"
              alt="award"
              className="w-7 h-7 "
              width={28}
              height={28}
            />
            {award}
          </div>
        ))}
    </ProductDesktopSection>
  );
};

export default ProductAwardsSection;
