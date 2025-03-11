import { useAppSelector } from "@/hooks/use-store"
import Image from "next/image";
import Link from "next/link"

const FooterNavigation = () => {

    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const items: {
        label: string;
        href: string;
        imageUrl: string;
        active: boolean;
    }[] = [
            {
                label: "فروشگاه",
                href: "/",
                imageUrl: "/images/icons/shop.svg",
                active: false
            },
            {
                label: "دسته بندی ها",
                href: "/categories",
                imageUrl: "/images/icons/squares.svg",
                active: false
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
                active: true
            }
        ];

    return (
        <>
        <div className="pb-20" />
        <div className="fixed bottom-0 left-0 right-0 z-10">
            <nav
                className="max-w-lg mx-auto flex bg-[#192b39]"
            >
                {items.map(item => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`basis-1/4 rounded-xl py-3  text-2xs text-center ${item.active ? " bg-[#2e3e4b]" : ""}`}
                    >
                        <Image src={item.imageUrl} alt={item.label} className="block mx-auto mb-2" width={30} height={30} />
                        <span>
                            {item.label}
                        </span>

                    </Link>
                ))}

            </nav>
        </div>
        </>
    )
}

export default FooterNavigation;