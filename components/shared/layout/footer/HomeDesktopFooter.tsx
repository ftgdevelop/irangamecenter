import Image from "next/image";
import Link from "next/link";
import Contacts from "../../Contacts";

const HomeDesktopFooter = () => {
  const socialMediaLink: {
    title: string;
    url: string;
    iconUrl: string;
  }[] = [
    {
      title: "تلگرام",
      url: "https://t.me/irangamecenter_official",
      iconUrl: "/images/icons/telegram.svg",
    },
    {
      title: "آپارات",
      url: "https://www.aparat.com/irangamecenter.com ",
      iconUrl: "/images/icons/aparat.svg",
    },
    {
      title: "ایکس",
      url: "https://x.com/irangamecenter ",
      iconUrl: "/images/icons/x.svg",
    },
    {
      title: "اینستاگرام",
      url: "https://www.instagram.com/irangamecenter_official",
      iconUrl: "/images/icons/insta.svg",
    },
  ];

  const contactLinks = [
    {
      url: "/",
      label: "فروشگاه",
    },
    {
      url: "/products",
      label: "پیشنهادهای ویژه",
    },
    {
      url: "/terms",
      label: "قوانین و مقررات",
    },
    {
      url: "/about",
      label: "درباره ما",
    },
    {
      url: "/contact",
      label: "تماس با ما",
    },
  ];

  return (
    <footer className="px-5 border-t border-neutral-300 dark:border-white/15">
      <div className="grid grid-cols-2 gap-5 py-10">
        <div className="text-sm">
            <p>
                ایران گیم سنتر یک فروشگاه تخصصی آنلاین در حوزه فروش بازی‌های کنسول مانند پلی استیشن ۴ و ۵، ایکس‌باکس و نینتندو Wii است که با هدف ارائه محصولات اورجینال و خدمات مطمئن به گیمرهای ایرانی راه‌اندازی شده است. ما با تکیه بر تجربه‌ی چندساله در حوزه بازی و سرگرمی دیجیتال، تلاش کرده‌ایم بستری فراهم کنیم تا کاربران بتوانند بازی‌های موردنظر خود را با قیمت مناسب، اطلاعات دقیق و پشتیبانی حرفه‌ای تهیه کنند.
</p><p>
در ایران گیم سنتر، تنها به فروش بازی اکتفا نمی‌کنیم؛ بلکه تلاش داریم با تولید محتوای تخصصی، معرفی جدیدترین بازی‌ها، نقد و بررسی‌های فنی، و ارائه پیشنهادات شخصی‌سازی‌شده، تجربه‌ای کامل و حرفه‌ای برای گیمرها رقم بزنیم. پشتیبانی سریع، تنوع محصولات و ضمانت کیفیت از اصلی‌ترین ارزش‌های ما در ارائه خدمات فروش بازی‌های کنسول و محتوای دیجیتال هستند.
</p><p>
هدف نهایی ما تبدیل شدن به معتبرترین مرجع خرید بازی‌های کنسول در ایران است. با تکیه بر اعتماد کاربران، گسترش همکاری با برندهای معتبر و استفاده از زیرساخت‌های پرداخت و ارسال امن، همواره در تلاشیم که انتخاب اول گیمرها برای خرید بازی‌های فیزیکی و دیجیتال باشیم. ایران گیم سنتر، جایی برای تمام گیمرهای حرفه‌ای و تازه‌کار.



            </p>
        </div>

        <div>
          <Contacts />

          <div className="mt-5 border-t border-neutral-300 dark:border-white/15 pt-5 grid grid-cols-3 gap-4">
            <div>
              <strong className="block text-center px-2 lg:text-right font-semibold mb-4">
                لینک های مهم
              </strong>
              <div>
                {contactLinks.map(item=> (
                  <Link
                    prefetch={false}
                    key={item.label}
                    href={item.url}
                    className="mb-3 text-sm block"
                  >
                      {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <strong className="block text-center px-2 lg:text-right font-semibold mb-4">
                شبکه های اجتماعی
              </strong>
              <div className="flex gap-1.5 justify-center lg:justify-start">
                {socialMediaLink.map((item) => (
                  <Link
                    key={item.title}
                    title={item.title}
                    href={item.url}
                    className="block p-2 rounded-full bg-black/10 dark:bg-white/15"
                  >
                    <Image
                      src={item.iconUrl}
                      alt={item.title}
                      className="w-7 h-7"
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="max-lg:border-t max-lg:border-white/15">
              <strong className="block text-center px-2 lg:text-right font-semibold mb-4">
                نمادهای اعتماد
              </strong>
              <div className="inline-flex flex-wrap gap-2 bg-[#f0eff2] rounded-xl p-3">
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
                    className="h-24 w-18 object-contain"
                  />
                </a>

                <Image
                  referrerPolicy="origin"
                  id="rgvjsizpfukzapfufukzrgvj"
                  className="h-24 w-18 object-contain cursor-pointer"
                  onClick={() => {
                    window.open(
                      "https://logo.samandehi.ir/Verify.aspx?id=396563&p=xlaopfvlgvkadshwgvkaxlao",
                      "Popup",
                      "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30",
                    );
                  }}
                  alt="logo-samandehi"
                  src="/images/resaneh.jpg"
                  width={81}
                  height={96}
                />

                <a
                  referrerPolicy="origin"
                  target="_blank"
                  href="https://qr.mojavez.ir/track/19893812"
                >
                  <Image
                    referrerPolicy="origin"
                    src="/images/kasbokar.png"
                    alt="نماد کسب و کار های مجازی"
                    width={80}
                    height={96}
                    className="h-24 w-18 object-contain"
                  />
                </a>

                <a
                  href="https://emalls.ir/Shop/74254/"
                  target="_blank"
                  className="flex justify-center items-center"
                >
                  <Image
                    className="h-20 w-18 object-contain cursor-pointer"
                    width={54}
                    height={80}
                    alt="نشان اعتباری ایمالز"
                    referrerPolicy="origin"
                    src="/images/emalls-neshan.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[11px] border-t border-neutral-300 dark:border-white/15 py-5">
        © ۱۴۰۴ - تمام حقوق مربوط به وب سایت ایران گیم سنتر می باشد.
      </div>
    </footer>
  );
};

export default HomeDesktopFooter;
