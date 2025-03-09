/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Field } from 'formik';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { CountryCodes } from '@/enum/models';
import { validateMobileNumberId } from '@/helpers/formik-validation';
import { persianNumbersToEnglish } from '@/helpers';

type Props = {
    showConfirmedBadge?: boolean;
    disabled?:boolean;
    errorText?: string;
    isTouched?: boolean;
    label?: string;
    name?: string;
    className?: string;
    onChange: (v: string) => void;
    defaultCountry: {
        countryCode: string;
        dialCode: string;
        format?: string
    }
    initialValue?: string;
    showNotConfirmedBadge?: boolean;
}

type CountryObject = {
    countryCode: string;
    dialCode: string;
    format?: string
}


const PhoneInput: React.FC<Props> = props => {

    const { errorText, isTouched, defaultCountry, initialValue } = props;

    const codeRef = useRef<HTMLDivElement>(null);

    let initialCountry: CountryObject | undefined = undefined;

    let initialNumberValue: string = "";

    if (initialValue) {

        const initialCountryArray = CountryCodes.find(item => initialValue.replace("+", "").startsWith(item[3].toString()));
        if (initialCountryArray) {
            initialCountry = {
                countryCode: initialCountryArray[2] as string,
                dialCode: initialCountryArray[3] as string,
                format: initialCountryArray[4] as string
            }
            const code = initialCountryArray[3] as string;

            initialNumberValue = initialValue.replace("+", "").substring(code?.length || 0);
        }
    }

    useEffect(()=>{
        if(initialValue){
            let userCountry: CountryObject | undefined = undefined;

            const userCountryArray = CountryCodes.find(item => initialValue.replace("+", "").startsWith(item[3].toString()));
            if (userCountryArray) {
                userCountry = {
                    countryCode: userCountryArray[2] as string,
                    dialCode: userCountryArray[3] as string,
                    format: userCountryArray[4] as string
                }
                const code = userCountryArray[3] as string;                
                setCountry(userCountry);
                setPhoneNumberValue(initialValue.replace("+", "").substring(code?.length || 0))
            }
        }
    },[initialValue]);

    const [typedCode, setTypedCode] = useState<string>("");
    const [openCodes, setOpenCodes] = useState<boolean>(false);
    const [country, setCountry] = useState<CountryObject>(initialCountry || defaultCountry);
    const [phoneNumberValue, setPhoneNumberValue] = useState<string>(initialNumberValue);


    const handleClickOutside = (e: any) => {
        if (codeRef.current && !codeRef.current.contains(e.target)) {
            setOpenCodes(false);
        }
    };

    const closeOnTab = (event: any) => {
        if (event.keyCode === 9) {
            setOpenCodes(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', closeOnTab);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', closeOnTab);
        };
    }, []);


    useEffect(() => {
        setTypedCode("");
    }, [country?.dialCode]);

    useEffect(() => {
        if (country && phoneNumberValue) {
            const transformedDigits = persianNumbersToEnglish(country.dialCode + phoneNumberValue)
            props.onChange("+" + transformedDigits)
        }
    }, [country.dialCode, phoneNumberValue])

    const selectCountry = (item: any[]) => {
        setOpenCodes(false);
        setTypedCode("+" + item[3]);
        const itemCountryObject = {
            countryCode: item[2],
            dialCode: item[3],
            format: item[4] || "",
            name: item[0]
        }
        setCountry(itemCountryObject);
    };

    let typedValue = typedCode.toLowerCase();
    if (typedCode[0] === "+") {
        typedValue = typedValue.substring(1);
    }

    const filterCodeItems = (CountryCodes.filter((item) => {

        if (!typedCode || country) {
            return true;
        }
        return (item[0].toString().toLocaleLowerCase().includes(typedValue)) ||
            (item[2].toString().toLocaleLowerCase().includes(typedValue)) ||
            (item[3].toString().toLocaleLowerCase().includes(typedValue))
    }).sort(b => {
        if (b[3].toString().startsWith(typedValue) || b[0].toString().startsWith(typedValue) || b[2].toString().startsWith(typedValue)) {
            return -1;
        }
        return 1
    })
    );

    const expectedLength = country?.format?.replaceAll(" ", '')?.replaceAll('+', "")?.replaceAll("(", "")?.replaceAll(")", "")?.replaceAll('-', "")?.length;
    const expectedTotalLength = expectedLength ? expectedLength + country.dialCode.length : undefined;


    const inputClassNames : string[] = [`bg-caret bg-gradient-to-t from-[#01343c] to-[#1f4340] h-11 rounded-l-full px-5 outline-none`];

    if(errorText && isTouched){
        inputClassNames.push(`border-red-500`);
    }

    const inputClassNames2 : string[] = [`h-11 px-2 col-span-4 rounded-r-full outline-none bg-[#192a39]`];

    if(errorText && isTouched){
        inputClassNames2.push(`border-red-500`);
    }else{
        inputClassNames2.push(`border-neutral-300 focus:border-blue-500`);
    }
    return (
        <div className={props.className || ""}>
            <div className='relative'>

                <div className='flex justify-between items-center px-5 mb-1'>

                    <div className='flex items-center gap-2'>
                        {!!props.label && (
                            <label className="select-none pointer-events-none inline-block text-sm" >
                            {props.label}
                            </label>
                        )}
                        {!props.showConfirmedBadge && (
                            <Image
                            src="/images/icons/greenCircleCheck.svg"
                            alt="check icon"
                            width={20}
                            height={20}
                            className="w-5 h-5 block"
                            />
                        )}
                    </div>



                    {props.showNotConfirmedBadge && (
                        <div className='bg-amber-100 text-xs text-neutral-500 leading-6 px-3 rounded-full before:inline-block before:w-2 before:h-2 before:bg-amber-400 before:rounded-full before:align-middle before:ltr:mr-1 before:rtl:ml-1'>
                            تایید نشده
                        </div>
                    )}
                </div>

                <div className={`relative text-sm grid grid-cols-5`} dir='ltr' ref={codeRef}>

                    {!typedCode && <div className='absolute left-5 top-1/2 -translate-y-1/2 flex gap-2 items-center pointer-events-none'>
                        {/* <Image
                            src={`/images/flags/${country?.countryCode || defaultCountry.countryCode}.svg`}
                            alt={country?.countryCode || defaultCountry.countryCode}
                            width={30}
                            height={16}
                            className='w-8 h-5 object-cover border'
                        />  */}
                        +{country?.dialCode}
                    </div>}

                    <Field
                        className={inputClassNames.join(" ")}
                        type='text'
                        autoComplete="off"
                        disabled={props.disabled}
                        onChange={(e: any) => { setTypedCode(e.target.value) }}
                        value={typedCode || ""}
                        onFocus={() => { setOpenCodes(true); }}
                    />

                    <input
                        disabled={props.disabled}
                        type='text'
                        autoComplete="off"
                        onChange={(e: any) => { if (["0", "۰", "٠"].includes(e.target.value[0])) return; setPhoneNumberValue(e.target.value) }}
                        value={phoneNumberValue}
                        maxLength={expectedLength || 15}
                        className={inputClassNames2.join(" ")}
                    />

                    <Field
                        validate={(value: string) => validateMobileNumberId({
                            expectedLength: expectedTotalLength,
                            invalidMessage: "شماره موبایل وارد شده معتبر نیست",
                            reqiredMessage: "لطفا شماره موبایل خود را وارد کنید",
                            value: value
                        })}
                        type='hidden'
                        name={props.name}
                    />

                    {!!openCodes && <div className='absolute styled-scrollbar max-w-full top-full mt-1 left-0 min-w-full bg-[#192a39] shadow z-20 max-h-44 overflow-auto rounded-2xl'>
                        {filterCodeItems.map(item => {
                            return (
                                <div
                                    className='flex font-sans gap-2 items-center truncate max-w-full text-sm select-none cursor-pointer hover:bg-black transition-all border-neutral-800 hover:text-white h-10 px-5'
                                    dir='ltr'
                                    key={item[2].toString()}
                                    onClick={() => { selectCountry(item) }}
                                >
                                    {/* <Image src={`/images/flags/${item[2]}.svg`} alt={item[0]! as string} width={30} height={16} className='w-8 h-5 object-cover border' /> */}
                                    +{item[3]} <span className='text-xs'> {item[0]} </span>
                                </div>
                            )
                        })}
                    </div>}

                </div>
            </div>
            {errorText && isTouched && <div className='text-red-500 text-xs'>{errorText}</div>}
        </div>
    )
}

export default PhoneInput;