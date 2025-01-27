import Image from "next/image";
import Link from "next/link";

const Categories = () => {

    const items: {
        image: string;
        alt: string;
    }[] = [
            {
                image: "/mock-images/c1.jpg",
                alt: ""
            },
            {
                image: "/mock-images/c2.jpg",
                alt: ""
            },
            {
                image: "/mock-images/c3.jpg",
                alt: ""
            },
            {
                image: "/mock-images/c4.jpg",
                alt: ""
            },
            {
                image: "/mock-images/c1.jpg",
                alt: ""
            },
            {
                image: "/mock-images/c2.jpg",
                alt: ""
            },
            {
                image: "/mock-images/c3.jpg",
                alt: ""
            },
            {
                image: "/mock-images/c4.jpg",
                alt: ""
            },
        ]


    return (
        <section className="flex gap-2 py-3">
            <div className="bg-red-600 text-sm writing-tb rotate-180 px-2 py-5 rounded-r-xl flex items-center justify-center gap-3">
                <Image src="/images/icons/squares.svg" alt="categories" width={60} height={60} className="w-7 h-7" />
                دسته بندی ها
            </div>
            <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 lg:-mb-3 overflow-x-auto overflow-y-clip">
                <div className="grid grid-rows-2 grid-flow-col gap-y-2">
                    {items.map(item => (
                        <div key={item.image} className="pl-2">
                            <Link href="#" className="block w-36">
                                <Image src={item.image} alt={item.alt} width={100} height={70} className="w-36 h-20 object-cover rounded-2xl" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories;