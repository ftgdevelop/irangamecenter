import { useAppSelector } from "@/hooks/use-store"
import Image from "next/image";
import Link from "next/link"
import Skeleton from "../../Skeleton";
import { useRouter } from "next/router";

const FooterNavigation = () => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const userInfoLoading = useAppSelector(state => state.authentication.getUserLoading);
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const router = useRouter();
  const { asPath } = router;

  const items = [
    { label: "فروشگاه", href: "/", imageUrl: "/images/icons/shop.svg", active: asPath === "/" },
    { label: "دسته بندی ها", href: "/products", imageUrl: "/images/icons/squares.svg", active: asPath === "/products" },
    { label: "سفارش های من", href: "/cart", imageUrl: "/images/icons/cart.svg", active: asPath === "/cart" },
    { label: "پروفایل", href: isAuthenticated ? "/profile" : "/login", imageUrl: "/images/icons/profile.svg", active: asPath.includes("/profile"), loading: userInfoLoading }
  ];

  return (
    <>
      <div className="pb-20" />
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <nav className="md:max-w-lg md:mx-auto flex bg-[#192b39]">
          {items.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative basis-1/4 rounded-xl py-3 text-2xs flex flex-col justify-center items-center ${item.active ? "bg-[#2e3e4b]" : ""} ${item.loading ? "pointer-events-none" : ""}`}
            >
              <div className="relative w-fit">
                <Image src={item.imageUrl} alt={item.label} className="block mx-auto mb-2" width={26} height={26} />
                {item.label === "سفارش های من" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              {item.loading ? <Skeleton className="w-12 h-4 mx-auto" /> : item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default FooterNavigation;