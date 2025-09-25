import { useAppSelector } from "@/hooks/use-store"
import Image from "next/image";
import Link from "next/link"
import Skeleton from "../../Skeleton";
import { useRouter } from "next/router";

const FooterNavigation = () => {

    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const userInfoLoading = useAppSelector(state => state.authentication.getUserLoading);

    const router = useRouter();
    const {asPath} = router;

    const items: {
        label: string;
        href: string;
        imageUrl: string;
        active: boolean;
        loading?: boolean;
    }[] = [
            {
                label: "فروشگاه",
                href: "/",
                imageUrl: "/images/icons/shop.svg",
                active: asPath === "/"
            },
            {
                label: "دسته بندی ها",
                href: "/products",
                imageUrl: "/images/icons/squares.svg",
                active: asPath === "/products"
            },
            {
                label: "سفارش های من",
                href: isAuthenticated ? "/cart" : "/login",
                imageUrl: "/images/icons/cart.svg",
                active: false
            },
            {
                label: "پروفایل",
                href: isAuthenticated ? "/profile" : "/login",
                imageUrl: "/images/icons/profile.svg",
                active: asPath.includes("/profile"),
                loading:userInfoLoading
            }
        ];

    return (
        <>
            <div className="pb-20" />
            <div className="fixed bottom-0 left-0 right-0 z-10">
                <nav
                    className="md:max-w-lg md:mx-auto flex bg-[#192b39]"
                >
                    {items.map(item => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`basis-1/4 rounded-xl py-3  text-2xs text-center ${item.active ? " bg-[#2e3e4b]" : ""} ${item.loading ? "pointer-events-none": ""}`}
                        >
                            <Image src={item.imageUrl} alt={item.label} className="block mx-auto mb-2" width={26} height={26} />
                            
                            {item.loading ? <Skeleton className="w-12 h-4 mx-auto" /> :  item.label}

                        </Link>
                    ))}

                </nav>
            </div>
        </>
    )
}

export default FooterNavigation;