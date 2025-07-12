import Image from "next/image";
import Link from "next/link";
import MainMenu from './MainMenu';
import ArrowRight from "@/components/icons/ArrowRight";
import Share from "./Share";
import { useRouter } from "next/router";

type Props = {
    type2Params?: {
        title?: string;
        backUrl?: string;
        backToPrev?: boolean;
        withShare?: boolean;
        withLogo?: boolean;
    }
}

const Header: React.FC<Props> = props => {

    const router = useRouter();

    return (
        <header className="flex justify-between p-3">
            {(props.type2Params?.backUrl || props.type2Params?.backToPrev)  ? (
                <div className="flex items-center py-3.5 gap-4">
                    {props.type2Params.backToPrev ? (
                        <button
                            type="button"
                            className="w-6 h-6"
                            onClick={e=>{
                                e.preventDefault();
                                router.back()
                            }}
                        >
                            <ArrowRight />
                        </button>
                    ):(
                        <Link href={props.type2Params.backUrl!} className="w-6 h-6">
                            <ArrowRight />
                        </Link>
                    )}
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

            {!!props.type2Params?.withLogo &&(
                <Link href={"/"}>
                    <Image src="/logo.svg" alt="irangamecenter" width={50} height={50} />
                </Link>
            )}

            {props.type2Params?.withShare ? (
                <Share />
            ):(
                <MainMenu />
            )}



        </header>
    )
}

export default Header;