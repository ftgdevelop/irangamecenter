import Image from "next/image";
import Link from "next/link";

const CircleLinks = () => {

    const items: {
        image: string;
        lable: string;
    }[] = [
            {
                image: "/mock-images/p1.png",
                lable: "بازی های آینده"
            },
            {
                image: "/mock-images/p2.png",
                lable: "فیفا 2025"
            },
            {
                image: "/mock-images/p3.png",
                lable: "اکانت های هوش مصنوعی"
            },
            {
                image: "/mock-images/p4.png",
                lable: "آپدیت جدید کالاف موبایل"
            },
            {
                image: "/mock-images/p3.png",
                lable: "اکانت های هوش مصنوعی"
            },
            {
                image: "/mock-images/p4.png",
                lable: "آپدیت جدید کالاف موبایل"
            }
        ]

    return (
        <section className="hidden-scrollbar overflow-x-auto overflow-y-clip py-3">
            <div className="flex items-start gap-3 px-3">
                {items.map(item => (
                    <Link href="#" key={item.lable} className="inline-block text-center shrink-0">
                        <div
                            className="inline-block mb-3 p-1 mx-auto bg-gradient-to-tr from-violet-600 from-10% via-green-300 via-50% to-red-500 to-90% rounded-full"
                        >
                            <Image
                                src={item.image}
                                alt={item.lable}
                                width={80}
                                height={80}
                                className="rounded-full block w-16 h-16"
                            />
                        </div>
                        <div className="text-xs text-center w-20">
                            {item.lable}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default CircleLinks;