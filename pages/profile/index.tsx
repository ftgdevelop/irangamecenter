import Image from "next/image";
import ArrowRight from "@/components/icons/ArrowRight";
import LoginOtp from "@/components/authentication/LoginOtp";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginWithPassword from "@/components/authentication/LoginWithPassword";
import { useAppSelector } from "@/hooks/use-store";
import Skeleton from "@/components/shared/Skeleton";
import { toPersianDigits } from "@/helpers";
import Link from "next/link";
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import Logout from "@/components/authentication/Logout";


export default function Profile() {

  const router = useRouter();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const userInfo = useAppSelector(state => state.authentication.user);
  const userLoading = useAppSelector(state => state.authentication.getUserLoading);

  useEffect(() => {
    if (!isAuthenticated && !userLoading) {
      router.push("/login");
      //to do: fix bug in redirect
    }
  }, [isAuthenticated, userLoading]);

  const [loginType, setLoginType] = useState<"otp" | "password">("otp");

  const closeLoginHandle = () => {
    router.push("/");
  }



  if (!userInfo && !userLoading) {
    return null;
  }

  let fullName: string = "";
  if (userInfo?.firstName) {
    fullName += userInfo.firstName;
  }
  if (userInfo?.lastName) {
    fullName += ` ${userInfo.firstName}`;
  }

  const userName = toPersianDigits(userInfo?.userName || "");

  const items: {
    title: string;
    label: ReactNode;
    href: string;
    iconUrl: string;
    leftIcon?: string;
  }[] = [
      {
        href: "#",
        iconUrl: "/images/icons/2color/wallet-2.svg",
        label: "کیف پول",
        title: "کیف پول",
        leftIcon : "/images/icons/greenCirclePlus.svg"
      },
      {
        href: "#",
        iconUrl: "/images/icons/2color/cart-2.svg",
        label: "سفارش های من",
        title: "سفارش های من"
      },
      {
        href: "#",
        iconUrl: "/images/icons/2color/heart-2.svg",
        label: "مورد علاقه ها",
        title: "مورد علاقه ها"
      },
      {
        href: "#",
        iconUrl: "/images/icons/2color/off-2.svg",
        label: "کد تخفیف",
        title: "کد تخفیف"
      },
      {
        href: "/profile/edit",
        iconUrl: "/images/icons/2color/user-2.svg",
        label: (
          <span className="flex gap-2">
            اطلاعات کاربری
            <Image src="/images/icons/error.svg" alt="error" className="w-4 h-4" width={16} height={16} />
          </span>
        ),
        title: "اطلاعات کاربری"
      },
      {
        href: "#",
        iconUrl: "/images/icons/2color/password-2.svg",
        label: "مدیریت کلمه عبور",
        title: "مدیریت کلمه عبور"
      }
    ]

  return (
    <>
      <div className="p-3.5 flex gap-5 items-center">
        <Image src="/logo.svg" alt="irangamecenter" width="40" height="40" />
        <strong className="block text-xl font-bold text-[#ff7189]"> پروفایل </strong>
      </div>
      <div className="px-3.5">

        <div className="bg-white bg-gradient-to-t from-[#ffe59a] to-[#feffd5] rounded-full flex justify-center items-center gap-2 px-5 py-0.5 text-black font-semibold text-3xs">
          <Image src="/images/icons/error.svg" alt="error" className="w-6 h-6" width={24} height={24} />
          لطفا اطلاعات کاربری را تکمیل نمایید!
        </div>

        <div className="rounded-t-xl bg-[#181d3a] flex items-center gap-3 p-4 py-5 mt-4 mb-2">
          <Image src="/images/icons/user-gradient.svg" alt="avatar" className="w-10 h-10" width={40} height={40} />
          {userLoading ? (
            <Skeleton className="w-2/5" />
          ) : (
            <span dir={fullName.trim().length ? "rtl" : "ltr"}>
              {fullName.trim().length ? fullName : userName}
            </span>
          )}
        </div>

        {items.map(item => (
          <Link
            key={item.title}
            href={item.href}
            className="flex gap-3 items-center pr-5 rounded-xl"
          >
            <Image
              src={item.iconUrl}
              alt={item.title}
              className="w-7 h-7 grow-0 shrink-0"
              width={28}
              height={28}
            />
            <div className="grow flex justify-between items-center px-3 py-5 border-b border-white/10 text-sm">
              {item.label}

              {item.leftIcon ? (
                <Image src={item.leftIcon} alt={item.title} className="w-10 h-10" width={24} height={24} />
              ) :(
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
              )}
            </div>
          </Link>
        ))}

        <Logout />

      </div>

    </>
  );
}
