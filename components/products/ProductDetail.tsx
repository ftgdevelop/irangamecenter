import { ProductDetailData } from "@/types/commerce";
import Tab from "../shared/Tab"
import { TabItem } from "@/types";
import Image from "next/image";
import { dateDiplayFormat } from "@/helpers";
import Link from "next/link";

type Props = {
    productData?: ProductDetailData;
    close: () => void;
}

const ProductDetail: React.FC<Props> = props => {

    const { productData } = props;

    const tabItems: TabItem[] = [];

    if (!productData) return null;

    if (productData.esrb || productData?.pegi) {
        tabItems.push({
            key: "1",
            label: "توضیحات",
            children: (
                <>
                    {!!productData.esrb?.name && (
                        <>
                            <div className="flex gap-2 my-4">
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
                                    رده سنی اروپا (PEGI)
                                    <b className="block font-semibold mt-2 text-xs">
                                        {productData.esrb.name}
                                    </b>
                                </div>
                            </div>
                            <div className="text-xs mb-8">
                                {productData.esrb.description}
                            </div>

                        </>
                    )}

                    {!!productData.pegi?.name && (
                        <>
                            <div className="flex gap-2 my-4">
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
                                    رده سنی اروپا (PEGI)
                                    <b className="block font-semibold mt-2 text-xs">
                                        {productData.pegi.name}
                                    </b>
                                </div>
                            </div>
                            <div className="text-xs mb-8">
                                {productData.pegi.description}
                            </div>

                        </>
                    )}

                </>
            )
        })
    }

    tabItems.push({
        key: "2",
        label: "مشخصات",
        children: (
            <>

                <h4 className="text-sm my-5 font-semibold"> مشخصات بازی</h4>

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
            key: "3",
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

    if (productData.awards?.length) {
        tabItems.push({
            key: "4",
            label: "جوایز",
            children: (
                <>
                    <h4 className="text-sm my-4 font-semibold"> جوایز و دستاوردها </h4>
                    {productData.awards.map((award, index) => (
                        <div className={`flex gap-3 items-center py-4 text-sm  font-semibold text-teal-500 ${index ? "border-t border-white/15" : ""}`} key={award} >
                            <Image src="/images/icons/award.svg" alt="award" className="w-7 h-7" width={28} height={28} />
                            {award}
                        </div>
                    ))}
                </>
            )
        })
    }

    return (
        <div className="min-h-96 flex flex-col justify-between" >
            <div>
                <h2 className="text-lg font-semibold mb-4 px-4 mt-6"> {productData.name}</h2>
                <Tab
                    items={tabItems}
                    style="3"
                    wrapperClassName="mx-3"
                    scrollTabs
                    noGrowTabs
                />
            </div>
            <div className="p-4">
                <button
                    type="button"
                    className="bg-[#011425] rounded-full px-5 py-3 text-sm"
                    onClick={props.close}
                >
                    بستن
                </button>
            </div>
        </div>
    )
}

export default ProductDetail;