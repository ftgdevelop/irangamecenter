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
    
    const carret = <CaretLeft className="w-3.5 h-3.5 fill-[#a93aff] shrink-0" />

    return (
        <div className={`overflow-auto hidden-scrollbar text-2xs ${props.wrapperClassName || ""}`}>
            <div className="w-auto flex whitespace-nowrap items-center gap-2">
                {!props.hideHome && <Fragment>
                    <Link href="/" className={`shrink-0 ${linksClassName}`} aria-label="home">
                        <Home2 className="w-5 h-5 mb-1.5 fill-current" />
                    </Link>
                    {carret}
                </Fragment>}
                {props.items.map((item, index) => (
                    <Fragment key={item.label}>
                        {!!index && carret}
                        {item.link ? (
                            <Link prefetch={false} href={item.link} className={`shrink-0 ${linksClassName}`}> {item.label} </Link>
                        ) : (
                            <span className={`shrink-0 ${linksClassName}`}> {item.label} </span>
                        )}
                    </Fragment>
                ))}
                <span className="w-5 h-1 shrink-0" />

            </div>
        </div>
    )
}

export default BreadCrumpt;