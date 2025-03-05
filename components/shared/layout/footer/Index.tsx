import Image from "next/image";
import Accordion from "../../Accordion";
import Link from "next/link";
import { toPersianDigits } from "@/helpers";

const Footer = () => {

    const socialMediaLink: {
        title: string;
        url: string;
        iconUrl: string;
    }[] = [
            {
                title: "تلگرام",
                url: "#",
                iconUrl: '/images/icons/telegram.svg'
            },
            {
                title: "آپارات",
                url: "#",
                iconUrl: '/images/icons/aparat.svg'
            },
            {
                title: "ایکس",
                url: "#",
                iconUrl: '/images/icons/x.svg'
            },
            {
                title: "اینستاگرام",
                url: "#",
                iconUrl: '/images/icons/insta.svg'
            }
        ];

    return (
        <footer className="p-3">

            <Link
                href="#"
                className="bg-blue-500 flex justify-between items-center gap-5 mb-4 mt-6 rounded-full px-5 h-14"
            >
                <div className="flex gap-3 items-center">
                    <Image src='/images/icons/phone.svg' alt="contact number" className="w-8 h-8" width={32} height={32} />
                    <div>
                        <p className="text-sm block"> شماره پشتیبانی </p>
                        <span className="text-xs"> {toPersianDigits("ساعت 9 تا 14")} </span>
                    </div>
                </div>

                <span className="tracking-widest" dir="ltr"> {toPersianDigits("021-1234567")} </span>

            </Link>

            <Link
                href="#"
                className="bg-emerald-400 flex justify-between items-center gap-5 mb-6 rounded-full px-5 h-14"
            >
                <div className="flex gap-3 items-center">
                    <Image src='/images/icons/email.svg' alt="contact number" className="w-8 h-8" width={32} height={32} />
                    <p className="text-sm block"> ایمیل </p>
                </div>

                <span dir="ltr"> support@irangamecenter.com </span>

            </Link>

            <Accordion
                title="لینک های مهم"
                content="لینک های مهم"
                WrapperClassName={`border-b border-t border-white/15 py-3`}
                withArrowIcon
            />

            <div className="py-5">
                <strong className="block text-center font-semibold mb-4"> شبکه های اجتماعی </strong>
                <div className="flex gap-4 justify-center">
                    {socialMediaLink.map(item => (
                        <Link
                            key={item.title}
                            title={item.title}
                            href={item.url}
                            className="bg-white/15 block p-2 rounded-full"
                        >
                            <Image src={item.iconUrl} alt={item.title} className="w-8 h-8" width={32} height={32} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="py-5 border-t border-white/15">
                <strong className="block text-center font-semibold mb-4"> نمادهای اعتماد </strong>
                <div className="flex gap-4 bg-[#f0eff2] rounded-xl p-5">
                    <Image
                        src="/mock-images/enamad.jpg"
                        alt="نماد اعتماد"
                        width={100}
                        height={100}
                        className="h-24 w-auto"
                    />
                    <Image
                        src="/mock-images/resaneh.jpg"
                        alt="ساماندهی"
                        width={100}
                        height={100}
                        className="h-24 w-auto"
                    />

                </div>
            </div>

            <div className="text-[11px] border-t border-white/15 py-5">

                © ۱۴۰۳ - تمام حقوق مربوط به وب سایت ایران گیم سنتر می باشد.
            </div>

        </footer>
    )
}

export default Footer;