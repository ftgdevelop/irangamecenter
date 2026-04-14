import { PropsWithChildren, ReactNode } from "react";

type Props = {
    id: string;
    title: string;
    extra?: ReactNode;
    innerWrapperClassName?: string;
    wrapperClassName?: string;
}

const ProductDesktopSection : React.FC<PropsWithChildren<Props>> = props => {
    return(
        <div id={props.id} className={`px-10 mt-10 ${props.wrapperClassName || ""}`}>
            <div className="bg-gradient-to-r from-[#d2dfde] to-[#fafafa] dark:from-[#1a2b3b] dark:to-[#011425] py-10 grid grid-cols-12 rounded-l-2xl">
                <div className="col-span-3">
                    <div className="sticky top-[170px]">
                        <div className="border-r-8 py-1 dark:border-[#fff1b4] pr-4 dark:text-[#fff1b4] text-xl font-semibold">
                            {props.title}
                        </div>
                        {props.extra || null}
                    </div>
                </div>
                <div className={`border-r px-10 border-neutral-300 dark:border-white/15 col-span-9 ${props.innerWrapperClassName}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ProductDesktopSection;