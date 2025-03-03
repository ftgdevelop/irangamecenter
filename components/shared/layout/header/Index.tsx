import Image from "next/image";
import Link from "next/link";
import MainMenu from './MainMenu';

const Header = () => {
    return (
        <header className="flex justify-between p-3">
            <Link href="/" className="flex gap-4">
                <Image src="/logo.svg" alt="irangamecenter" width={50} height={50} />
                <div>
                    <strong className="block text-xl font-bold">
                        ایران گیم سنتر
                    </strong>
                    <span className="text-xs">
                        فروشگاه آنلاین اکانت بازی
                    </span>
                </div>
            </Link>

            <MainMenu />
            

        </header>
    )
}

export default Header;