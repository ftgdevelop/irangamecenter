import Image from "next/image";
import Accordion from "../../Accordion";
import Link from "next/link";
import { toPersianDigits } from "@/helpers";

const Footer = () => {

    const faqItems: {
        content: React.ReactNode;
        title: React.ReactNode;
        key: string;
    }[] = [
            {
                key: "1",
                title: "معتبرترین فروشگاه رسمی فروش گیفت کارت؟",
                content: "معتبرترین فروشگاه رسمی فروش گیفت کارت؟"
            },
            {
                key: "2",
                title: "چگونه میتوانم در ایران گیم سنتر سفارش ثبت کنم؟",
                content: `برای ثبت سفارش در ایران گیم سنتر، ابتدا وارد وب‌سایت یا اپلیکیشن شوید و از طریق منوی دسته‌بندی‌ها، محصول یا خدمات موردنظر خود را انتخاب کنید. سپس با کلیک بر روی گزینه "افزودن به سبد خرید"، جزئیات سفارش خود را بررسی و تایید کنید. در مرحله بعد، آدرس و اطلاعات تماس خود را وارد کرده و روش پرداخت دلخواه (پرداخت آنلاین یا استفاده از اعتبار) را انتخاب کنید. پس از تکمیل فرآیند پرداخت، سفارش شما ثبت شده و کد پیگیری برای شما ارسال خواهد شد.`
            },
            {
                key: "3",
                title: "بعد از پرداخت چه زمانی گیفت کارت تحویل میگیرم؟",
                content: "بعد از پرداخت چه زمانی گیفت کارت تحویل میگیرم؟"
            },
            {
                key: "4",
                title: "میخواهید گیفت کارت پلی استیشن آیتونز اپل و گوگل پلی خرید کنید؟",
                content: "میخواهید گیفت کارت پلی استیشن آیتونز اپل و گوگل پلی خرید کنید؟"
            },
            {
                key: "5",
                title: "چگونه به ایران گیم سنتر اعتماد کنیم؟",
                content: "چگونه به ایران گیم سنتر اعتماد کنیم؟"
            }
        ];

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

            <div className="flex gap-4 py-5">
                <Image src="/logo2.svg" alt="irangamecenter" width={50} height={50} />
                <div>
                    <strong className="block text-xl font-bold">
                        ایران گیم سنتر
                    </strong>
                    <span className="text-xs">
                        فروشگاه آنلاین اکانت بازی
                    </span>
                </div>
            </div>

            <p className="text-xs leading-6 text-justify mb-6">
                گیمیوو بزرگترین فروشگاه آنلاین شارژ بازی های موبایل، پلی استیشن و... لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد.
            </p>

            {faqItems.map((item, index) => (
                <Accordion
                    key={item.key}
                    title={item.title}
                    content={item.content}
                    WrapperClassName={`border-b border-white/15 py-2 ${index ? "" : "border-t"}`}
                />
            ))}

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