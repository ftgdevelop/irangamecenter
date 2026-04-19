import { ProductDetailData } from "@/types/commerce";
import ProductDesktopSection from "./ProductDesktopSection";
import FAQ from "@/components/shared/FAQ";

type Props = {
  faqs: ProductDetailData["faqs"];
};
const ProductFAQSection: React.FC<Props> = (props) => {
  const { faqs } = props;

  if (!faqs) return null;

  return (
    <ProductDesktopSection id="faq" title="سوالات متداول">
      <FAQ
        answerParse="parse"
        items={faqs.map((faq) => ({
          id: faq.id,
          Answer: faq.answer,
          Question: faq.questions,
        }))}
      />
    </ProductDesktopSection>
  );
};

export default ProductFAQSection;
