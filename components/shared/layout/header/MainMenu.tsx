import Menu from "@/components/icons/Menu";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import ModalPortal from "../ModalPortal";
import CloseSimple from "@/components/icons/CloseSimple";

const MainMenu: React.FC = () => {

    const items: {
        label: string;
        url: string;
    }[] = [
            { label: "دسته بندی ها", url: "#" },
            { label: "پیگیری سفارش", url: "#" },
            { label: "راهنمای ثبت سفارش", url: "#" },
            { label: "قوانین و مقررات", url: "/terms" },
            { label: "سوالات متداول", url: "/faq" },
            { label: "درباره ما", url: "/about" },
            { label: "تماس با ما", url: "/contact" }
        ];


    const [open, setOpen] = useState<boolean>(false);

    const [delayedOpen, setDelayedOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setDelayedOpen(true)
        }
    }, [open]);

    useEffect(() => {
        if (!delayedOpen) {
            setTimeout(() => { setOpen(false) }, 300)
        }
    }, [delayedOpen]);

    return (
        <Fragment>
            <button
                aria-label="main menu button"
                type="button"
                className="outline-none border-none"
                onClick={() => { setOpen(true) }}
            >
                <Menu className="w-8 h-8 fill-white" />
            </button>

            <ModalPortal
                show={open}
                selector='menu_portal'
            >
                <div className="md:max-w-lg md:mx-auto relative">

                    <div
                        className={`bg-black/75 absolute top-0 left-0 w-full h-screen transition-all ${delayedOpen ? "opacity-100" : "opacity-0"}`}
                        onClick={() => { setDelayedOpen(false) }}
                    />

                    <div className="overflow-hidden absolute h-screen left-0 top-0 w-5/6">
                        <div className={`bg-[#fafafa] text-[#333333] dark:bg-[#011425] dark:text-white h-screen rounded-r-2xl overflow-x-hidden overflow-y-auto transition-all ${delayedOpen ? "translate-x-0" : "-translate-x-full"}`}>
                            <div className="flex justify-between bg-[#e5e5e5] dark:bg-[#192a39] p-3.5">
                                <div className="flex gap-4">
                                    <Image src="/logo.svg" alt="irangamecenter" width={50} height={50} />
                                    <div>
                                        <strong className="block text-xl font-bold">
                                            ایران گیم سنتر
                                        </strong>
                                        <span className="text-xs">
                                            فروشگاه آنلاین اکانت بازی
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className=""
                                    onClick={() => { setDelayedOpen(false) }}
                                >
                                    <CloseSimple className=" w-8 h-8 fill-red-500 dark:fill-neutral-300" />
                                </button>
                            </div>


                            <nav className="px-3.5">
                                {items.map((item, index) => (
                                    <Link 
                                        prefetch={false}
                                        onClick={()=>{setDelayedOpen(false)}}
                                        key={item.label}
                                        href={item.url} 
                                        className={`block py-5 border-neutral-300 dark:border-white/15 text-sm ${index ? "border-t" : ""}`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                        </div>
                    </div>

                </div>
            </ModalPortal>

        </Fragment>
    )
}
export default MainMenu;