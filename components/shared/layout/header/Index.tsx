import Image from "next/image";
import Link from "next/link";
import MainMenu from './MainMenu';
import ArrowRight from "@/components/icons/ArrowRight";
import Share from "./Share";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/use-store";
import Loading from "@/components/icons/Loading";

type Props = {
    type2Params?: {
        title?: string;
        backUrl?: string;
        backToPrev?: boolean;
        withShare?: boolean;
        withLogo?: boolean;
        isCart?: boolean;
    }
}

const Header: React.FC<Props> = props => {
    const { cartGeneralInfo, loading } = useAppSelector((state) => state.cart);

    const router = useRouter();

    return (
        <header className="fixed top-0 h-[84px] left-1/2 -translate-x-1/2 bg-[#011425] z-10 w-full md:max-w-lg flex justify-between p-3">
            {(props.type2Params?.backUrl || props.type2Params?.backToPrev)  ? (
                <div className="flex items-center py-3.5 gap-4">
                    {props.type2Params.backToPrev ? (
                        <button
                            type="button"
                            className="w-8 h-8"
                            onClick={e=>{
                                e.preventDefault();
                                router.back()
                            }}
                        >
                            <ArrowRight />
                        </button>
                    ):(
                        <Link href={props.type2Params.backUrl!} className="w-8 h-8">
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
            <div className="flex gap-[30px] items-center">

            {
                props.type2Params?.isCart && <Link href='/cart' className="relative w-fit cursor-pointer">
                <Image src='/images/icons/shopping-cart.svg' alt="shopping-cart" width={42} height={42}/>
                        
                {     
                    cartGeneralInfo?.totalQuantity && cartGeneralInfo?.totalQuantity > 0 ?
                    (
                    <span className="absolute bottom-[-10px] right-[-10px] bg-gradient-to-t from-green-600 to-green-300 text-[#011425] font-bold rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        {
                            loading ? <Loading className="fill-current w-4 h-4 animate-spin" /> :
                            cartGeneralInfo?.totalQuantity > 9 ? "9+" : cartGeneralInfo?.totalQuantity
                        }
                    </span>
                    )
                    :
                     null
                }
                </Link>
            }    
            {props.type2Params?.withShare ? (
                <Share />
            ):(
                <MainMenu />
            )}


            </div>


        </header>
    )
}

export default Header;