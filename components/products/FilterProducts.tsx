/* eslint-disable  @typescript-eslint/no-explicit-any */

import ModalPortal from "../shared/layout/ModalPortal";
import { useEffect, useState } from "react";
import CheckboxGroup from "../shared/CheckboxGroup";
import Filter2 from "../icons/Filter2";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import CloseSimple from "../icons/CloseSimple";
import Accordion from "../shared/Accordion";

type Props = {
    activeKeyword?: any;
    onChange: (key: string) => void;
}

const FilterProducts: React.FC<Props> = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [slideIn, setSlideIn] = useState<boolean>(false);

    const availables = useAppSelector(state => state.products.availableFilters);

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

                <div className={`bg-[#192a39] text-white rounded-t-2xl max-h-95-screen hidden-scrollbar overflow-y-auto fixed w-full md:max-w-lg safePadding-b transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2 ${slideIn ? "bottom-0" : "-bottom-[80vh]"}`}>
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


                        {!!availables.pegis.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس رده بندی سنی اروپا (PEGI) </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.pegis.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
                        />}

                        {!!availables.esrbs.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس رده بندی سنی آمریکا (ESRB) </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.esrbs.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
                        />}



                        {!!availables.developers.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس توسعه دهنده </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.developers.map(item => ({
                                        label: item!.name!,
                                        value: item!.slug!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
                        />}
                        
                        {!!availables.publishers.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس ناشر </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.publishers.map(item => ({
                                        label: item!.name!,
                                        value: item!.slug!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
                        />}


                        
                        {!!availables.gameplays?.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس حالت بازی </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.gameplays.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
                        />}

                        
                        {!!availables.genres?.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس ژانر </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.genres.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
                        />}


                        {!!availables.playerPerspectives?.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس زاویه دید </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.playerPerspectives.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
                        />}



                        {!!availables.themes?.length && <Accordion
                            title={(
                                <h5 className="font-semibold text-sm"> فیلتر بر اساس تم بازی  </h5>
                            )}
                            content={(
                                <CheckboxGroup
                                    items={availables.themes.map(item => ({
                                        label: item!.name!,
                                        value: item!.keyword!
                                    }))}
                                    onChange={console.log}
                                    values={[]}
                                />
                            )}
                            withArrowIcon
                            rotateArrow180
                            WrapperClassName="mb-6"
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