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
}

const Breadcrumb: React.FC<Props> = props => {
    
    const carret = <CaretLeft className="w-3.5 h-3.5 fill-[#a93aff] shrink-0" />

    return (
        <div className={`overflow-auto hidden-scrollbar text-2xs bg-[#e8ecf0] dark:bg-[#192a39] lg:dark:bg-[#011425] px-4 lg:px-5 py-3 lg:border-b lg:border-neutral-300 dark:lg:border-white/15  ${props.wrapperClassName || ""}`}>
            <div className="w-auto flex whitespace-nowrap items-center gap-2">
                {!props.hideHome && <Fragment>
                    <Link href="/" className="shrink-0 text-neutral-800 dark:text-neutral-300" aria-label="home">
                        <Home2 className="w-5 h-5 mb-1.5 fill-current" />
                    </Link>
                    {carret}
                </Fragment>}
                {props.items.map((item, index) => (
                    <Fragment key={item.label}>
                        {!!index && carret}
                        {item.link ? (
                            <Link prefetch={false} href={item.link} className="shrink-0 text-neutral-800 dark:text-neutral-300"> {item.label} </Link>
                        ) : (
                            <span className="shrink-0 text-neutral-800 dark:text-neutral-300"> {item.label} </span>
                        )}
                    </Fragment>
                ))}
                <span className="w-5 h-1 shrink-0" />

            </div>
        </div>
    )
}

export default Breadcrumb;