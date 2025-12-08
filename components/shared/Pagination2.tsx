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

const Pagination2: React.FC<Props> = props => {

    const [activePage, setActivePage] = useState<number>(props.currentPage || 1);

    const itemsPerPage = props.itemsPerPage || 10;

    const totalPages = Math.floor(props.totalItems / itemsPerPage) + (props.totalItems % itemsPerPage > 0 ? 1 : 0);

    useEffect(() => {
        if (props.currentPage) {
            setActivePage(props.currentPage);
        }
    }, [props.currentPage]);

    const previousPage = () => {
        setActivePage(prevP => {
            if (prevP > 1) {
                props.onChange(prevP - 1);
                return (prevP - 1);
            } else {
                return prevP;
            }
        })
    }
    const nextPage = () => {
        setActivePage(prevP => {
            if (prevP < totalPages) {
                props.onChange(prevP + 1);
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
                className={`w-10 h-10 flex justify-center items-center rounded-full ${activePage > 1 ? "bg-[#fafafa] dark:bg-[#011425] dark:active:from-[#a93aff] dark:active:bg-gradient-to-t dark:active:to-[#fe80ff] dark:active:text-white" : "text-white/25"}`}
            >
                <CaretRight className="w-4 h-4 fill-current" />

            </button>

            {(activePage > 1) && <button
                type="button"
                onClick={() => { setActivePage(1); props.onChange(1); }}
                className="w-10 h-10 flex items-center justify-center rounded-full active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff] active:text-white"
            >
                1
            </button>}

            {(activePage > 3) && (<div className="w-10 h-10 flex items-center justify-center">
                ...
            </div>)}

            {(activePage === totalPages && totalPages > 4) && <button
                type="button"
                onClick={() => { setActivePage(totalPages - 2); props.onChange(totalPages - 2) }}
                className="w-10 h-10 flex items-center justify-center rounded-full active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff] active:text-white"
            >
                {totalPages - 2}
            </button>}

            {(activePage > 2) && <button
                type="button"
                onClick={previousPage}
                className="w-10 h-10 flex items-center justify-center rounded-full active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff] active:text-white"
            >
                {activePage - 1}
            </button>}

            <div className="bg-[#a93aff] text-white dark:bg-[#011425] rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold">
                {activePage}
            </div>

            {((activePage + 1) < totalPages) && <button
                type="button"
                onClick={nextPage}
                className="w-10 h-10 flex items-center justify-center rounded-full active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff] active:text-white"
            >
                {activePage + 1}
            </button>}

            {((activePage === 1) && (totalPages > 4)) && <button
                type="button"
                onClick={() => { setActivePage(3); props.onChange(3); }}
                className="w-10 h-10 flex items-center justify-center rounded-full active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff] active:text-white"
            >
                3
            </button>}

            {(activePage + 2) < totalPages && (<div className="w-10 h-10 flex items-center justify-center">
                ...
            </div>)}

            {(activePage < totalPages) && <button
                type="button"
                onClick={() => { setActivePage(totalPages); props.onChange(totalPages) }}
                className="w-10 h-10 flex items-center justify-center rounded-full active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff] active:text-white"
            >
                {totalPages}
            </button>}

            <button
                type="button"
                onClick={nextPage}
                className={`w-10 h-10 flex justify-center items-center rounded-full ${activePage < totalPages ? "bg-[#fafafa] dark:bg-[#011425] dark:active:from-[#a93aff] dark:active:bg-gradient-to-t dark:active:to-[#fe80ff] dark:active:text-white" : "text-white/25"}`}
            >
                <CaretLeft className="w-4 h-4 fill-current" />

            </button>

        </div>
    )
}

export default Pagination2;