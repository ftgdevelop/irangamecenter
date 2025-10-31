/* eslint-disable  @typescript-eslint/no-explicit-any */

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker as MobiscrollDatepicker, setOptions, localeFa } from '@mobiscroll/react';
import { useEffect, useState } from 'react';

type Props = {
    onChange: (args: any, inst: any) => void;
    rtl?: boolean;
    value?: string;
    placeholder?: string;
    minDate?: string;
    maxDate?: string;
}

type DatePickerValue = {
    value: string;
    valueText: string;
}

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const DatePickerMobiscroll: React.FC<Props> = props => {

    const [value, setValue] = useState<string>(props.value || "");

    // const [instance, setInstance] = useState<any>(null);

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (window && window.innerWidth < 1000) {
            setIsMobile(true);
        }
    }, []);

    const onChange = (args: DatePickerValue, inst: any) => {
        setValue(args.value);
        props.onChange(args, inst);
    }

    const fridays: string[] = [
        '2023-11-24',
        '2023-12-01',
        '2023-12-08',
        '2023-12-15',
        '2023-12-17',
        '2023-12-22',
        '2023-12-29',
        '2024-01-05',
        '2024-01-12',
        '2024-01-19',
        '2024-01-25',
        '2024-01-26'
    ];

    const marked = fridays.map(item => ({
        date: item,
        cellCssClass: "red"
    }));

    return (
        <div className="mobiscroll-datepicker-wrapper persian-datepicker-wrapper" >

            <MobiscrollDatepicker
                cancelText='بستن'
                // onInit={(_, inst) => { setInstance(inst) }}
                cssClass="mobi-date-picker persian-date-picker"
                controls={isMobile ? ['date'] : ['calendar']}
                select="date"
                returnFormat="iso8601"
                rtl
                locale={localeFa}
                inputProps={{
                    inputStyle: 'box',
                    placeholder: props.placeholder || "",
                }}
                inputTyping={false}
                min={props.minDate ? new Date(props.minDate) : ""}
                max={props.maxDate ? new Date(props.maxDate) : ""}
                marked={marked}
                showRangeLabels={false}
                onChange={onChange}
                value={value}
            >
            </MobiscrollDatepicker>

        </div>
    )
}

export default DatePickerMobiscroll;