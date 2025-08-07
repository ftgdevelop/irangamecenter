import { ProductSortKeywords} from "@/actions/commerce";
import CheckIcon from "../icons/CheckIcon";
import { productSortOptions } from "@/enum/models";
import CloseSimple from "../icons/CloseSimple";

type Props = {
    setSlideInSort: (state: boolean) => void;
    activeKeyword?: ProductSortKeywords;
    onChange: (key: ProductSortKeywords) => void;
}

const Sort: React.FC<Props> = props => {

    // const [selected, setSelected] = useState<ProductSortKeywords | undefined>(props.activeKeyword);

    return (
        <div className="px-4 py-8">

            <div className="mb-4 flex justify-between items-center">
                <h5 className="font-semibold block">
                    مرتب سازی بر اساس
                </h5>
                <button
                    type="button"
                    onClick={()=>{props.setSlideInSort(false)}}
                >
                    <CloseSimple className="w-6 h-6 fill-current" />
                </button>
            </div>

            <div>
                {/* {options.map(option => (
                    <button
                        key={option.keywords}
                        type="button"
                        className={`text-sm px-5 py-3.5 w-full flex items-center justify-between rounded-full mb-4 ${selected === option.keywords ? "bg-gradient-green" : "bg-[#1f3c44]"}`}
                        onClick={()=>{setSelected(option.keywords)}}
                    >
                        {option.label}
                    </button>
                ))} */}
                {productSortOptions.map((option, index) => (
                    <button
                        key={option.keywords}
                        type="button"
                        className={`text-sm h-12 w-full flex items-center justify-between ${index?"border-t border-white/25":""}`}
                        onClick={() => {
                            props.onChange(option.keywords);
                            props.setSlideInSort(false);
                        }}
                    >
                        {option.label}
                        {props.activeKeyword === option.keywords ? <CheckIcon className="w-6 h-6 fill-current" /> : null}
                    </button>
                ))}
            </div>

            {/* <div className="flex gap-3 mt-5">
                <button
                    type="button"
                    className="bg-[#011425] rounded-full px-5 py-3 text-sm"
                    onClick={() => { props.setSlideInSort(false) }}
                >
                    بستن
                </button>
                <button
                    type="button"
                    className="bg-violet-500 rounded-full px-5 py-3 text-sm grow"
                    onClick={() => {
                        if (selected) {
                            props.onChange(selected)
                        }
                        props.setSlideInSort(false);
                    }}
                >
                    اعمال تغییرات
                </button>
            </div> */}

        </div>
    )
}

export default Sort;