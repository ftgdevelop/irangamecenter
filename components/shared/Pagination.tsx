import { useEffect, useState } from "react";
import CaretRight from "../icons/CaretRight";
import CaretLeft from "../icons/CaretLeft";

type Props = {
    wrapperClassName?: string;
    totalItems: number;
    currentPage?: number;
    itemsPerPage?: number;
    onChange: (activePage: number) => void;
}

const Pagination: React.FC<Props> = props => {

    const [activePage, setActivePage] = useState<number>(1);

    const itemsPerPage = props.itemsPerPage || 10;

    const totalPages = Math.floor(props.totalItems / itemsPerPage) + (props.totalItems % itemsPerPage > 0 ? 1 : 0);


    useEffect(() => {
        props.onChange(activePage);
    }, [activePage]);

    useEffect(() => {
        if (props.currentPage) {
            setActivePage(props.currentPage);
        }
    }, [props.currentPage]);

    const previousPage = () => {
        setActivePage(prevP => {
            if (prevP > 1) {
                return (prevP - 1);
            } else {
                return prevP;
            }
        })
    }
    const nextPage = () => {
        setActivePage(prevP => {
            if (prevP < totalPages) {
                return (prevP + 1);
            } else {
                return prevP;
            }
        })
    }

    return (
        <div className={`flex justify-between items-center bg-[#e8ecf0] dark:bg-[#1a1e3b] rounded-full p-2 ${props.wrapperClassName || ""}`}>
            <button
                type="button"
                onClick={previousPage}
                className={`w-10 h-10 flex justify-center items-center rounded-full ${activePage > 1 ? "bg-[#fafafa] dark:bg-[#011425] active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff]" : "text-neutral-400 dark:text-white/25"}`}
            >
                <CaretRight className="w-4 h-4 fill-current" />

            </button>

            <div className="bg-white dark:bg-[#011425] rounded-full px-5 py-2 text-sm font-semibold">
                <span className="text-[#d35cfe]"> {activePage} </span>
                از
                <span> {totalPages} </span>
            </div>

            <button
                type="button"
                onClick={nextPage}
                className={`w-10 h-10 flex justify-center items-center rounded-full ${activePage < totalPages ? "bg-white dark:bg-[#011425] active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff]" : "text-neutral-400 dark:text-white/25"}`}
            >
                <CaretLeft className="w-4 h-4 fill-current" />

            </button>

        </div>
    )
}

export default Pagination;