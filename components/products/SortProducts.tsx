import { ProductSortKeywords } from "@/actions/commerce";
import CheckIcon from "../icons/CheckIcon";
import { productSortOptions } from "@/enum/models";
import CloseSimple from "../icons/CloseSimple";
import ModalPortal from "../shared/layout/ModalPortal";
import { useEffect, useState } from "react";
import SortIcon from "../icons/SortIcon";
import { useAppDispatch } from "@/hooks/use-store";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";

type Props = {
    activeKeyword?: ProductSortKeywords;
    onChange: (key: ProductSortKeywords) => void;
}

const SortProducts: React.FC<Props> = props => {

    // const [selected, setSelected] = useState<ProductSortKeywords | undefined>(props.activeKeyword);

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [slideIn, setSlideIn] = useState<boolean>(false);


    useEffect(() => {
        if (open) {
            setSlideIn(true);
            dispatch(setBodyScrollable(false));
            dispatch(setBodiScrollPosition(window?.pageYOffset || 0));
        }else{
            dispatch(setBodyScrollable(true));
        }
    }, [open]);

    useEffect(() => {
        if (!slideIn) {
            setTimeout(() => { setOpen(false) }, 300)
        }
    }, [slideIn]);

    const selectedSortLabel = productSortOptions?.find(option => option.keywords === props.activeKeyword)?.label || "مرتب سازی";

    return (
        <>

            <button
                type="button"
                className="inline-flex gap-2 items-center bg-[#192a39] rounded-full px-5 py-2.5 text-2xs"
                onClick={() => { setOpen(true) }}
            >
                <SortIcon className="w-4.5 h-4.5 fill-current" />
                {selectedSortLabel}
            </button>

            <ModalPortal
                show={open}
                selector='modal_portal'
            >
                <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0" onClick={() => { setSlideIn(false) }} />

                <div className={`bg-[#192a39] text-white rounded-t-2xl fixed w-full md:max-w-lg safePadding-b overflow-y-auto max-h-[50vh] transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2  bottom-0 ${slideIn ? "translate-y-0" : "translate-y-[80vh]"}`}>
                    <div className="px-4 pt-8">

                        <div className="mb-4 flex justify-between items-center">
                            <h5 className="font-semibold block">
                                مرتب سازی بر اساس
                            </h5>
                            <button
                                type="button"
                                onClick={() => { setSlideIn(false) }}
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
                                    className={`text-sm h-12 w-full flex items-center justify-between ${index ? "border-t border-white/25" : ""}`}
                                    onClick={() => {
                                        props.onChange(option.keywords);
                                        setSlideIn(false);
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
                        onClick={() => { props.setSlideIn(false) }}
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
                            props.setSlideIn(false);
                        }}
                    >
                        اعمال تغییرات
                    </button>
                </div> */}

                    </div>

                </div>
            </ModalPortal>
        </>
    )
}

export default SortProducts;