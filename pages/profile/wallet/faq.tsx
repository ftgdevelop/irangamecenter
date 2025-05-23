/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import ArrowRight from "@/components/icons/ArrowRight"
import WalletFaq from "@/components/payment/WalletFaq";
import { NextPage } from "next";
import Link from "next/link"
import Markdown from "react-markdown";

type FaqItemType = {
    id: number;
    Question?: string;
    Answer?: string;
}
const Faq: NextPage = ({ items }: { items?: FaqItemType[] }) => {

    return (
        <>
            <header className="flex items-center gap-5 p-4 text-xs">
                <Link href="/profile/wallet" className="w-6 h-6">
                    <ArrowRight />
                </Link>
                سوالات متداول
            </header>
            <div className="px-3.5">
                {items?.length ? (
                    <WalletFaq
                        items={items?.map(item => ({
                            content: <Markdown>{item.Answer}</Markdown>,
                            title: item.Question,
                            key: item.id
                        }))}
                    />
                ) : (
                    null
                )}
            </div>
        </>
    )
}

export const getStaticProps = async (context: any) => {

    const response = await getStrapiPages('filters[Page][$eq]=walletFaq&locale=fa&populate[Sections][populate]=*');

    return ({
        props: {
            context: {
                locales: context.locales || null
            },
            items: response?.data?.data?.[0]?.Sections?.[0]?.Items || null
        },
        revalidate: 3600
    })

}

export default Faq;