import Image from "next/image";
import Link from "next/link";
import InfoCircleOutline from "@/components/icons/InfoCircleOutline";
import Faq from "@/components/icons/Faq";
import GameOutline from "@/components/icons/GameOutline";
import Phone from "@/components/icons/Phone";
import CaretLeft from "@/components/icons/CaretLeft";

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

        const contactLinks = [        
            {
                url:"/about",
                label:"درباره ما",
                icon: <GameOutline className="w-5 h-5 fill-current" />
            },
            {
                url:"/contact",
                label:"تماس با ما",
                icon: <Phone className="w-5 h-5 fill-none stroke-current" />
            },
            {
                url:"/terms",
                label:"قوانین و راهنما",
                icon: <InfoCircleOutline className="w-5 h-5 fill-none stroke-current" />
            },
            {
                url:"/faq",
                label:"سوالات متداول",
                icon: <Faq className="w-5 h-5 fill-none stroke-current" />
            }
        ]

    return (
        <footer className="p-3 px-5">

            {contactLinks.map((item, index) => (
                <Link 
                    prefetch={false}
                    key={item.label}
                    href={item.url} 
                    className={`flex justify-between items-center px-2 py-4 border-neutral-300 dark:border-white/15 text-sm ${index ? "border-t" : ""}`}
                >
                    <span className="flex gap-3 items-center">
                        {item.icon}
                        {item.label}
                    </span>
                    <CaretLeft className="w-4 h-4 fill-current" />
                </Link>
            ))}

            

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
