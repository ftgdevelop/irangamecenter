/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getTransactionDeposit } from "@/actions/payment";
import TransactionItem from "@/components/authentication/profile/tansactions/TransactionItem";
import TransactionsFilter from "@/components/authentication/profile/tansactions/TransactionsFilter";
import ArrowRight from "@/components/icons/ArrowRight"
import Filter from "@/components/icons/Filter";
import ModalPortal from "@/components/shared/layout/ModalPortal";
import Pagination from "@/components/shared/Pagination";
import Skeleton from "@/components/shared/Skeleton";
import { dateDiplayFormat } from "@/helpers";
import Link from "next/link"
import { Fragment, useEffect, useState } from "react";

const Transactions = () => {

    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [slideInFilters, setSlideInFilters] = useState<boolean>(true);
    const [filterStartDate, setFilterStartDate] = useState<string>("");
    const [filterEndDate, setFilterEndDate] = useState<string>("");
    const [filterType, setFilterType] = useState<string[]>([]);

    useEffect(() => {
        if (openFilters) {
            setSlideInFilters(true);
        }
    }, [openFilters]);

    useEffect(() => {
        if (!slideInFilters) {
            setTimeout(() => { setOpenFilters(false) }, 300)
        }
    }, [slideInFilters]);


    const [transactions, setTransactions] = useState<{
        amount: number;
        creationTime: string;
        id: number;
        type: string;
    }[]>([]);

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {

        const fetchData = async (t: string, p: number) => {

            const MaxResultCount = 10;
            const SkipCount = (p - 1) * 10;

            setLoading(true);
            const response: any = await getTransactionDeposit({ CurrencyType: "IRR", MaxResultCount: MaxResultCount, SkipCount: SkipCount, CreationTimeFrom: filterStartDate, CreationTimeTo: filterEndDate, Type: filterType }, t);
            if (response?.data?.result) {
                setTransactions(response.data.result.items);
                setTotalCount(response.data.result.totalCount);
            }
            setLoading(false);
        }

        const token = localStorage?.getItem('Token');
        if (token && page) {
            fetchData(token, page);
        }

    }, [page, filterEndDate, filterStartDate, filterType]);

    return (
        <>
            <header className="flex items-center gap-5 p-4 text-xs">
                <Link href="/profile/wallet" className="w-6 h-6">
                    <ArrowRight />
                </Link>
                تراکنش های من
            </header>
            <div className="px-3.5 pb-5">
                <button
                    type="button"
                    className="inline-flex gap-3 border border-white/25 rounded-full px-4 py-1.5 text-xs"
                    onClick={() => { setOpenFilters(true) }}
                >
                    <Filter className="w-5 h-5 fill-current" />
                </button>

                {loading && (
                    <>
                        {[1, 2, 3, 4, 5, 6].map(item => (
                            <div className="grid grid-cols-6 gap-2 items-center" key={item}>
                                <Skeleton type="image" className="rounded-full w-12 h-12" />
                                <div className="col-span-5 w-full border-b py-6 border-white/25">
                                    <Skeleton className="h-3 w-full mb-3" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {transactions.map((item, index, array) => {

                    const prevItem = array[index - 1];

                    const prevItemMonth = prevItem?.creationTime ? dateDiplayFormat({
                        date: prevItem.creationTime,
                        locale: "fa",
                        format: "yyyy MMM"
                    }) : null;

                    const itemMonth = dateDiplayFormat({
                        date: item.creationTime,
                        locale: "fa",
                        format: "yyyy MMM"
                    });


                    const monthSeparator = prevItemMonth !== itemMonth ? itemMonth : null;

                    return (

                        <Fragment key={item.id} >

                            <div className="flex items-center gap-2 my-2.5">
                                <div className="text-2xs whitespace-nowrap min-w-[15%] min-h-[16.5px] shrink-0">
                                    {monthSeparator}
                                </div>
                                <div className="w-full border-b border-white/25" />
                            </div>

                            <TransactionItem
                                amount={item.amount}
                                creationTime={item.creationTime}
                                id={item.id}
                                type={item.type}
                            />

                        </Fragment>
                    )
                })}

                {totalCount > 10 && <Pagination
                    onChange={setPage}
                    totalItems={totalCount}
                    currentPage={page}
                    itemsPerPage={10}
                    wrapperClassName="my-5"
                />}

            </div>

            <ModalPortal
                show={openFilters}
                selector='modal_portal'
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

                    <div className="relative w-full lg:max-w-lg lg:mx-auto h-screen">

                        <div className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0" onClick={() => { setSlideInFilters(false) }} />

                        <div className={`bg-[#192a39] text-white rounded-2xl absolute transition-all left-5 right-5 ${slideInFilters ? "bottom-5" : "-bottom-[80vh]"}`}>

                            <TransactionsFilter
                                onFilter={values => {
                                    setFilterStartDate(values.startDate);
                                    setFilterEndDate(values.endDate);
                                    setFilterType(values.types);
                                    setOpenFilters(false);
                                }}
                                close={() =>{setOpenFilters(false);}}
                            />

                        </div>
                    </div>

                </div>
            </ModalPortal>

        </>
    )
}

export default Transactions;