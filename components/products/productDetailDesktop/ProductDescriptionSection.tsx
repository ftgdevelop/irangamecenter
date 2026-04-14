import { ProductDetailData } from '@/types/commerce';
import parse from 'html-react-parser';
import ProductDesktopSection from './ProductDesktopSection';
import AgeRatingDetail from '../AgeRatingDetail';

type Props = {
    description: ProductDetailData["description"];
    shortDescription: ProductDetailData["shortDescription"];
    pegi?: ProductDetailData["pegi"];
    esrb?: ProductDetailData["esrb"];
}
const ProductDescriptionSection: React.FC<Props> = (props) => {
  return (
    <ProductDesktopSection id='description' title='توضیحات' >
        <div className="inserted-content pt-4">
        {parse(props.description || "")}
        </div>

        <AgeRatingDetail esrb={props.esrb} pegi={props.pegi} />

    </ProductDesktopSection>
  );
};

export default ProductDescriptionSection;
