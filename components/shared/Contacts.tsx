/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import { toPersianDigits } from "@/helpers"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";

type dataType = {
    emailAddress?: string;
    supportNumber?: string;
    supportNUmberUrl?: string;
    supportNumberSubtitle?: string;
}

type Props = {
    data?: dataType;
}

const Contacts: React.FC<Props> = props => {

    const [data, setData] = useState<dataType | undefined>(props.data || undefined);

    useEffect(()=>{        
        const fetchData = async () => {
            const response: any = await getStrapiPages('filters[Page][$eq]=aboutUs&locale=fa&populate[Sections][populate]=*');
            if(response.data){
                const aboutSections = response?.data?.data?.[0]?.Sections;
                setData({
                    emailAddress: aboutSections?.find((item:any) => item.Keyword === "email")?.Description,
                    supportNumber: aboutSections?.find((item:any) => item.Keyword === "telNumber")?.Description,
                    supportNumberSubtitle: aboutSections?.find((item:any) => item.Keyword === "telNumber")?.Subtitle,
                    supportNUmberUrl: aboutSections?.find((item:any) => item.Keyword === "telNumber")?.Url                    
                })
            }
        }

        if(!data){
            fetchData();
        }

    },[data]);

    if (!data) return null;

    const {emailAddress, supportNUmberUrl, supportNumber, supportNumberSubtitle} = data;

    return (
        <div className="px-4 text-white">
            {!!supportNumber && <Link
                href={supportNUmberUrl ? `tel:${supportNUmberUrl}` : "#"}
                className="bg-blue-600 text-shadow flex justify-between items-center gap-5 mb-4 mt-6 rounded-full px-5 h-14"
            >
                <div className="flex gap-3 items-center">
                    <Image src='/images/icons/phone.svg' alt="contact number" className="w-8 h-8" width={32} height={32} />
                    <div>
                        <p className="text-sm block"> شماره پشتیبانی </p>
                        <span className="text-xs"> {toPersianDigits(supportNumberSubtitle || "ساعت 9 تا 14")} </span>
                    </div>
                </div>

                <span className="tracking-widest" dir="ltr"> {toPersianDigits(supportNumber)} </span>

            </Link>}

            {!!emailAddress && <Link
                href={`mailto:${emailAddress}`}
                className="bg-emerald-600 text-shadow flex justify-between items-center gap-5 mb-6 rounded-full px-5 h-14"
            >
                <div className="flex gap-3 items-center">
                    <Image src='/images/icons/email.svg' alt="contact number" className="w-8 h-8" width={32} height={32} />
                    <p className="text-sm block"> ایمیل </p>
                </div>

                <span dir="ltr"> {emailAddress} </span>

            </Link>}
        </div>
    )
}

export default Contacts;