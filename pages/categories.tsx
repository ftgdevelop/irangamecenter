/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";

const Categories: NextPage = () => {

    const mockCategories: {
        name: string;
        img: string;
        keyword: string;
    }[] = [
            { keyword: "call-of", img: "/mock-images/categories/call-of.png", name: "کال آف دیوتی موبایل" },
            { keyword: "pubg", img: "/mock-images/categories/pubg.png", name: "پابجی" },
            { keyword: "ps", img: "/mock-images/categories/ps.png", name: "پلی استیشن" },
            { keyword: "google-play", img: "/mock-images/categories/google-play.png", name: "گوگل پلی" },
            { keyword: "clash", img: "/mock-images/categories/clash.png", name: "کلش آف کلنز" },
            { keyword: "netflix", img: "/mock-images/categories/netflix.png", name: "نتفلیکس" }
        ];

    const mockItems: {
        name: string;
        img: string;
    }[] = [
            { img: "/mock-images/categories/item(1).png", name: "بازی های پلی استیشن" },
            { img: "/mock-images/categories/item(2).png", name: "گیفت کارت پلی استیشن" },
            { img: "/mock-images/categories/item(3).png", name: "پلاس پلی استیشن" },
            { img: "/mock-images/categories/item(4).png", name: "اشتراک ها و سرویس ها" },
            { img: "/mock-images/categories/item(5).png", name: "لوازم جانبی پلی استیشن" },
            { img: "/mock-images/categories/item(6).png", name: "کنسول ها و باندل ها" },
        ];

    const [selectedCat, setSelectedCat] = useState(mockCategories[0].keyword);

    return (
        <>
            <Head>
                <title>{"PostTitle"}</title>
            </Head>

            <div className="grid grid-cols-4 gap-2">
                <div className="">
                    <div className="sticky top-2">

                        {mockCategories.map(cat => (
                            <button
                                key={cat.keyword}
                                type="button"
                                onClick={() => { setSelectedCat(cat.keyword) }}
                                className={`p-2 rounded-l-xl ${selectedCat === cat.keyword ? "bg-white text-neutral-800" : "bg-[#192b39] text-white"} text-center mb-3 text-2xs block w-full relative`}
                            >
                                <span className={`absolute block h-full w-1.5 right-0 top-0 ${selectedCat === cat.keyword ? "bg-gradient-to-t from-[#fe707b] to-[#ff9b91]" : "bg-transparent"}`} />
                                <Image src={cat.img} alt={cat.name} title={cat.name} width={94} height={32} className="w-full h-8  block mb-2 object-contain px-2" />
                                {cat.name}
                            </button>
                        ))}


                        {[1, 2].map(item => (
                            <div key={item} className="block text-center bg-[#192a39] rounded-l-xl p-3 mb-3" >
                                <div className="bg-[#475561] rounded-full w-7 h-7 mb-2 mx-auto" />
                                <div className="bg-[#475561] rounded-full w-20 max-w-full mx-auto h-3" />
                            </div>
                        ))}

                    </div>
                </div>
                <div className="col-span-3 sticky top-0">
                    <div className="sticky top-2 px-3 py-5">
                        <div className="text-left">
                            <Link
                                href={"#"}
                                className="border px-3 py-2 rounded-full inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
                            >
                                همه محصولات پلی استیشن
                                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3 py-5">
                            {mockItems.map(item => (
                                <Link
                                    key={item.name}
                                    href={"#"}
                                    className="text-xs block text-center bg-white rounded-xl p-4 text-black"
                                >
                                    <Image src={item.img} alt={item.name} width={100} height={100} className="w-12 h-12 block mb-2 mx-auto" />
                                    {item.name}
                                </Link>
                            ))}

                            {[1, 2, 3, 4].map(item => (
                                <div key={item} className="block text-center bg-[#192a39] rounded-xl p-4" >
                                    <div className="bg-[#475561] rounded-full w-10 h-10 mb-3 mx-auto" />
                                    <div className="bg-[#475561] rounded-full w-20 max-w-full mx-auto h-3" />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export async function getServerSideProps() {
    return (
        {
            props: {
                test: "test"
            }
        }
    )
}


export default Categories;