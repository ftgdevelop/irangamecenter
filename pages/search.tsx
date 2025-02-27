import Search from "@/components/shared/Search";
import Add from "@/components/icons/Add";
import Link from "next/link";
import Image from "next/image";
import { numberWithCommas, toPersianDigits } from "@/helpers";

export default function SearchResult() {

  const items: {
    image: string;
    imageAlt?: string;
    title: string;
    url: string;
    price: number;
    oldPrice?: number;
    discountPercentage?: number;
  }[] = [
      {
        url: "#",
        title: "خرید 10000 cp کال اف دیوتی موبایل",
        image: "/mock-images/pro1.jpg",
        imageAlt: "",
        price: 2559000,
        oldPrice: 2959000,
        discountPercentage: 10
      },
      {
        url: "#",
        title: "گیفت کارت 50 دلاری نینتندو",
        image: "/mock-images/pro2.jpg",
        price: 4000000,
        oldPrice: 4200000,
        discountPercentage: 5
      },
      {
        url: "#",
        title: "شارژ اکانت پلی استیشن پلاس یکساله",
        image: "/mock-images/pro3.jpg",
        price: 2559000,
        discountPercentage: 0
      },
      {
        url: "#",
        title: "گیفت کارت 50 دلاری نینتندو",
        image: "/mock-images/pro2.jpg",
        price: 4000000,
        oldPrice: 4200000,
        discountPercentage: 5
      },
      {
        url: "#",
        title: "گیفت کارت 50 دلاری نینتندو",
        image: "/mock-images/pro2.jpg",
        price: 4000000,
        oldPrice: 4200000,
        discountPercentage: 5
      },
      {
        url: "#",
        title: "شارژ اکانت پلی استیشن پلاس یکساله",
        image: "/mock-images/pro3.jpg",
        price: 2559000,
        discountPercentage: 8
      },
      {
        url: "#",
        title: "گیفت کارت 50 دلاری نینتندو",
        image: "/mock-images/pro2.jpg",
        price: 4000000,
        oldPrice: 4200000,
        discountPercentage: 5
      }

    ];

  return (
    <>
      <Search />

      <div className="p-3">
        {items.map(item => (
          <div
            key={item.title}
            className="mb-4"
          >
            <Link
              href="#"
              className="flex"
            >

              <Image
                src={item.image}
                alt={item.imageAlt || item.title}
                width={160}
                height={160}
                className="block w-32 h-32 rounded-2xl"
              />

              <div className="p-2.5">
                <h4 className="text-xs mb-5"> {toPersianDigits(item.title)} </h4>
                <div className="flex gap-3 items-end pb-1">
                  {!!item.discountPercentage && (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 text-center pt-2 font-bold text-sm">
                      {toPersianDigits(item.discountPercentage?.toString())}
                      %
                    </div>
                  )}

                  <div className="text-xs text-left">
                    {item.oldPrice && (
                      <div className="text-[11px] mb-1 line-through">{numberWithCommas(item.oldPrice)} تومان </div>
                    )}
                    {numberWithCommas(item.price)} تومان
                  </div>

                </div>
              </div>
            </Link>
          </div>
        ))}

        <button
          type="button"
          className="text-sm text-[#ca54ff] bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3 "
        >
          <Add />
          محصولات بیشتر
        </button>
      </div>

    </>
  );
}
