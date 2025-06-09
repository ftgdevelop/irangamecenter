import { toPersianDigits } from "@/helpers"
import Image from "next/image"
import Link from "next/link"

type Props = {
    emailAddress?: string;
    supportNumber?: string;
    supportNUmberUrl?: string;
    supportNumberSubtitle?: string;
}
const Contacts: React.FC<Props> = props => {
    return (
        <div className="px-3">
            {!!props.supportNumber && <Link
                href={props.supportNUmberUrl ? `tel:${props.supportNUmberUrl}` : "#"}
                className="bg-blue-500 flex justify-between items-center gap-5 mb-4 mt-6 rounded-full px-5 h-14"
            >
                <div className="flex gap-3 items-center">
                    <Image src='/images/icons/phone.svg' alt="contact number" className="w-8 h-8" width={32} height={32} />
                    <div>
                        <p className="text-sm block"> شماره پشتیبانی </p>
                        <span className="text-xs"> {toPersianDigits(props.supportNumberSubtitle || "ساعت 9 تا 14")} </span>
                    </div>
                </div>

                <span className="tracking-widest" dir="ltr"> {toPersianDigits(props.supportNumber)} </span>

            </Link>}

            {!!props.emailAddress && <Link
                href={`mailto:${props.emailAddress}`}
                className="bg-emerald-400 flex justify-between items-center gap-5 mb-6 rounded-full px-5 h-14"
            >
                <div className="flex gap-3 items-center">
                    <Image src='/images/icons/email.svg' alt="contact number" className="w-8 h-8" width={32} height={32} />
                    <p className="text-sm block"> ایمیل </p>
                </div>

                <span dir="ltr"> {props.emailAddress} </span>

            </Link>}
        </div>
    )
}

export default Contacts;