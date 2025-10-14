import { ServerAddress } from "@/enum/url";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    items: {
        Url?: string;
        Title?: string;
        ImageAlternative?: string;
        ImageTitle?: string;
        id: number;
        Image?: {
            url?: string;
        }
    }[];
    title?: string;
}

const Categories: React.FC<Props> = props => {

    if (props.items.length) {
        return (
            <section className="flex gap-2 py-3">
                <div className="bg-red-600 text-sm writing-tb rotate-180 px-2 py-5 rounded-r-xl flex items-center justify-center gap-3">
                    <Image src="/images/icons/squares.svg" alt="categories" width={24} height={24} className="w-6 h-6" />
                    {props.title || "دسته بندی ها"}
                </div>
                <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 lg:-mb-3 overflow-x-auto overflow-y-clip">
                    <div className="grid grid-rows-2 grid-flow-col gap-y-2">
                        {props.items.filter(item=>item.Image?.url).map(item => (
                            <div key={item.id} className="pl-2">
                                <Link href={item.Url||"#"} className="block w-36">
                                    <Image src={ServerAddress.Type!+ServerAddress.Strapi+item.Image!.url!} alt={item.ImageAlternative || item.Title || ""} width={100} height={70} className="w-36 h-20 object-cover rounded-2xl" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return null;

}

export default Categories;