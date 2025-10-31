/* eslint-disable  @typescript-eslint/no-explicit-any */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const DatePicker = dynamic(() => import("react-multi-date-picker"), {
    ssr: false,
});

type Props = {
    className?: string;
    range?: boolean;
}

const DatePickerMulti: React.FC<Props> = props => {

    const [Transition, setTransition] = useState<any>(null);
    const [Opacity, setOpacity] = useState<any>(null);


    useEffect(() => {
        import("react-element-popper/animations/transition").then((mod) => {
            setTransition(() => mod.default);
        });
        import("react-element-popper/animations/opacity").then((mod) => {
            setOpacity(() => mod.default);
        });

    }, []);

    if (!Transition) return null;

    return (
        <DatePicker
            inputClass="bg-[#2e3e4b] rounded-full h-10 w-full border-none outline-none px-5 text-sm"
            containerClassName="w-full mb-5"
            locale={persian_fa}
            calendar={persian}
            range={props.range}
            rangeHover={props.range}
            monthYearSeparator= "  "
            animations={[
                Opacity(),
                Transition({
                    from: 35,
                    transition: "all 300ms ease",
                })
            ]}
            dateSeparator={" تا "}
            calendarPosition="bottom-right"
            weekDays ={ ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']}
            //weekDays ={ ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']}
        />
    )
}

export default DatePickerMulti;