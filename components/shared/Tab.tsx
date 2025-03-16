
import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { TabItem } from '@/types';

type Props = {
    items: TabItem[];
    style?: "3";
    wrapperClassName?: string;
    tabLinksBold?: boolean;
    scrollTabs?: boolean;
}

const Tab: React.FC<Props> = props => {

    const { items } = props;

    const router = useRouter();

    const [activetabKey, setActiveTabKey] = useState(items[0]?.key);

    const tabClassName = (active: boolean) => {
        return `outline-none font-semibold whitespace-nowrap select-none text-xs px-2 sm:px-3 py-2 sm:py-3 border-b-2 transition-all block grow ${active ? "border-[#aa3aff] text-[#aa3aff]" : "border-transparent text-white"}`;
    }

    return (

        <div className={props.wrapperClassName || ""}>

            <div className={`border-b border-neutral-200/25 ${props.scrollTabs ? 'hidden-scrollbar overflow-x-auto overflow-y-clip' : ""}`}>
                <div className={`flex ${!props.scrollTabs ? "flex-wrap" : ""} ${props.tabLinksBold ? "font-bold" : ""}`}>
                    {items.map(item => <button
                        type="button"
                        key={item.key}
                        onClick={() => {
                            if (item.href) {
                                router.push(item.href);
                            } else {
                                setActiveTabKey(item.key);
                            }
                        }}
                        className={tabClassName(activetabKey === item.key)}
                    >
                        {item.label}
                    </button>)}
                </div>
            </div>

            {items.map(item => <Fragment key={item.key}>
                {activetabKey === item.key ? item.children : null}
            </Fragment>)
            }

        </div>

    )
}

export default Tab;