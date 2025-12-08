import Image from "next/image";
import Tab from "../shared/Tab";
import Add from "../icons/Add";
import { ProductItem } from "@/types/commerce";
import React from "react";
import ProductListItem from "../products/ProductListItem";
import Link from "next/link";
import { TabItem } from "@/types";
import { setProgressLoading } from "@/redux/stylesSlice";
import { useAppDispatch } from "@/hooks/use-store";

type Props = {
    playstation5Products?: ProductItem[];
    playstation4Products?: ProductItem[];
    steamProducts?: ProductItem[];
    xboxOneProducts?: ProductItem[];
    xboxSeriesXsProducts?: ProductItem[];
};

const BestSellers: React.FC<Props> = props => {
    
    const dispatch = useAppDispatch();

    const items: {
        products: ProductItem[];
        slug: string;
        label: string;
    }[] = [];

    if (props.playstation5Products?.length) {
        items.push({
            slug: "playstation-5",
            label: "Playstation 5",
            products: props.playstation5Products
        })
    }
    if (props.playstation4Products?.length) {
        items.push({
            slug: "playstation-4",
            label: "Playstation 4",
            products: props.playstation4Products
        })
    }
    if (props.steamProducts?.length) {
        items.push({
            slug: "steam",
            label: "Steam",
            products: props.steamProducts
        })
    }
    if (props.xboxOneProducts) {
        items.push({
            slug: "xbox-one",
            label: "Xbox one",
            products: props.xboxOneProducts
        })
    }
    if (props.xboxSeriesXsProducts) {
        items.push({
            slug: "xbox-series-xs",
            label: "Xbox Series X/S",
            products: props.xboxSeriesXsProducts
        })
    }

    const tabItems: TabItem[] = items.map(item => ({
        label: item.label,
        key: item.label,
        children: (<div className="py-5">

            {item.products.map(i => <ProductListItem onClick={()=>{dispatch(setProgressLoading(true))}} product={i} key={i.id} />)}

            <Link
                href={`/products/variants-${item.slug}`}
                onClick={()=>{dispatch(setProgressLoading(true));}}
                className="text-sm text-white dark:text-[#ca54ff] bg-[#ca54ff] dark:bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3"
            >
                <Add />
                محصولات بیشتر
            </Link>
        </div>)
    }))

    return (
        <section className="py-6">

            <h3 className="px-3 text-[#ca54ff] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/joystick.svg" alt="best sellers" width={36} height={36} className="w-9 h-9" />
                محصولات پرفروش
            </h3>

            <Tab
                items={tabItems}
                style="3"
                wrapperClassName="mx-3"
                scrollTabs
            />

        </section>
    )
}

export default BestSellers;