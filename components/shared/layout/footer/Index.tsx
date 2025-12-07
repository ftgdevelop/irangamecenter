import Image from "next/image";
import Accordion from "../../Accordion";
import Link from "next/link";

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
        <footer className="p-3 px-5">

            <Accordion
                title="لینک های مهم"
                content="لینک های مهم"
                WrapperClassName={`border-b border-t border-neutral-300 dark:border-white/15 py-3`}
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
                            className="block p-2 rounded-full bg-black/10 dark:bg-white/15"
                        >
                            <Image src={item.iconUrl} alt={item.title} className="w-8 h-8" width={32} height={32} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="py-5 border-t border-white/15">
                <strong className="block text-center font-semibold mb-4"> نمادهای اعتماد </strong>
                <div className="flex gap-4 bg-[#f0eff2] rounded-xl p-5">

                    <a 
                        referrerPolicy="origin" 
                        target="_blank" 
                        href="https://trustseal.enamad.ir/?id=665612&Code=KA7pgQKtQ7wh1GDHIjmy2QSoVfv9WZou"
                    >
                        <Image
                            referrerPolicy="origin"
                            src="/images/enamad.png"
                            alt="نماد اعتماد"
                            width={80}
                            height={96}
                            className="h-24 w-auto"
                        />
                    </a>

                    <Image
                        src="/mock-images/resaneh.jpg"
                        alt="ساماندهی"
                        width={81}
                        height={96}
                        className="h-24 w-auto"
                    />

                </div>
            </div>

            <div className="text-[11px] border-t border-neutral-300 dark:border-white/15 py-5">

                © ۱۴۰۳ - تمام حقوق مربوط به وب سایت ایران گیم سنتر می باشد.
            </div>

        </footer>
    )
}

export default Footer;