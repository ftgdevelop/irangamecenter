import { ProductDetailData } from "@/types/commerce";
import Tab from "../shared/Tab"
import { TabItem } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalPortal from "../shared/layout/ModalPortal";
import Link from "next/link";
import ArrowTopLeft2 from "../icons/ArrowTopLeft2";

type Props = {
    productData?: ProductDetailData;
}

const AgeRatingDetail: React.FC<Props> = props => {

    const { productData } = props;

    const [activeItem, setActiveItem] = useState<string>("");

    const tabItems: TabItem[] = [];

    useEffect(() => {
        if (activeItem) {
            setOpenDetails(true);
        }
    }, [activeItem])

    const [openDetails, setOpenDetails] = useState<boolean>(false);
    const [slideInDetails, setSlideInDetails] = useState<boolean>(false);

    useEffect(() => {
        if (openDetails) {
            setSlideInDetails(true);
        } else {
            setActiveItem("");
        }
    }, [openDetails]);

    useEffect(() => {
        if (!slideInDetails) {
            setTimeout(() => { setOpenDetails(false) }, 300)
        }
    }, [slideInDetails])


    if (!productData) return null;

    if (productData?.pegi?.name) {
        tabItems.push({
            key: "pegi",
            label: "رده سنی اروپا (PEGI)",
            children: (
                <>
                    <div className="flex gap-3 my-4">
                        {productData?.pegi?.image && (
                            <Image
                                src={productData.pegi.image}
                                alt={productData.pegi.title || productData.pegi.name || ""}
                                width={48}
                                height={48}
                                className="w-12 h-12 text-4xs"
                            />
                        )}
                        <div>
                            <b className="block font-semibold mb-2 text-sm">
                                {productData.pegi.name}
                            </b>
                            <p className="text-xs">
                                {productData.pegi.description}
                            </p>
                        </div>
                    </div>

                    {productData.pegi.items?.map(item => (

                        <div
                            className="flex gap-3 my-4 border rounded-xl mb-5 border-white/15 p-3"
                            key={item.keyword}
                        >
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.name || ""}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 text-4xs"
                                />
                            )}
                            <div>
                                <b className="block font-semibold mb-4 text-sm">
                                    {item.name}
                                </b>
                                <p className="text-xs">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                    ))}

                </>
            )
        })
    }


    if (productData.esrb) {
        tabItems.push({
            key: "esrb",
            label: "رده سنی آمریکا (ESRB)",
            children: (
                <>
                    <div className="flex gap-3 my-4">
                        {productData?.esrb?.image && (
                            <Image
                                src={productData.esrb.image}
                                alt={productData.esrb.title || productData.esrb.name || ""}
                                width={48}
                                height={48}
                                className="w-12 h-12 text-4xs"
                            />
                        )}
                        <div>
                            <b className="block font-semibold mb-2 text-sm">
                                {productData.esrb.name}
                            </b>
                            <p className="text-xs">
                                {productData.esrb.description}
                            </p>
                        </div>
                    </div>

                    {productData.esrb.items?.map(item => (

                        <div
                            className="flex gap-3 my-4 border rounded-xl mb-5 border-white/15 p-3"
                            key={item.keyword}
                        >
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.name || ""}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 text-4xs"
                                />
                            )}
                            <div>
                                <b className="block font-semibold mb-4 text-sm">
                                    {item.name}
                                </b>
                                <p className="text-xs">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                    ))}

                </>
            )
        })
    }


    const hasPegi = productData.pegi;
    const hasEsrb = productData.esrb;

    return (
        <>
            {!!(hasPegi || hasEsrb) && (
                <div className={`${hasPegi && hasEsrb ? "grid grid-cols-2" : ""}`}>

                    {!!productData.pegi && (
                        <button
                            className={`block border border-white/15 p-2.5 text-xs mt-5 ${productData.esrb ? "rounded-r-xl border-l-0" : "rounded-xl"}`}
                            type="button"
                            onClick={() => { setActiveItem("pegi") }}
                        >
                            <div className="flex gap-1 justify-center">
                                {productData?.pegi?.image && (
                                    <Image
                                        src={productData.pegi.image}
                                        alt={productData.pegi.title || productData.pegi.name || ""}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 text-4xs"
                                    />
                                )}
                                <div className="w-40">
                                    رده سنی اروپا (PEGI)
                                    <b className="block font-semibold mt-2 text-xs">
                                        {productData.pegi.name}
                                    </b>
                                </div>
                            </div>
                        </button>
                    )}

                    {!!productData.esrb && (
                        <button
                            className={`block border border-white/15 p-2.5 text-xs mt-5 ${productData.pegi ? "rounded-l-xl" : "rounded-xl"}`}
                            type="button"
                            onClick={() => { setActiveItem("esrb") }}
                        >
                            <div className="flex gap-1 justify-center">
                                {productData?.esrb?.image && (
                                    <Image
                                        src={productData.esrb.image}
                                        alt={productData.esrb.title || productData.esrb.name || ""}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 text-4xs"
                                    />
                                )}
                                <div className="w-40">
                                    رده سنی آمریکا (ESRB)
                                    <b className="block font-semibold mt-2 text-xs">
                                        {productData.esrb.name}
                                    </b>
                                </div>
                            </div>
                        </button>
                    )}

                </div>
            )}

            <ModalPortal
                show={openDetails}
                selector='modal_portal'
            >
                <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0" onClick={() => { setSlideInDetails(false) }} />

                <div className={`bg-[#192a39] text-white rounded-t-2xl max-h-95-screen hidden-scrollbar overflow-y-auto fixed w-full md:max-w-lg safePadding-b transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2 ${slideInDetails ? "bottom-0" : "-bottom-[80vh]"}`}>
                    <div className="min-h-96 flex flex-col justify-between" >
                        <div>
                            <h2 className="text-lg font-semibold mb-4 px-4 mt-6"> رده‌بندی سنی</h2>
                            <Tab
                                items={tabItems}
                                style="3"
                                wrapperClassName="mx-3"
                                scrollTabs
                                noGrowTabs
                                activeTab={activeItem}
                                onChange={(key) => { setActiveItem(key.toString()) }}
                            />
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <button
                                type="button"
                                className="bg-[#011425] rounded-full px-5 py-3 text-sm"
                                onClick={() => { setSlideInDetails(false) }}
                            >
                                بستن
                            </button>
                            <Link
                                href={"#"}
                                className="text-xs flex items-center justify-center gap-2 grow font-semibold text-violet-400"
                            >
                                <ArrowTopLeft2 className="w-4 h-4 fill-current" />
                                توضیحات بیشتر
                            </Link>
                        </div>
                    </div>

                </div>
            </ModalPortal>

        </>
    )
}

export default AgeRatingDetail;