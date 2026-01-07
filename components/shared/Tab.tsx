
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TabItem } from '@/types';
import CloseSimple from '../icons/CloseSimple';

type Props = {
    items: TabItem[];
    style?: "3";
    wrapperClassName?: string;
    tabLinksBold?: boolean;
    scrollTabs?: boolean;
    noGrowTabs?: boolean;
    activeTab?: string | number;
    onChange?: (key: string | number) => void;
    isSticky?: boolean;
    navsBgClass?: string;
    heading?: string;
}

const Tab: React.FC<Props> = props => {

    const { items } = props;

    const router = useRouter();

    const [activetabKey, setActiveTabKey] = useState(items[0]?.key);


    useEffect(() => {
        if (props.activeTab) {
            setActiveTabKey(props.activeTab);
        }
    }, [props.activeTab]);

    const tabClassName = (active: boolean) => {
        return `outline-none font-semibold whitespace-nowrap select-none text-sm px-2 sm:px-3 py-2 sm:py-3 border-b-2 transition-all block ${props.noGrowTabs ? "" : "grow"} ${active ? "border-[#aa3aff] text-[#aa3aff]" : "border-transparent text-[#888888] dark:text-white"}`;
    }

    return (

        <div className={props.wrapperClassName || ""}>

            <div className={`${props.isSticky ? "sticky top-0" : ""} ${props.navsBgClass || ""}`}>

                {!!props.heading && (
                    <div className="mb-5 flex justify-between items-center pt-5 mb-4">
                        <h2 className="text-lg font-semibold px-4 block"> {props.heading}</h2>
                        {!!props.onChange && <button
                            type="button"
                            onClick={() => { props.onChange!("") }}
                        >
                            <CloseSimple className="w-6 h-6 fill-current" />
                        </button>}
                    </div>
                )}

                <div className={`border-b border-neutral-200 dark:border-neutral-200/25 ${props.scrollTabs ? 'lg:border-none max-lg:hidden-scrollbar overflow-x-auto overflow-y-clip' : ""}`}>
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
                                if (props.onChange) {
                                    props.onChange(item.key);
                                }
                            }}
                            className={tabClassName(activetabKey === item.key)}
                        >
                            {item.label}
                        </button>)}
                    </div>
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