import Image from "next/image";
import Tab from "../shared/Tab";
import Add from "../icons/Add";
import { ProductItem } from "@/types/commerce";
import React from "react";
import ProductListItem from "../products/ProductListItem";
import Link from "next/link";

type Props = {
    products : ProductItem[];
};

const BestSellers:React.FC<Props> = props => {

    const content = (
        <div className="py-5">

            {props.products?.map(item => <ProductListItem product={item} key={item.id} /> )}

            <Link
                href="/products"
                className="text-sm text-[#ca54ff] bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3 "
            >
                <Add />
                محصولات بیشتر
            </Link>
        </div>
    );

    return (
        <section className="py-6">

            <h3 className="px-3 text-[#ca54ff] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/joystick.svg" alt="best sellers" width={36} height={36} className="w-9 h-9" />
                محصولات پرفروش
            </h3>

            <Tab
                items={[
                    { key: 1, children: content, label: "کالاف دیوتی" },
                    { key: 2, children: "پلی استیشن", label: "پلی استیشن" },
                    { key: 3, children: "پابجی موبایل", label: "پابجی موبایل" },
                    { key: 4, children: "ایکس باکس", label: "ایکس باکس" },
                    { key: 5, children: "پابجی موبایل", label: "پابجی موبایل" },
                    { key: 6, children: "ایکس باکس", label: "ایکس باکس" }
                ]}
                style="3"
                wrapperClassName="mx-3"
                scrollTabs
            />


        </section>
    )
}

export default BestSellers;