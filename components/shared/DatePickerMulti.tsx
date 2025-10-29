/* eslint-disable  @typescript-eslint/no-explicit-any */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
            range={props.range}
            rangeHover={props.range}
            animations={[
                Opacity(), 
                Transition({
                    from: 35,
                    transition: "all 300ms ease",
                })
            ]}
            calendarPosition="bottom-right"
        />
    )
}

export default DatePickerMulti;