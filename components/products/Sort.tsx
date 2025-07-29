import { ProductSortKeywords, ProductSortOption } from "@/actions/commerce";
import { useState } from "react";

type Props = {
    setSlideInSort: (state: boolean) => void;
    activeKeyword?:ProductSortKeywords;
    onChange: (key:ProductSortKeywords) => void;
}

const Sort: React.FC<Props> = props => {

    const [selected, setSelected] = useState<ProductSortKeywords | undefined>(props.activeKeyword);

    const options : ProductSortOption[] =[
        {label:"پرفروشترین", keywords:"Sale"},
        {label:"پربازدیدترین", keywords:"Visitor"},
        {label:"گرانترین", keywords:"HighPrice"},
        {label:"ارزانترین", keywords:"LowPrice"}
    ];

    return (
        <div className="px-4 py-8">

            <h5 className="mb-4 font-semibold block">
            نمایش بر اساس
            </h5>

            <div>
                {options.map(option => (
                    <button
                        key={option.keywords}
                        type="button"
                        className={`text-sm px-5 py-3.5 w-full flex items-center justify-between rounded-full mb-4 ${selected === option.keywords ? "bg-gradient-green" : "bg-[#1f3c44]"}`}
                        onClick={()=>{setSelected(option.keywords)}}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="flex gap-3 mt-5">
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
                        if(selected){
                            props.onChange(selected)
                        }
                        props.setSlideInSort(false);
                    }}
                >
                    اعمال تغییرات
                </button>
            </div>

        </div>
    )
}

export default Sort;