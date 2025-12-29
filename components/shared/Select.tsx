/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect } from "react";
import { DownCaretThick } from "../icons/DownCaretThick";
import InfoCircle from "../icons/InfoCircle";

type Props = {
    showRequiredStar?: boolean;
    info?: string;
    items: { label: string, value: string }[];
    onChange: (value: string) => void;
    value: string;
    label?: string;
    wrapperClassName?: string;
    placeholder?:string;
    buttonClassName?:string;
}

const Select: React.FC<Props> = props => {

    const [value, setValue] = useState<string>(props.value);

    const [open, setOpen] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        props.onChange(value);
        setOpen(false);
    }, [value]);

    useEffect(()=>{
        setValue(props.value);
    },[props.value]);


    const selectedValueText =  props.items.find(item => item.value === value)?.label;

    return (
        <>
            {props.label ? (
                <label className="text-sm pointer-events-none mb-3 block px-5">
                    {props.label} {props.showRequiredStar && <span className='text-red-900'> * </span>}
                </label>
            ) : null}

            {props.info && (
            <p className='text-xs mb-3 px-5'>
                <InfoCircle className='w-4 h-4 fill-current inline-block align-middle ml-1' />
                {props.info}
            </p>
            )}

            <div className={`relative ${props.wrapperClassName || ""}`} ref={wrapperRef}>


                <div
                    className={`rounded-full bg-white border border-neutral-300 dark:border-transparent dark:bg-[#192a39] relative px-5 leading-5 text-sm flex items-center select-none cursor-pointer ${selectedValueText?"text-neutral-800 dark:text-white":"text-neutral-800 dark:text-[#919191]"} ${props.buttonClassName || ""}`}
                    onClick={() => { setOpen(true) }}
                >
                    { selectedValueText || props.placeholder || null}

                    <DownCaretThick className={`pointer-events-none w-3 h-3 fill-neutral-500 dark:fill-white top-1/2 -translate-y-1/2 absolute left-5 transition-all ${open?"rotate-180":""}`} />
                </div>

                <div className={`absolute z-10 mt-1 top-full rtl:right-0 ltr:left-0 bg-white border border-neutral-300 dark:border-transparent dark:bg-[#192a39] rounded-2xl min-w-full max-h-64 overflow-auto shadow transition-all ${open ? "visible opacity-100 mt-0" : "invisible opacity-0 mt-1"}`}>
                    {props.items.map((item, index) => (
                        <div
                            key={item.value}
                            onClick={() => { setValue(item.value) }}
                            className={`px-3 py-2.5 transition-all cursor-pointer select-none text-sm ${item.value === value ? "bg-[#293e4f]" : ""} ${index?"border-t border-white/5":""}`}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Select;