import Link from "next/link";
import React, { Fragment } from "react";
import Home2 from "../icons/Home2";
import CaretLeft from "../icons/CaretLeft";

type Props = {
    items: {
        label: string;
        link?: string;
    }[];
    hideHome?: boolean;
    wrapperClassName?: string;
    textColorClass?: string;
}

const BreadCrumpt: React.FC<Props> = props => {

    const linksClassName = props.textColorClass || "text-neutral-700";
    
    const carret = <CaretLeft className="w-3.5 h-3.5 fill-[#a93aff]" />

    return (
        <div className={`flex flex-wrap items-center gap-2 text-2xs mb-4 ${props.wrapperClassName || ""}`}>
            {!props.hideHome && <Fragment>
                <Link href="/" className={`${linksClassName}`} aria-label="home">
                    <Home2 className="w-5 h-5 mb-1.5 fill-current" />
                </Link>
                {carret}
            </Fragment>}
            {props.items.map((item, index) => (
                <Fragment key={item.label}>
                    {!!index && carret}
                    {item.link ? (
                        <Link href={item.link} className={linksClassName}> {item.label} </Link>
                    ) : (
                        <span className={linksClassName}> {item.label} </span>
                    )}
                </Fragment>
            ))}

        </div>
    )
}

export default BreadCrumpt;