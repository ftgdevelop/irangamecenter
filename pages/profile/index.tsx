import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/use-store";
import Skeleton from "@/components/shared/Skeleton";
import { numberWithCommas, toPersianDigits } from "@/helpers";
import Link from "next/link";
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import Logout from "@/components/authentication/Logout";
import LoadingFull from "@/components/shared/LoadingFull";
import Loading from "@/components/icons/Loading";


export default function Profile() {

  const router = useRouter();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const userInfo = useAppSelector(state => state.authentication.user);
  const userLoading = useAppSelector(state => state.authentication.getUserLoading);

  const userBalanceLoading = useAppSelector(state => state.authentication.balanceLoading);
  const userBalance = useAppSelector(state => state.authentication.balance);

  useEffect(() => {
    let redirectTimout: undefined | NodeJS.Timeout;
    if (!isAuthenticated && !userLoading) {
      redirectTimout = setTimeout(() => {
        router.push("/login");
      }, 500);
    }

    return (() => {
      clearTimeout(redirectTimout);
    })

  }, [isAuthenticated, userLoading, router]);


  if (!userInfo && !userLoading) {
    return null;
  }

  let fullName: string = "";
  if (userInfo?.firstName) {
    fullName += userInfo.firstName;
  }
  if (userInfo?.lastName) {
    fullName += ` ${userInfo.lastName}`;
  }

  const userName = toPersianDigits(userInfo?.userName || "");

  const items: {
    title: string;
    label: ReactNode;
    href: string;
    iconUrl: string;
  }[] = [
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
            {userInfo?.emailAddress && !userInfo.isEmailConfirmed ? <Image src="/images/icons/error.svg" alt="error" className="w-4 h-4" width={16} height={16} /> : null}
          </span>
        ),
        title: "اطلاعات کاربری"
      },
      {
        href: "/profile/change-password",
        iconUrl: "/images/icons/2color/password-2.svg",
        label: "مدیریت کلمه عبور",
        title: "مدیریت کلمه عبور"
      }
    ]

  if (userLoading && !isAuthenticated) {
    return (
      <LoadingFull />
    )
  }

  return (
    <>
      <div className="p-3.5 flex gap-5 items-center">
        <Image src="/logo.svg" alt="irangamecenter" width="40" height="40" />
        <strong className="block text-xl font-bold text-[#ff7189]"> پروفایل </strong>
      </div>
      <div className="px-3.5">

        <Link href="/profile/edit" className="bg-white bg-gradient-to-t from-[#ffe59a] to-[#feffd5] rounded-full flex justify-center items-center gap-2 px-5 py-0.5 text-black font-semibold text-3xs">
          <Image src="/images/icons/error.svg" alt="error" className="w-6 h-6" width={24} height={24} />
          لطفا اطلاعات کاربری را تکمیل نمایید!
        </Link>

        <div className="rounded-t-xl bg-[#181d3a] flex items-center gap-3 p-4 mt-4 mb-1.5 text-sm">
          <Image src="/images/icons/user-gradient.svg" alt="avatar" className="w-10 h-10" width={40} height={40} />
          {userLoading ? (
            <Skeleton className="w-2/5" />
          ) : (
            <span dir={fullName.trim().length ? "rtl" : "ltr"}>
              {fullName.trim().length ? fullName : userName}
            </span>
          )}
        </div>


        <Link href="/profile/wallet" className="p-3 block bg-gradient-to-t from-[#01212e] to-[#102c33]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center text-xs" >
              <Image
                src="/images/icons/2color/wallet-2.svg"
                alt="wallet icon"
                className="w-7 h-7 grow-0 shrink-0"
                width={28}
                height={28}
              />
              کیف پول
              {userBalanceLoading ? (
                <Loading className="w-5 h-5 fill-current animate-spin" />
              ) : userBalance ? (
                <div className="text-green-400 text-xs font-semibold">
                  {numberWithCommas(userBalance)} تومان
                </div>) : <div className="text-green-400 text-xs font-semibold"> 0 </div>}
            </div>

            <Image src="/images/icons/greenCirclePlus.svg" alt="wallet" className="w-10 h-10" width={24} height={24} />

          </div>
        </Link>

        {items.map(item => (
          <Link
            key={item.title}
            href={item.href}
            className="flex gap-3 items-center pr-3 rounded-xl"
          >
            <Image
              src={item.iconUrl}
              alt={item.title}
              className="w-7 h-7 grow-0 shrink-0"
              width={28}
              height={28}
            />
            <div className="grow flex justify-between items-center px-3 py-5 border-b border-white/10 text-xs">
              {item.label}
              <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
            </div>
          </Link>
        ))}

        <Logout />

      </div>

    </>
  );
}
