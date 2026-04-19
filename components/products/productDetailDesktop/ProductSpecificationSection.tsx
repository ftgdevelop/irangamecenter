import { ProductDetailData } from "@/types/commerce";
import ProductDesktopSection from "./ProductDesktopSection";
import ProductSpecification from "../ProductSpecification";

type Props = {
  productData: ProductDetailData;
};
const ProductSpecificationSection: React.FC<Props> = (props) => {
  const { productData } = props;

  if (!productData) return null;

  return (
    <ProductDesktopSection id="specs" title="مشخصات">
      <ProductSpecification productData={props.productData} />
    </ProductDesktopSection>
  );
};

export default ProductSpecificationSection;
