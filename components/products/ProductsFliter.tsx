/* eslint-disable  @typescript-eslint/no-explicit-any */

import ModalPortal from "../shared/layout/ModalPortal";
import { useEffect, useState } from "react";
import CheckboxGroup from "../shared/CheckboxGroup";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import CloseSimple from "../icons/CloseSimple";
import Accordion from "../shared/Accordion";
import { openFilter } from "@/redux/productsSlice";
import { useRouter } from "next/router";
import { Facet } from "@/types/commerce";

type Props = {
    filters: Facet[];
}

const ProductsFliter: React.FC<Props> = props => {

    console.log(props.filters);

    const router = useRouter();

    const slugs: string[] = (router?.query?.slugs as string[]) || [];

    const [slideIn, setSlideIn] = useState<boolean>(false);

    const openedFilter = useAppSelector(state => state.products.openedFilter);


    const dispatch = useAppDispatch();

    useEffect(() => {
        if (openedFilter) {
            setSlideIn(true);
            dispatch(setBodyScrollable(false));
            dispatch(setBodiScrollPosition(window?.pageYOffset || 0));
        } else {
            dispatch(setBodyScrollable(true));
        }
    }, [!!openedFilter]);

    useEffect(() => {
        if (!slideIn) {
            setTimeout(() => { dispatch(openFilter("")) }, 300)
        }
    }, [slideIn]);

    const changeFilterHandel = (values: string[], type: string) => {
        const otherSlugs = slugs?.filter(item => !(item.includes(`${type}-`)));
        const segments = ["/products", ...otherSlugs, ...(values.map(x => `${type}-${x}`))];
        const newUrl = segments.join("/");
        router.push({
            pathname: newUrl,
        });
    }

    const selectedFilter = (type: string) => { return (slugs?.filter(x => x.includes(`${type}-`))?.map(x => x.split(`${type}-`)?.[1])) || [] };

    const activeClass = "mx-2 w-2 h-2 inline-block align-middle bg-red-500 rounded-full";

    return (
        <>
            <ModalPortal
                show={!!openedFilter}
                selector='modal_portal'
            >
                <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0" onClick={() => { setSlideIn(false) }} />

                <div className={`bg-[#192a39] text-white rounded-t-2xl max-h-95-screen hidden-scrollbar overflow-y-auto fixed w-full md:max-w-lg safePadding-b transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2 ${slideIn ? "bottom-0" : "-bottom-[80vh]"}`}>
                    <div className="px-4 pt-8 pb-3">

                        <div className="mb-5 flex justify-between items-center">
                            {openedFilter === "all" ? (
                                <h5 className="font-semibold block">
                                    فیلتر محصولات
                                </h5>
                            ) : (
                                <span />
                            )}
                            <button
                                type="button"
                                onClick={() => { setSlideIn(false) }}
                                className="relative -left-1.5"
                            >
                                <CloseSimple className="w-6 h-6 fill-current" />
                            </button>
                        </div>


                        {props.filters?.filter(item => ([item.key, "all"].includes(openedFilter))).map(filter => (
                            <Accordion
                                key={filter.key}
                                title={(
                                    <h5 className="font-semibold text-sm"> فیلتر بر اساس {filter.label} {!!selectedFilter(filter.key)?.length && <span className={activeClass} />} </h5>
                                )}
                                content={(
                                    <CheckboxGroup
                                        items={filter.items?.map(item => ({
                                            label: `${item!.label} (${item.count})`,
                                            value: item!.value!
                                        })) || []}
                                        onChange={vals => { changeFilterHandel(vals, filter.key) }}
                                        values={selectedFilter(filter.key)}
                                    />
                                )}
                                initiallyOpen={openedFilter === filter.key}
                                withArrowIcon
                                rotateArrow180
                                WrapperClassName="mb-4"
                            />
                        ))}


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

export default ProductsFliter;