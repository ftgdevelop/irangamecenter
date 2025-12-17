import Menu from "@/components/icons/Menu";
import Link from "next/link";
import { Fragment, ReactNode, useEffect, useState } from "react";
import ModalPortal from "../ModalPortal";
import CloseSimple from "@/components/icons/CloseSimple";
import Home from "@/components/icons/Home";
import CaretLeft from "@/components/icons/CaretLeft";
import UserCircle from "@/components/icons/UserCircle";
import { useAppSelector } from "@/hooks/use-store";
import DarkModeSwitch from "./DarkModeSwitch";
import StarOutline from "@/components/icons/StarOutline";
import Category from "@/components/icons/Category";
import CartOutline from "@/components/icons/CartOutline";
import InfoCircleOutline from "@/components/icons/InfoCircleOutline";
import GameOutline from "@/components/icons/GameOutline";
import Phone from "@/components/icons/Phone";
import Faq from "@/components/icons/Faq";
import Skeleton from "../../Skeleton";

const MainMenu: React.FC = () => {

    const userLoading = useAppSelector(state => state.authentication.getUserLoading);
    const user = useAppSelector(state => state.authentication.user);

    const items: {
        label: string;
        url: string;
        icon : ReactNode;
    }[] = [
        {
            url:"/",
            label:"فروشگاه",
            icon: <Home className="w-5 h-5 fill-current" />
        },
        {
            url:"/products",
            label:"پیشنهادهای ویژه",
            icon: <StarOutline className="w-5 h-5 fill-none stroke-current" />
        },
        {
            url:"/categories",
            label:"دسته بندی ها",
            icon: <Category className="w-5 h-5 fill-none stroke-current" />
        },
        {
            url:"/profile/orders",
            label:"سفارش های من",
            icon: <CartOutline className="w-5 h-5 fill-none stroke-current" />
        },
        {
            url:"/terms",
            label:"قوانین و راهنما",
            icon: <InfoCircleOutline className="w-5 h-5 fill-none stroke-current" />
        },
        {
            url:"/faq",
            label:"سوالات متداول",
            icon: <Faq className="w-5 h-5 fill-none stroke-current" />
        },
        {
            url:"/about",
            label:"درباره ما",
            icon: <GameOutline className="w-5 h-5 fill-current" />
        },
        {
            url:"/contact",
            label:"تماس با ما",
            icon: <Phone className="w-5 h-5 fill-none stroke-current" />
        }
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

                    <div className="overflow-hidden absolute h-screen left-0 top-0 w-11/12">

                        <div className={`flex h-screen rounded-r-2xl overflow-x-hidden overflow-y-auto transition-all ${delayedOpen ? "translate-x-0" : "-translate-x-full"}`}>

                            <div className="w-10 shrink-0" onClick={() => { setDelayedOpen(false) }}>
                                <button
                                    type="button"
                                    className="mt-5"
                                >
                                    <CloseSimple className=" w-9 h-9 fill-red-500 dark:fill-neutral-300" />
                                </button>
                            </div>
                            <div className="grow h-screen bg-[#fafafa] text-[#333333] dark:bg-[#192b39] dark:text-white">
                                <div className="h-svh flex flex-col safePadding-b">
                                    {userLoading ?(
                                        <div className="relative flex items-center justify-between bg-[#e5e5e5] dark:bg-[#2b2f4c] p-5 rounded-b-2xl">
                                            <div className="flex gap-3 items-center">
                                                <UserCircle className="w-8 h-8 fill-current" />
                                                <Skeleton className="w-16 h-4" />
                                            </div>
                                            <div className="flex gap-3 items-center text-sm">
                                                <Skeleton className="w-16 h-4" />
                                                <CaretLeft className="w-4 h-4 fill-current" />
                                            </div>
                                        </div>                                            
                                    ): user?(
                                        <div className="relative flex items-center justify-between bg-[#e5e5e5] dark:bg-[#2b2f4c] p-5 rounded-b-2xl">
                                            <div className="flex gap-3 items-center">
                                                <UserCircle className="w-8 h-8 fill-[#bd55ec]" />
                                                <span className="text-sm" dir="ltr"> {user.phoneNumber?.replace("+98","0")} </span>
                                            </div>
                                            <Link prefetch={false} href={"/profile"} className="flex gap-3 items-center text-sm">
                                                پروفایل
                                                <CaretLeft className="w-4 h-4 fill-current" />
                                            </Link>
                                        </div>                                            
                                    ):(
                                        <Link href={"/login"} prefetch={false} className="relative flex items-center justify-between bg-[#e5e5e5] dark:bg-[#2b2f4c] py-4 px-5 rounded-b-2xl">
                                            <div className=" flex gap-3 items-center text-sm">
                                                <UserCircle className="w-8 h-8 fill-current" />
                                                ورود یا ثبت نام
                                            </div>
                                            <CaretLeft className="w-4 h-4 fill-current" />
                                        </Link>
                                    )}
                                
                                    <nav className="px-3 grow">
                                        {items.map((item, index) => (
                                            <Link 
                                                prefetch={false}
                                                onClick={()=>{setDelayedOpen(false)}}
                                                key={item.label}
                                                href={item.url} 
                                                className={`flex justify-between items-center px-2 py-4 border-neutral-300 dark:border-white/15 text-sm ${index ? "border-t" : ""}`}
                                            >
                                                <span className="flex gap-3 items-center">
                                                    {item.icon}
                                                    {item.label}
                                                </span>
                                                <CaretLeft className="w-4 h-4 fill-current" />
                                            </Link>
                                        ))}
                                    </nav>

                                    <div className="flex justify-between items-center p-4 text-sm">
                                        تنظیمات نمایش
                                        <DarkModeSwitch />
                                    </div>
                                </div>
                             
                            </div>

                        </div>
                    </div>

                </div>
            </ModalPortal>

        </Fragment>
    )
}
export default MainMenu;