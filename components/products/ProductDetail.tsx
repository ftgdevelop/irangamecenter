import { ProductDetailData } from "@/types/commerce";
import Tab from "../shared/Tab"
import { TabItem } from "@/types";
import { dateDiplayFormat } from "@/helpers";
import Link from "next/link";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import ModalPortal from "../shared/layout/ModalPortal";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import { useAppDispatch } from "@/hooks/use-store";
import { setBodyScrollable } from "@/redux/stylesSlice";

type Props = {
    productData?: ProductDetailData;
    activeTab: string;
    changeActiveTab: (key: string | number) => void;
}

const ProductDetail: React.FC<Props> = props => {

    const { productData } = props;

    const tabItems: TabItem[] = [];

    const [openDetails, setOpenDetails] = useState<boolean>(false);
    const [slideInDetails, setSlideInDetails] = useState<boolean>(false);

    const dispatch = useAppDispatch();
        
    useEffect(() => {
        if (props.activeTab) {
            setOpenDetails(true);
            dispatch(setBodyScrollable(false));
        }else{
            dispatch(setBodyScrollable(true));
              setSlideInDetails(false);
        }
    }, [props.activeTab]);

    useEffect(() => {
        if (openDetails) {
            setSlideInDetails(true);
        } else {
            props.changeActiveTab("");
        }
    }, [openDetails]);

    useEffect(() => {
        if (!slideInDetails) {
            setTimeout(() => { setOpenDetails(false) }, 300)
        }
    }, [slideInDetails])


    if (!productData) return null;

    if (productData.description) {
        tabItems.push({
            key: "descriptions",
            label: "توضیحات",
            children: (<div className="inserted-content pt-4">
                {parse(productData.description)}
            </div>)
        })
    }


    tabItems.push({
        key: "details",
        label: "مشخصات",
        children: (
            <>

                <h4 className="text-sm my-4 font-semibold"> مشخصات بازی</h4>

                {!!productData.genres?.[0]?.name && (
                    <div className="flex justify-between py-4 border-b border-white/15 text-sm gap-5 last:border-0" >
                        <div className="whitespace-nowrap"> سبک بازی </div>
                        <div className="text-left text-teal-500">
                            {productData.genres.map(item => item.name).join("، ")}
                        </div>
                    </div>
                )}

                {!!productData.developer?.name && (
                    <div className="flex justify-between py-4 border-b border-white/15 text-sm gap-5" >
                        <div className="whitespace-nowrap"> شرکت توسعه دهنده </div>
                        <Link href={`/brand/${productData.developer.slug || "unknown"}`} className="text-left text-teal-500 last:border-0">
                            {productData.developer.name}
                        </Link>
                    </div>
                )}
                {!!productData.publisher?.name && (
                    <div className="flex justify-between py-4 border-b border-white/15 text-sm gap-5" >
                        <div className="whitespace-nowrap"> شرکت انتشار دهنده </div>
                        <Link href={`/brand/${productData.publisher.slug || "unknown"}`} className="text-left text-teal-500 last:border-0">
                            {productData.publisher.name}
                        </Link>
                    </div>
                )}

                {!!productData.gameplay?.length && (
                    <div className="flex justify-between py-4 border-b border-white/15 text-sm gap-5 last:border-0" >
                        <div className="whitespace-nowrap"> حالت بازی </div>
                        <div className="text-left text-teal-500">
                            {productData.gameplay.map(item => item.name).join("، ")}
                        </div>
                    </div>
                )}
                {!!productData.playerPerspective?.length && (
                    <div className="flex justify-between py-4 border-b border-white/15 text-sm gap-5 last:border-0" >
                        <div className="whitespace-nowrap"> زاویه دید </div>
                        <div className="text-left text-teal-500">
                            {productData.playerPerspective.map(item => item.name).join("، ")}
                        </div>
                    </div>
                )}


                {!!productData.theme?.length && (
                    <div className="flex justify-between py-4 border-b border-white/15 text-sm gap-5 last:border-0" >
                        <div className="whitespace-nowrap"> تم بازی </div>
                        <div className="text-left text-teal-500">
                            {productData.theme.map(item => item.name).join("، ")}
                        </div>
                    </div>
                )}

                {!!productData.releaseDate && (
                    <div className="flex justify-between py-4 border-b border-white/15 text-sm gap-5 last:border-0" >
                        <div className="whitespace-nowrap"> تاریخ انتشار </div>
                        <div className="text-left text-teal-500">
                            {dateDiplayFormat({
                                date: productData.releaseDate,
                                locale: "fa",
                                format: "dd mm yyyy"
                            })}
                        </div>
                    </div>
                )}
            </>
        )
    });

    if (productData.rating?.length) {
        tabItems.push({
            key: "ratings",
            label: "امتیازها",
            children: (
                <>
                    <h4 className="text-sm my-4 font-semibold"> امتیاز در وبسایت های معتبر</h4>

                    {productData.rating.map((rating, index) => (
                        <div className={`flex justify-between py-4 text-sm gap-5 ${index ? "border-t border-white/15" : ""}`} key={rating.type} >
                            <div className="whitespace-nowrap font-semibold" dir="ltr"> {rating.value}/{rating.total} </div>
                            <div className="text-left text-violet-400 font-semibold">
                                {rating.type}
                            </div>
                        </div>
                    ))}
                </>
            )
        })
    }

    return (
        <>
            <button
                type="button"
                className="text-xs text-violet-500 font-semibold flex gap-2 items-center"
                onClick={() => { props.changeActiveTab("descriptions") }}
            >
                مشاهده جزییات
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
            </button>

            <ModalPortal
                show={openDetails}
                selector='modal_portal'
            >
                <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0" onClick={() => { setSlideInDetails(false) }} />

                <div className={`bg-[#192a39] text-white rounded-t-2xl max-h-95-screen hidden-scrollbar overflow-y-auto fixed w-full md:max-w-lg safePadding-b transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2 ${slideInDetails ? "bottom-0" : "-bottom-[80vh]"}`}>
                    <Tab
                        heading={productData.name}
                        isSticky
                        navsBgClass="bg-[#192a39]"
                        items={tabItems}
                        style="3"
                        wrapperClassName="mx-3"
                        scrollTabs
                        noGrowTabs
                        activeTab={props.activeTab}
                        onChange={props.changeActiveTab}
                    />
                </div>
            </ModalPortal>

        </>
    )
}

export default ProductDetail;