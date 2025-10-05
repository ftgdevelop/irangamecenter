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
import { FilterItems } from "@/types/commerce";

const FilterProducts = () => {

    const router = useRouter();

    const slugs: string[] = (router?.query?.slugs as string[]) || [];

    const [slideIn, setSlideIn] = useState<boolean>(false);

    const availables = useAppSelector(state => state.products.availableFilters);

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

    const changeFilterHandel = (values: string[], type: FilterItems) => {
        const otherSlugs = slugs?.filter(item => !(item.includes(`${type}-`)));
        const segments = ["/products", ...otherSlugs, ...(values.map(x => `${type}-${x}`))];
        const newUrl = segments.join("/");
        router.push({
            pathname: newUrl,
        });
    }

    const selectedFilter = (type: FilterItems) => { return (slugs?.filter(x => x.includes(`${type}-`))?.map(x => x.split(`${type}-`)?.[1])) || [] };

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

                        {!!availables.variants.length && (["variants", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس Platform {!!selectedFilter("variants")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.variants.map(item => ({
                                        label: item!.value!,
                                        value: item!.slug!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "variants") }}
                                    values={selectedFilter("variants")}
                                />
                            )}
                            initiallyOpen={openedFilter === "variants"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}


                        {!!availables.pegis.length && (["pegis", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس رده بندی سنی اروپا (PEGI) {!!selectedFilter("pegis")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.pegis.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "pegis") }}
                                    values={selectedFilter("pegis")}
                                />
                            )}
                            initiallyOpen={openedFilter === "pegis"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}

                        {!!availables.esrbs.length && (["esrbs", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس رده بندی سنی آمریکا (ESRB) {!!selectedFilter("esrbs")?.length && <span className={activeClass} />}</h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.esrbs.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "esrbs") }}
                                    values={selectedFilter("esrbs")}
                                />
                            )}
                            initiallyOpen={openedFilter === "esrbs"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}

                        {!!availables.developers.length && (["developers", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس توسعه دهنده {!!selectedFilter("developers")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.developers.map(item => ({
                                        label: item!.name!,
                                        value: item!.slug!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "developers") }}
                                    values={selectedFilter("developers")}
                                />
                            )}
                            initiallyOpen={openedFilter === "developers"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}

                        {!!availables.publishers.length && (["publishers", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس ناشر {!!selectedFilter("publishers")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.publishers.map(item => ({
                                        label: item!.name!,
                                        value: item!.slug!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "publishers") }}
                                    values={selectedFilter("publishers")}
                                />
                            )}
                            initiallyOpen={openedFilter === "publishers"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}



                        {!!availables.gameplays?.length && (["gameplays", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس حالت بازی {!!selectedFilter("gameplays")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.gameplays.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "gameplays") }}
                                    values={selectedFilter("gameplays")}
                                />
                            )}
                            initiallyOpen={openedFilter === "gameplays"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}


                        {!!availables.genres?.length && (["genres", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس ژانر {!!selectedFilter("genres")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.genres.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "genres") }}
                                    values={selectedFilter("genres")}
                                />
                            )}
                            initiallyOpen={openedFilter === "genres"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}


                        {!!availables.playerPerspectives?.length && (["playerPerspectives", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس زاویه دید {!!selectedFilter("playerPerspectives")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.playerPerspectives.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "playerPerspectives") }}
                                    values={selectedFilter("playerPerspectives")}
                                />
                            )}
                            initiallyOpen={openedFilter === "playerPerspectives"}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-4"
                        />}



                        {!!availables.themes?.length && (["themes", "all"].includes(openedFilter)) && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس تم بازی  {!!selectedFilter("themes")?.length && <span className={activeClass} />} </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.themes.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={vals => { changeFilterHandel(vals, "themes") }}
                                    values={selectedFilter("themes")}
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
        </>
    )
}

export default FilterProducts;