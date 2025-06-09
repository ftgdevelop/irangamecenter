import Image from "next/image";
import Link from "next/link";
import MainMenu from './MainMenu';
import ArrowRight from "@/components/icons/ArrowRight";

type Props = {
    type2Params?: {
        title?: string;
        backUrl?: string;
    }
}

const Header: React.FC<Props> = props => {
    return (
        <header className="flex justify-between p-3">
            {props.type2Params?.backUrl ? (
                <div className="flex items-center py-3.5 gap-4">
                    <Link href={props.type2Params.backUrl} className="w-6 h-6">
                        <ArrowRight />
                    </Link>
                    {props.type2Params?.title || ""}
                </div>
            ) : (
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
            )}

            <MainMenu />


        </header>
    )
}

export default Header;