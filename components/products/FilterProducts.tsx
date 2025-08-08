/* eslint-disable  @typescript-eslint/no-explicit-any */

import ModalPortal from "../shared/layout/ModalPortal";
import { useEffect, useState } from "react";
import CheckboxGroup from "../shared/CheckboxGroup";
import Filter2 from "../icons/Filter2";
import { useAppDispatch } from "@/hooks/use-store";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import CloseSimple from "../icons/CloseSimple";

type Props = {
    activeKeyword?: any;
    onChange: (key: string) => void;
}

const FilterProducts: React.FC<Props> = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [slideIn, setSlideIn] = useState<boolean>(false);
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (open) {
            setSlideIn(true);
            dispatch(setBodyScrollable(false));
            dispatch(setBodiScrollPosition(window?.pageYOffset || 0));
        } else {
            dispatch(setBodyScrollable(true));
        }
    }, [open]);

    useEffect(() => {
        if (!slideIn) {
            setTimeout(() => { setOpen(false) }, 300)
        }
    }, [slideIn]);

    return (
        <>

            <button
                type="button"
                className="inline-flex gap-2 items-center bg-[#192a39] rounded-full px-5 py-2.5 text-xs"
                onClick={() => { setOpen(true) }}
            >
                <Filter2 className="w-4.5 h-4.5 fill-current" />
                فیلتر
            </button>

            <ModalPortal
                show={open}
                selector='modal_portal'
            >
                <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0" onClick={() => { setSlideIn(false) }} />

                <div className={`bg-[#192a39] text-white rounded-t-2xl fixed w-full md:max-w-lg safePadding-b overflow-y-auto max-h-[50vh] transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2  bottom-0 ${slideIn ? "translate-y-0" : "translate-y-[80vh]"}`}>
                    <div className="px-4 pt-8 pb-3">

                        <div className="mb-5 flex justify-between items-center">
                            <h5 className="font-semibold block">
                                فیلتر محصولات
                            </h5>
                            <button
                                type="button"
                                onClick={() => { setSlideIn(false) }}
                            >
                                <CloseSimple className="w-6 h-6 fill-current" />
                            </button>
                        </div>


                        <h5 className="font-semibold mb-4 text-sm"> فیلتر بر اساس دسته بندی ها </h5>

                        <CheckboxGroup
                            items={[{ label: "دسته بندی 1", value: "cat1" }, { label: "دسته بندی 2", value: "cat2" }, { label: "دسته بندی 3", value: "cat3" }]}
                            onChange={console.log}
                            values={["cat1", "cat3"]}
                        />

                        <h5 className="font-semibold my-4 text-sm"> فیلتر بر اساس برچسب ها </h5>

                        <CheckboxGroup
                            items={[{ label: "برچسب 1", value: "cat1" }, { label: "برچسب 2", value: "cat2" }, { label: "برچسب 3", value: "cat3" }]}
                            onChange={console.log}
                            values={["cat1", "cat3"]}
                        />

                        <button
                            type="button"
                            className="bg-violet-500 w-full rounded-full px-5 py-3 text-sm mt-5"
                            onClick={() => { setSlideIn(false) }}
                        >
                            اعمال تغییرات
                        </button>
                        
                    </div>

                </div>
            </ModalPortal>
        </>
    )
}

export default FilterProducts;