/* eslint-disable  @typescript-eslint/no-explicit-any */

import ModalPortal from "../shared/layout/ModalPortal";
import { useEffect, useState } from "react";
import CheckboxGroup from "../shared/CheckboxGroup";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import CloseSimple from "../icons/CloseSimple";
import Accordion from "../shared/Accordion";
import { openFilter, setSelectedFilters } from "@/redux/productsSlice";

const FilterProducts = () => {

    const [slideIn, setSlideIn] = useState<boolean>(false);

    const availables = useAppSelector(state => state.products.availableFilters);
    const selectedFilters = useAppSelector(state => state.products.selectedFilters);

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

    return (
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


                    {!!availables.pegis.length && (["pegis", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس رده بندی سنی اروپا (PEGI) </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.pegis.map(item => ({
                                    label: item!.name!,
                                    value: item!.keyword!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "pegis",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.pegis || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "pegis"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}

                    {!!availables.esrbs.length && (["esrbs", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس رده بندی سنی آمریکا (ESRB) </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.esrbs.map(item => ({
                                    label: item!.name!,
                                    value: item!.keyword!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "esrbs",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.esrbs || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "esrbs"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}



                    {!!availables.developers.length && (["developers", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس توسعه دهنده </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.developers.map(item => ({
                                    label: item!.name!,
                                    value: item!.slug!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "developers",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.developers || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "developers"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}

                    {!!availables.publishers.length && (["publishers", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس ناشر </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.publishers.map(item => ({
                                    label: item!.name!,
                                    value: item!.slug!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "publishers",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.publishers || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "publishers"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}



                    {!!availables.gameplays?.length && (["gameplays", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس حالت بازی </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.gameplays.map(item => ({
                                    label: item!.name!,
                                    value: item!.keyword!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "gameplays",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.gameplays || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "gameplays"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}


                    {!!availables.genres?.length && (["genres", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس ژانر </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.genres.map(item => ({
                                    label: item!.name!,
                                    value: item!.keyword!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "genres",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.genres || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "genres"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}


                    {!!availables.playerPerspectives?.length && (["playerPerspectives", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس زاویه دید </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.playerPerspectives.map(item => ({
                                    label: item!.name!,
                                    value: item!.keyword!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "playerPerspectives",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.playerPerspectives || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "playerPerspectives"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}



                    {!!availables.themes?.length && (["themes", "all"].includes(openedFilter)) && <Accordion
                        title={(
                            <h5 className="font-semibold text-sm"> فیلتر بر اساس تم بازی  </h5>
                        )}
                        content={(
                            <CheckboxGroup
                                items={availables.themes.map(item => ({
                                    label: item!.name!,
                                    value: item!.keyword!
                                }))}
                                onChange={vals => {
                                    dispatch(setSelectedFilters({
                                        type: "themes",
                                        values: vals
                                    }))
                                }}
                                values={selectedFilters.themes || []}
                            />
                        )}
                        initiallyOpen={openedFilter === "themes"}
                        withArrowIcon
                        rotateArrow180
                        WrapperClassName="mb-4"
                    />}

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
    )
}

export default FilterProducts;