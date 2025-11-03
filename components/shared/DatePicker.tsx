/* eslint-disable  @typescript-eslint/no-explicit-any */

import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import ModalPortal from "./layout/ModalPortal";
import { useAppDispatch } from "@/hooks/use-store";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import { dateDiplayFormat, dateFormat } from "@/helpers";
import CalendarIcon from "../icons/CalendarIcon";

const Calendar = dynamic(
    () => import("react-multi-date-picker").then((mod) => mod.Calendar),
    { ssr: false }
);

type Props = {
    className?: string;
    range?: boolean;
    modalLabel?: string;
    onChange: ((v: string[]) => void);
    placeholder?: string;
    initialValue?: (string)[];
}

const DatePickerM: React.FC<Props> = props => {

    let initialValue : any =  null;
    
    if(props.initialValue){
        initialValue = props.initialValue.map(x => x ? new Date(x) : null);
    }

    const [value, setValue] = useState<any>(initialValue);

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [slideIn, setSlideIn] = useState<boolean>(false);

    const [localeFa, setLocaleFa] = useState<boolean>(true);


    useEffect(() => {
        if (open) {
            setSlideIn(true);
            dispatch(setBodyScrollable(false));
            dispatch(setBodiScrollPosition(window?.pageYOffset || 0));
        } else {
            dispatch(setBodyScrollable(true));
        }
    }, [open]);

    useEffect(() => {
        if (!slideIn) {
            setTimeout(() => { setOpen(false) }, 300)
        }
    }, [slideIn]);


    const toggleLocale = () => {
        setLocaleFa(prev => !prev)
    }

    let text: ReactNode = props.placeholder || "";

    if (Array.isArray(value)) {

        const formatted = value.map((d) => d ? dateFormat(new Date(d)) : null);
        
        let startString = " -- ";
        let endString = " -- ";
        
        if(formatted[0]){
            startString = dateDiplayFormat({
                date: formatted[0],
                format: "yyyy/mm/dd",
                locale: localeFa ? "fa" : "en"
            });

            if(formatted[1]){
                endString = dateDiplayFormat({
                    date: formatted[1],
                    format: "yyyy/mm/dd",
                    locale: localeFa ? "fa" : "en"
                });
            }
            
            text = <span>
                از <span> {startString} </span> تا <span> {endString} </span>
            </span>;
        }

    }

    return (
        <>
            <button
                type="button"
                className={`bg-[#2e3e4b] rounded-full h-10 w-full border-none outline-none px-5 text-right text-sm ${props.className || ""}`}
                onClick={() => { setOpen(true) }}
            >
                {text}
            </button>

            <ModalPortal
                show={open}
                selector='modal_portal'
            >
                <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0" onClick={() => { setSlideIn(false) }} />

                <div className={`bg-[#fff] rounded-t-2xl fixed w-full md:max-w-lg safePadding-b overflow-y-auto max-h-[90vh] transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2  bottom-0 ${slideIn ? "translate-y-0" : "translate-y-[80vh]"}`}>

                    <div className="flex justify-between p-4">
                        {props.modalLabel ? <label className="font-semibold text-base block"> {props.modalLabel} </label> : <div />}
                        <button
                            type="button"
                            className="text-sm flex gap-1 items-center font-semibold"
                            onClick={toggleLocale}
                        >
                            <CalendarIcon className="w-5 h-5 fill-current" />
                            {localeFa ? "تقویم میلادی" : "تقویم شمسی"}
                        </button>
                    </div>

                    <Calendar
                        locale={localeFa ? persian_fa : gregorian_en}
                        calendar={localeFa ? persian : gregorian}
                        range={props.range}
                        shadow={false}
                        rangeHover={props.range}
                        monthYearSeparator="  "
                        value={value}
                        onChange={setValue}
                        weekDays={['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']}
                    //weekDays ={ ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']}
                    />
                    <div className="flex gap-4 mt-7 py-2 pb-5 px-4">
                        <button
                            type="button"
                            className="shrink-0 w-24 rounded-full px-5 py-2.5 bg-[#bbbbbb] text-sm"
                            onClick={() => { setSlideIn(false) }}
                        >
                            بستن
                        </button>
                        <button
                            type="button"
                            className="w-full rounded-full px-5 py-2.5 bg-[#a93aff] text-sm text-white"
                            onClick={() => {
                                if (Array.isArray(value)) {
                                    const formatted = value.map((d) => dateFormat(new Date(d)));
                                    props.onChange(formatted);
                                }
                                setSlideIn(false);
                            }}
                        >
                            تایید
                        </button>
                    </div>
                </div>
            </ModalPortal>
        </>
    )
}

export default DatePickerM;