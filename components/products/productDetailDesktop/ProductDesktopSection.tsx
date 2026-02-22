import { PropsWithChildren } from "react";

type Props = {
    id: string;
    title: string;
    innerWrapperClassName?: string;
}

const ProductDesktopSection : React.FC<PropsWithChildren<Props>> = props => {
    return(
        <div id={props.id} className="px-10 mt-10">
            <div className="bg-gradient-to-r from-[#dddddd] to-[#fafafa] dark:from-[#1a2b3b] dark:to-[#011425] py-10 grid grid-cols-3 rounded-l-2xl">
                <div>
                    <div className="border-r-8 py-1 dark:border-[#fff1b4] pr-4 dark:text-[#fff1b4] text-xl font-semibold">
                        {props.title}
                    </div>
                </div>
                <div className={`border-r px-10 border-neutral-300 dark:border-white/15 col-span-2 ${props.innerWrapperClassName}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ProductDesktopSection;